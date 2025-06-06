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
    console.log('Iniciando actualización de producto...');
    const idCliente = parseInt(req.user.clienteSeleccionado);
    const idProducto = parseInt(req.body.idProducto);

    // Validar idCliente e idProducto
    if (isNaN(idCliente)) {
      console.error('El idCliente es inválido:', req.user.clienteSeleccionado);
      return res.status(400).json({ mensaje: 'El idCliente es inválido.' });
    }
    if (isNaN(idProducto)) {
      console.error('El idProducto es inválido:', req.body.idProducto);
      return res.status(400).json({ mensaje: 'El idProducto es inválido.' });
    }

    console.log('idCliente:', idCliente);
    console.log('idProducto:', idProducto);

    const producto = req.body.producto || null;
    const variantes = req.body.variantes || [];
    const mapaImagenes = req.body.mapaImagenes || [];
    const imagenProducto = req.files && req.files.imagenProducto ? req.files.imagenProducto[0] : null;
    const imagenesVariante = req.files && req.files.imagenesVariante ? req.files.imagenesVariante : [];
    let conexion = null;

    try {
      console.log('Obteniendo conexión a la base de datos...');
      conexion = await db.getConnection();
      await conexion.beginTransaction();
      console.log('Conexión establecida y transacción iniciada.');

      // Obtener los valores actuales del producto
      console.log('Obteniendo valores actuales del producto...');
      const [productoActual] = await conexion.query(
        `SELECT * FROM producto WHERE idProducto = ? AND idCliente = ?`,
        [idProducto, idCliente]
      );
      if (productoActual.length === 0) {
        throw new Error('El producto no existe o no pertenece al cliente.');
      }
      const valoresActualesProducto = productoActual[0];
      console.log('Valores actuales del producto:', valoresActualesProducto);

      // Combinar los valores actuales con los nuevos datos enviados
      const datosProducto = {
        idProveedor: producto?.idProveedor || valoresActualesProducto.idProveedor,
        nombreComun: producto?.nombreComun || valoresActualesProducto.nombreComun,
        nombreComercial: producto?.nombreComercial || valoresActualesProducto.nombreComercial,
        descripcion: producto?.descripcion || valoresActualesProducto.descripcion,
        marca: producto?.marca || valoresActualesProducto.marca,
        modelo: producto?.modelo || valoresActualesProducto.modelo,
        tipoProducto: producto?.tipoProducto || valoresActualesProducto.tipoProducto,
        precioPuntos: producto?.precioPuntos || valoresActualesProducto.precioPuntos,
        precioCliente: producto?.precioCliente || valoresActualesProducto.precioCliente,
        precioVenta: producto?.precioVenta || valoresActualesProducto.precioVenta,
        costo: producto?.costo || valoresActualesProducto.costo,
        impuesto: producto?.impuesto || valoresActualesProducto.impuesto,
        descuento: producto?.descuento || valoresActualesProducto.descuento,
        estado: producto?.estado || valoresActualesProducto.estado,
        envio: producto?.envio || valoresActualesProducto.envio,
      };

      console.log('Datos combinados del producto para actualizar:', datosProducto);

      // Actualizar producto
      console.log('Actualizando producto...');
      await conexion.query(
        `UPDATE producto
         SET 
            idProveedor = ?, nombreComun = ?, nombreComercial = ?, descripcion = ?, 
            marca = ?, modelo = ?, tipoProducto = ?, precioPuntos = ?, precioCliente = ?, 
            precioVenta = ?, costo = ?, impuesto = ?, descuento = ?, estado = ?, envio = ?
         WHERE idProducto = ? AND idCliente = ?`,
        [
          datosProducto.idProveedor,
          datosProducto.nombreComun,
          datosProducto.nombreComercial,
          datosProducto.descripcion,
          datosProducto.marca,
          datosProducto.modelo,
          datosProducto.tipoProducto,
          datosProducto.precioPuntos,
          datosProducto.precioCliente,
          datosProducto.precioVenta,
          datosProducto.costo,
          datosProducto.impuesto,
          datosProducto.descuento,
          datosProducto.estado,
          datosProducto.envio,
          idProducto,
          idCliente,
        ]
      );
      console.log('Producto actualizado.');

      await conexion.commit();
      console.log('Transacción confirmada.');
      return res.status(200).json({
        mensaje: 'Producto actualizado correctamente.',
      });
    } catch (error) {
      console.error('Error durante la actualización:', error.message);
      if (conexion) await conexion.rollback();
      console.log('Transacción revertida.');
      return res.status(500).json({
        mensaje: 'Error al actualizar el producto.',
        error: error.message,
      });
    } finally {
      if (conexion) {
        conexion.release();
        console.log('Conexión liberada.');
      }
    }
  },
];
