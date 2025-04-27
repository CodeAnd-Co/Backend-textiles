//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const multer = require('multer');
const enviarS3 = require('@altertex/util/ser/enviarS3');
const MENSAJES_PRODUCTOS = require('@altertex/util/const/mensajesProductos');
const validarProveedor = require('@altertex/util/vali/validarProveedor');
const validarProducto = require('@altertex/util/vali/validarProducto');
const validarVariante = require('@altertex/util/vali/validarVariante');
const validarOpciones = require('@altertex/util/vali/validarOpciones');
const repositorioCrearProveedor = require('@altertex/pro/repos/repositorioCrearProvedor');
const repositorioCrearProducto = require('@altertex/pro/repos/repositorioCrearProducto');
const repositorioProductoImagen = require('@altertex/pro/repos/repositorioProductoImagen');
const repositorioCrearVariante = require('@altertex/pro/repos/repositorioCrearVariante');
const repositorioVarianteImagen = require('@altertex/pro/repos/repositorioVarianteImagen');
const repositorioCrearOpcion = require('@altertex/pro/repos/repositorioCrearOpcion');
const conexion = require('@altertex/util/bd/db').promise();

const upload = multer({ storage: multer.memoryStorage() });

exports.crearProducto = [
  upload.fields([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenesVariante', maxCount: 10 },
  ]),

  async (req, res) => {
    const idCliente = parseInt(req.user.clienteSeleccionado);
    const proveedor = JSON.parse(req.body.proveedor);
    const producto = JSON.parse(req.body.producto);
    const variantes = JSON.parse(req.body.variantes);
    const imagenProducto = req.files.imagenProducto ? req.files.imagenProducto[0] : null;
    const imagenesVariante = req.files.imagenesVariante || [];

    const errorProveedor = validarProveedor(proveedor);
    if (errorProveedor) {
      return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: errorProveedor.error,
      });
    }

    const errorProducto = validarProducto(producto);
    if (errorProducto) {
      return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: errorProducto.error,
      });
    }

    if (!idCliente) {
      return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.mensaje,
      });
    }

    try {
      await conexion.beginTransaction();

      const idProveedor = await repositorioCrearProveedor.crearProveedor(proveedor);
      if (!idProveedor) {
        throw new Error('Error al crear proveedor');
      }

      producto.idProveedor = idProveedor;
      const idProducto = await repositorioCrearProducto.crearProducto(idCliente, producto);
      if (!idProducto) {
        throw new Error('Error al crear producto');
      }

      const urlImagenProductoPromise = enviarS3({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `productos/${imagenProducto.originalname}`,
        Body: imagenProducto.buffer,
        ContentType: imagenProducto.mimetype,
      });

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

      if (!urlImagenProducto || urlImagenVariantes.includes(null)) {
        throw new Error('Error al subir imágenes al servidor');
      }

      const nombreImagenProducto = imagenProducto.originalname;
      const nombresImagenesVariantes = imagenesVariante.map(
        (imagenVariante) => imagenVariante.originalname
      );

      await repositorioProductoImagen.crearImagen(
        idProducto,
        nombreImagenProducto,
        producto.nombreComun
      );

      const promises = variantes.map(async (variante, index) => {
        const errorVariante = validarVariante({
          nombreVariante: variante.nombreVariante,
          descripcion: variante.descripcion,
        });
        if (errorVariante) {
          return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
            mensaje: errorVariante.error,
          });
        }

        const idVariante = await repositorioCrearVariante.crearVariante(idProducto, variante);
        if (!idVariante) {
          throw new Error('Error al crear variante');
        }

        await repositorioVarianteImagen.crearImagen(
          idVariante,
          nombresImagenesVariantes[index],
          variante.nombreVariante
        );

        const errorOpciones = validarOpciones(variante.opciones);
        if (errorOpciones) {
          return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
            mensaje: errorOpciones.error,
          });
        }

        await repositorioCrearOpcion.crearOpcion(idVariante, variante.opciones);
      });

      await Promise.all(promises);

      await conexion.commit();
      return res.status(200).json({ mensaje: 'Producto creado correctamente' });
    } catch (error) {
      await conexion.rollback();

      let errorMensaje = MENSAJES_PRODUCTOS.ERROR_CREAR_PRODUCTO;

      if (error.message.includes('Error al crear proveedor')) {
        errorMensaje = MENSAJES_PRODUCTOS.ERROR_CREAR_PROVEEDOR;
      } else if (error.message.includes('Error al subir imágenes al servidor')) {
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
