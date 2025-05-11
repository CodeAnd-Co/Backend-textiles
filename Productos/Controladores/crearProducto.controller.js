//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const multer = require('multer');
const enviarS3 = require('@altertex/util/ser/enviarS3');
const MENSAJES_PRODUCTOS = require('@altertex/util/const/mensajesProductos');
const validarProducto = require('@altertex/util/vali/validarProducto');
const validarVariante = require('@altertex/util/vali/validarVariante');
const validarOpciones = require('@altertex/util/vali/validarOpciones');
const repositorioCrearProducto = require('@altertex/pro/repos/repositorioCrearProducto');
const repositorioProductoImagen = require('@altertex/pro/repos/repositorioProductoImagen');
const repositorioCrearVariante = require('@altertex/pro/repos/repositorioCrearVariante');
const repositorioVarianteImagen = require('@altertex/pro/repos/repositorioVarianteImagen');
const repositorioCrearOpcion = require('@altertex/pro/repos/repositorioCrearOpcion');
const conexion = require('@altertex/util/bd/db').promise();

const upload = multer({ storage: multer.memoryStorage() });

/**
 * Controlador para crear un producto.
 *
 * Este controlador maneja la creación de un producto, incluyendo la validación de datos y el manejo de archivos de imagen.
 * Realiza la creación del proveedor, producto, variantes y las imágenes asociadas, almacenándolas en un servicio S3.
 * Si ocurre algún error en cualquier parte del proceso, se realiza un rollback de la transacción.
 *
 * @param {object} req - El objeto de solicitud.
 * @param {object} req.user - El usuario autenticado.
 * @param {string} req.user.clienteSeleccionado - El ID del cliente seleccionado por el usuario.
 * @param {string} req.body.proveedor - EL ID del proveedor seleccionado por el usuario.
 * @param {object} req.body - El cuerpo de la solicitud.
 * @param {string} req.body.producto - Información del producto en formato JSON.
 * @param {string} req.body.variantes - Información de las variantes del producto en formato JSON.
 * @param {string} req.body.mapaImagenes - Información del mapa de imagenes de las variantes en formato JSON.
 * @param {object} req.files - Archivos enviados en la solicitud.
 * @param {Array} req.files.imagenProducto - La imagen principal del producto.
 * @param {Array} req.files.imagenesVariante - Las imágenes asociadas a las variantes del producto.
 *
 * @param {object} res - El objeto de respuesta.
 * @param {Function} res.status - Método para establecer el código de estado HTTP en la respuesta.
 * @param {Function} res.json - Método para enviar una respuesta JSON.
 *
 * @returns {object} Retorna un mensaje de éxito si el producto se crea correctamente, o un mensaje de error si falla alguna validación o proceso.
 *
 * @example
 * // Ejemplo de cómo usar el controlador
 * // Se hace una solicitud POST a /crear-producto con el cuerpo de la solicitud que contiene el proveedor, producto, variantes y archivos de imagen.
 *
 * // Respuesta exitosa:
 * res.status(200).json({ mensaje: 'Producto creado correctamente' });
 *
 * // Respuesta de error:
 * res.status(400).json({ mensaje: 'Error al crear producto', error: 'Error específico' });
 */
exports.crearProducto = [
  upload.fields([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenesVariante', maxCount: 50 },
  ]),

  async (req, res) => {
    const idCliente = parseInt(req.user.clienteSeleccionado);
    const producto = JSON.parse(req.body.producto);
    const variantes = JSON.parse(req.body.variantes);
    const mapaImagenes = JSON.parse(req.body.mapaImagenes);
    const imagenProducto = req.files.imagenProducto ? req.files.imagenProducto[0] : null;
    const imagenesVariante = req.files.imagenesVariante || [];

    // prettier-ignore
    if (
      !idCliente 
      || !mapaImagenes 
      || !producto 
      || !Array.isArray(variantes) 
      || variantes.length === 0 
      || !imagenProducto 
      || !imagenesVariante
    ) {
      return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.mensaje,
      });
    }

    const errorProducto = validarProducto(producto);
    if (errorProducto) {
      return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: errorProducto.error,
      });
    }

    if (imagenesVariante.length !== mapaImagenes.length) {
      return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: 'La cantidad de imágenes no coincide con el mapa de imágenes',
      });
    }

    try {
      await conexion.beginTransaction();

      const idProducto = await repositorioCrearProducto.crearProducto(idCliente, producto);
      if (!idProducto) {
        throw new Error('Error al crear producto');
      }

      const varianteIdMap = {};
      const variantesPromises = variantes.map(async (variante) => {
        const errorVariante = validarVariante({
          nombreVariante: variante.nombreVariante,
          descripcion: variante.descripcion,
        });
        if (errorVariante) {
          throw new Error(errorVariante.error);
        }

        const idVariante = await repositorioCrearVariante.crearVariante(idProducto, variante);
        if (!idVariante) {
          throw new Error('Error al crear variante');
        }

        varianteIdMap[variante.identificador] = {
          id: idVariante,
          nombre: variante.nombreVariante,
        };

        const errorOpciones = validarOpciones(variante.opciones);
        if (errorOpciones) {
          throw new Error(errorOpciones.error);
        }

        await repositorioCrearOpcion.crearOpcion(idVariante, variante.opciones);
      });

      await Promise.all(variantesPromises);

      const urlImagenProductoPromise = imagenProducto
        ? enviarS3({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `productos/${imagenProducto.originalname}`,
            Body: imagenProducto.buffer,
            ContentType: imagenProducto.mimetype,
          })
        : Promise.resolve(null);

      // prettier-ignore
      const urlImagenVariantePromises = imagenesVariante.map((imagenVariante) =>
        enviarS3({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `productos/${imagenVariante.originalname}`,
          Body: imagenVariante.buffer,
          ContentType: imagenVariante.mimetype,
      }));

      const [urlImagenProducto, ...urlImagenVariantes] = await Promise.all([
        urlImagenProductoPromise,
        ...urlImagenVariantePromises,
      ]);

      if ((imagenProducto && !urlImagenProducto) || urlImagenVariantes.includes(null)) {
        throw new Error('Error al subir imágenes al servidor');
      }

      if (imagenProducto) {
        await repositorioProductoImagen.crearImagen(
          idProducto,
          imagenProducto.originalname,
          producto.nombreComun
        );
      }

      const imagenesVariantePromises = imagenesVariante.map(async (imagen, index) => {
        const { idVariante: tempIdVariante } = mapaImagenes[index];
        const varianteInfo = varianteIdMap[tempIdVariante];

        if (!varianteInfo) {
          throw new Error(`Variante con ID temporal ${tempIdVariante} no encontrada`);
        }

        await repositorioVarianteImagen.crearImagen(
          varianteInfo.id,
          imagen.originalname,
          varianteInfo.nombre
        );
      });

      await Promise.all(imagenesVariantePromises);

      await conexion.commit();
      return res.status(200).json({ mensaje: 'Producto creado correctamente' });
    } catch (error) {
      await conexion.rollback();

      let errorMensaje = MENSAJES_PRODUCTOS.ERROR_CREAR_PRODUCTO;

      if (error.message.includes('Error al subir imágenes al servidor')) {
        errorMensaje = MENSAJES_PRODUCTOS.ERROR_ENVIAR_IMAGENES_S3;
      } else if (error.message.includes('Error al crear variante')) {
        errorMensaje = MENSAJES_PRODUCTOS.ERROR_CREAR_VARIANTE;
      } else if (error.message.includes('Error al asociar imagen con variante')) {
        errorMensaje = MENSAJES_PRODUCTOS.ERROR_CREAR_IMAGEN_VARIANTE;
      }

      return res.status(errorMensaje.codigo).json({
        mensaje: errorMensaje.mensaje,
        error: error.message,
      });
    }
  },
];
