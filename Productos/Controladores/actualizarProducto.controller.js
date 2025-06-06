//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const multer = require('multer');
const enviarS3 = require('@altertex/util/ser/enviarS3');
const MENSAJES_PRODUCTOS = require('@altertex/util/const/mensajesProductos');
const validarProducto = require('@altertex/util/vali/validarProducto');
const validarVariante = require('@altertex/util/vali/validarVariante');
const validarOpciones = require('@altertex/util/vali/validarOpciones');
const repositorioActualizarProducto = require('@altertex/pro/repos/repositorioActualizarProducto');
const repositorioProductoImagen = require('@altertex/pro/repos/repositorioProductoImagen');
const repositorioActualizarVariante = require('@altertex/pro/repos/repositorioActualizarVariante');
const repositorioVarianteImagen = require('@altertex/pro/repos/repositorioVarianteImagen');
const repositorioActualizarOpcion = require('@altertex/pro/repos/repositorioActualizarOpcion');
const db = require('@altertex/util/bd/db');
const upload = multer({ storage: multer.memoryStorage() });

exports.actualizarProducto = [
  upload.fields([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenesVariante', maxCount: 100 },
  ]),

  async (req, res) => {
    const idCliente = parseInt(req.user.clienteSeleccionado);
    const producto = JSON.parse(req.body.producto);
    const variantes = JSON.parse(req.body.variantes);
    const mapaImagenes = JSON.parse(req.body.mapaImagenes);
    const imagenProducto = req.files.imagenProducto ? req.files.imagenProducto[0] : null;
    const imagenesVariante = req.files.imagenesVariante || [];
    let conexion = null;

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
      conexion = await db.getConnection();
      await conexion.beginTransaction();

      const idProducto = await repositorioActualizarProducto.actualizarProducto(
        idCliente,
        producto
      );
      if (!idProducto) {
        throw new Error('Error al actualizar producto');
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

        const idVariante = await repositorioActualizarVariante.actualizarVariante(
          idProducto,
          variante
        );
        if (!idVariante) {
          throw new Error('Error al actualizar variante');
        }

        varianteIdMap[variante.identificador] = {
          id: idVariante,
          nombre: variante.nombreVariante,
        };

        const errorOpciones = validarOpciones(variante.opciones);
        if (errorOpciones) {
          throw new Error(errorOpciones.error);
        }

        await repositorioActualizarOpcion.actualizarOpcion(idVariante, variante.opciones);
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
        await repositorioProductoImagen.actualizarImagen(
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

        await repositorioVarianteImagen.actualizarImagen(
          varianteInfo.id,
          imagen.originalname,
          varianteInfo.nombre
        );
      });

      await Promise.all(imagenesVariantePromises);

      await conexion.commit();
      return res.status(200).json({ mensaje: 'Producto actualizado correctamente' });
    } catch (error) {
      if (conexion) await conexion.rollback();

      let errorMensaje = MENSAJES_PRODUCTOS.ERROR_ACTUALIZAR_PRODUCTO;

      if (error.message.includes('Error al subir imágenes al servidor')) {
        errorMensaje = MENSAJES_PRODUCTOS.ERROR_ENVIAR_IMAGENES_S3;
      } else if (error.message.includes('Error al actualizar variante')) {
        errorMensaje = MENSAJES_PRODUCTOS.ERROR_ACTUALIZAR_VARIANTE;
      } else if (error.message.includes('Error al asociar imagen con variante')) {
        errorMensaje = MENSAJES_PRODUCTOS.ERROR_ACTUALIZAR_IMAGEN_VARIANTE;
      }

      return res.status(errorMensaje.codigo).json({
        mensaje: errorMensaje.mensaje,
        error: error.message,
      });
    } finally {
      if (conexion) conexion.release();
    }
  },
];
