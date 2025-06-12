// RF29 Actualizar Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF29
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const validarProducto = require('@altertex/util/vali/validarProducto');
const repositorioActualizarProducto = require('@altertex/pro/repos/repositorioActualizarProducto');
const repositorioActualizarProductoSinImagenes = require('@altertex/pro/repos/repositorioActualizarProductoSinImagenes');
const repositorioCrearOpcion = require('@altertex/pro/repos/repositorioCrearOpcion');
const repositorioCrearVariante = require('@altertex/pro/repos/repositorioCrearVariante');
const repositorioProductoImagen = require('@altertex/pro/repos/repositorioProductoImagen');
const repositorioVarianteImagen = require('@altertex/pro/repos/repositorioVarianteImagen');
const repositorioObtenerImagenes = require('@altertex/pro/repos/repositorioObtenerImagenesProducto');
const validarVariante = require('@altertex/util/vali/validarVariante');
const validarOpciones = require('@altertex/util/vali/validarOpciones');
const enviarS3 = require('@altertex/util/ser/enviarS3');
const MENSAJES_PRODUCTOS = require('@altertex/util/const/mensajesProductos');
const db = require('@altertex/util/bd/db');

/**
 * Controlador para actualizar un producto existente.
 *
 * @param {Express.Request} req - Objeto de solicitud HTTP.
 * @param {Express.Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Respuesta HTTP con el estado de la operación.
 */
exports.actualizarProducto = [
  upload.fields([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenesVariante', maxCount: 100 },
  ]),

  async (req, res) => {
    let conexion;

    try {
      console.log(req.body);
      console.log(req.files);
      // Extracción y parsing de datos
      const { idProducto } = req.body;
      const producto = JSON.parse(req.body.producto);
      const variantes = JSON.parse(req.body.variantes);
      const mapaImagenes = JSON.parse(req.body.mapaImagenes);
      const imagenProducto = req.files.imagenProducto ? req.files.imagenProducto[0] : null;
      console.log('imagen producto: ', imagenProducto);
      const imagenesVariante = req.files.imagenesVariante || [];

      // Validaciones iniciales
      if (!idProducto || isNaN(parseInt(idProducto)) || !producto) {
        return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
          mensaje: MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.mensaje,
        });
      } // Validación del producto
      const productoParaValidar = { ...producto };
      delete productoParaValidar.idProveedor;
      const errorValidacion = validarProducto(productoParaValidar);
      if (errorValidacion) {
        return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
          mensaje: errorValidacion.error,
        });
      }

      // Comprobar si hay nuevas imágenes
      const tieneNuevasImagenes =
        !!imagenProducto || (imagenesVariante && imagenesVariante.length > 0);

      // Iniciar transacción de base de datos
      conexion = await db.getConnection();
      await conexion.beginTransaction();

      // Actualizar producto - elegir el repositorio adecuado según si hay o no nuevas imágenes
      // Si no hay imágenes nuevas, usamos el repositorio que no elimina imágenes existentes
      const actualizado = tieneNuevasImagenes
        ? await repositorioActualizarProducto.actualizarProducto(idProducto, producto)
        : await repositorioActualizarProductoSinImagenes.actualizarProductoSinImagenes(
            idProducto,
            producto
          );
      if (!actualizado) {
        await conexion.rollback();
        return res.status(MENSAJES_PRODUCTOS.PRODUCTO_NO_ENCONTRADO_ACTUALIZACION.codigo).json({
          mensaje: MENSAJES_PRODUCTOS.PRODUCTO_NO_ENCONTRADO_ACTUALIZACION.mensaje,
        });
      }

      // Procesar variantes
      const varianteIdMap = {};
      const variantesPromises = variantes.map(async (variante) => {
        // Validar variante
        const errorVariante = validarVariante({
          nombreVariante: variante.nombreVariante,
          descripcion: variante.descripcion,
        });
        if (errorVariante) {
          throw new Error(errorVariante.error);
        }

        // Crear variante
        const idVariante = await repositorioCrearVariante.crearVariante(idProducto, variante);
        if (!idVariante) {
          throw new Error('Error al crear variante');
        }

        // Mapear ID de variante
        varianteIdMap[variante.identificador] = {
          id: idVariante,
          nombre: variante.nombreVariante,
        };

        // Validar y crear opciones
        const errorOpciones = validarOpciones(variante.opciones);
        if (errorOpciones) {
          throw new Error(errorOpciones.error);
        }

        await repositorioCrearOpcion.crearOpcion(idVariante, variante.opciones);
      });

      await Promise.all(variantesPromises);
      await conexion.commit();
      conexion.release(); // Procesar imágenes en S3 solo si hay nuevas imágenes
      if (tieneNuevasImagenes) {
        const urlImagenProductoPromise = imagenProducto
          ? enviarS3({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: `productos/${imagenProducto.originalname}`,
              Body: imagenProducto.buffer,
              ContentType: imagenProducto.mimetype,
            })
          : Promise.resolve(null);

        const urlImagenVariantePromises = imagenesVariante.map((imagenVariante) =>
          enviarS3({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `productos/${imagenVariante.originalname}`,
            Body: imagenVariante.buffer,
            ContentType: imagenVariante.mimetype,
          })
        );

        const [urlImagenProducto, ...urlImagenVariantes] = await Promise.all([
          urlImagenProductoPromise,
          ...urlImagenVariantePromises,
        ]);

        // Verificar que las imágenes se subieron correctamente (solo si hay imágenes nuevas)
        if (
          (imagenProducto && !urlImagenProducto) ||
          (imagenesVariante.length > 0 && urlImagenVariantes.includes(null))
        ) {
          throw new Error('Error al subir imágenes al servidor');
        }
      } // Guardar imágenes solo si hay nuevas
      if (tieneNuevasImagenes) {
        // Guardar imagen del producto en base de datos
        if (imagenProducto) {
          await repositorioProductoImagen.crearImagen(
            idProducto,
            imagenProducto.originalname,
            producto.nombreComun
          );
        }

        // Guardar imágenes de variantes en base de datos
        if (imagenesVariante.length > 0) {
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
        }
      } // Construir la respuesta de éxito
      const respuesta = {
        mensaje: MENSAJES_PRODUCTOS.ACTUALIZACION_EXITOSA.mensaje,
        actualizacionImagenes: tieneNuevasImagenes,
      };

      // Obtener las imágenes actuales del producto solo si se subieron nuevas imágenes
      if (tieneNuevasImagenes) {
        const imagenes = await repositorioObtenerImagenes.obtenerImagenesProducto(idProducto);
        respuesta.imagenes = imagenes;
      }

      // Respuesta exitosa
      return res.status(MENSAJES_PRODUCTOS.ACTUALIZACION_EXITOSA.codigo).json(respuesta);
    } catch (error) {
      // Manejo de errores
      if (conexion) {
        await conexion.rollback();
        conexion.release();
      }

      console.error('Error al actualizar producto extendido:', error);
      return res.status(MENSAJES_PRODUCTOS.ERROR_ACTUALIZAR_PRODUCTO.codigo).json({
        mensaje: MENSAJES_PRODUCTOS.ERROR_ACTUALIZAR_PRODUCTO.mensaje,
        error: error.message,
      });
    }
  },
];
