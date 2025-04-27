//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const multer = require('multer');
const enviarS3 = require('@altertex/util/ser/enviarS3');
const MENSAJES_PRODUCTOS = require('@altertex/util/const/mensajesProductos');
const repositorioCrearProveedor = require('@altertex/prove/repos/repositorioCrearProvedor');
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
    const imagenProducto = req.files['imagenProducto'][0];
    const imagenesVariante = req.files['imagenesVariante'];

    if (!idCliente) {
      return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.mensaje,
      });
    }

    try {
      await conexion.beginTransaction();

      const idProveedor = await repositorioCrearProveedor.crearProveedor(proveedor);
      producto.idProveedor = idProveedor;
      const idProducto = await repositorioCrearProducto.crearProducto(idCliente, producto);

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
        const idVariante = await repositorioCrearVariante.crearVariante(idProducto, variante);

        await repositorioVarianteImagen.crearImagen(
          idVariante,
          nombresImagenesVariantes[index],
          variante.nombreVariante
        );

        await repositorioCrearOpcion.crearOpcion(idVariante, variante.opciones);
      });

      await Promise.all(promises);

      await conexion.commit();
      return res.status(200).json({ mensaje: 'Producto creado correctamente' });
    } catch (error) {
      await conexion.rollback();
      console.error('Error al crear producto:', error);
      return res.status(MENSAJES_PRODUCTOS.ERROR_CONSULTAR_PRODUCTOS.codigo).json({
        mensaje: MENSAJES_PRODUCTOS.ERROR_CONSULTAR_PRODUCTOS.mensaje,
        error: error.message,
      });
    }
  },
];
