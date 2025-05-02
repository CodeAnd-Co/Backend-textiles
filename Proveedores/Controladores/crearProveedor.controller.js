const validarProveedor = require('@altertex/util/vali/validarProveedor');
const repositorioCrearProveedor = require('@altertex/prove/repos/repositorioCrearProvedor');
const MENSAJES_PROVEEDORES = require('@altertex/util/const/mensajesProveedores');

/**
 * Controlador para crear un proveedor de forma independiente.
 *
 * @async
 * @function crearProveedor
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.body - Cuerpo de la solicitud HTTP.
 * @param {object} res - Objeto de respuesta de Express.
 *
 * @returns {Response} Respuesta HTTP con estado:
 * - 200 si la creación es exitosa, junto con el ID del proveedor.
 * - 400 si los parámetros proporcionados son inválidos.
 * - 500 si ocurre un error en el servidor.
 */
exports.crearProveedor = async (req, res) => {
  const proveedor = req.body;
  const idCliente = parseInt(req.user.clienteSeleccionado);

  console.log(req.body)

  const errorProveedor = validarProveedor(proveedor);
  if (errorProveedor) {
    return res.status(MENSAJES_PROVEEDORES.DATOS_PROVEEDOR_INVALIDOS.codigo).json({
      mensaje: MENSAJES_PROVEEDORES.DATOS_PROVEEDOR_INVALIDOS.mensaje,
    });
  }

  try {
    const idProveedor = await repositorioCrearProveedor.crearProveedor(idCliente, proveedor);

    if (!idProveedor) {
      throw new Error('Error al crear proveedor');
    }

    return res.status(MENSAJES_PROVEEDORES.PROVEEDOR_CREADO_EXITOSAMENTE.codigo).json({
      mensaje: MENSAJES_PROVEEDORES.PROVEEDOR_CREADO_EXITOSAMENTE.mensaje,
    });
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    return res.status(MENSAJES_PROVEEDORES.ERROR_CREAR_PROVEEDOR.codigo).json({
      mensaje: MENSAJES_PROVEEDORES.ERROR_CREAR_PROVEEDOR.mensaje,
      error: error.message,
    });
  }
};
