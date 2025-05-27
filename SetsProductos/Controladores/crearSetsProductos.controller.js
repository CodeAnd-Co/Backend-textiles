const MENSAJES_SETS_PRODUCTOS = require('@altertex/util/const/mensajesSetsProductos');
const repositorio = require('@altertex/setspro/repos/repositorioCrearSetsProductos');

/**
 * Controlador de Express que maneja la creación de un nuevo set de productos para un cliente.
 *
 * Valida:
 * - Que se haya enviado el cuerpo de la solicitud con los datos requeridos.
 * - Que se hayan proporcionado todos los campos necesarios.
 * - Que exista un cliente seleccionado en el usuario autenticado.
 *
 * Llama al repositorio para realizar la lógica de negocio y persistencia, y responde
 * con el estado adecuado dependiendo del resultado.
 *
 * @async
 * @function crearSetsProductos
 * @param {Express.Request} req - Objeto de solicitud de Express.
 * @param {Express.Response} res - Objeto de respuesta de Express.
 *
 * @returns {Promise<void>} Devuelve una respuesta HTTP con el estado correspondiente.
 *
 * @throws {500} En caso de error inesperado en la creación del set.
 */
exports.crearSetsProductos = async (req, res) => {
  const datos = req.body.nuevoSetsProductos;
  const cliente = req.user.clienteSeleccionado;

  if (!req.body.nuevoSetsProductos) {
    return res.status(MENSAJES_SETS_PRODUCTOS.DATOS_INVALIDOS_ERROR.codigo).json({ mensaje: MENSAJES_SETS_PRODUCTOS.DATOS_INVALIDOS_ERROR.mensaje });
  }


  if (!datos.nombre || !datos.nombreVisible || !datos.descripcion || !datos.activo || !datos.idProductos) {
    return res.status(MENSAJES_SETS_PRODUCTOS.DATOS_INVALIDOS_ERROR.codigo).json({ mensaje: MENSAJES_SETS_PRODUCTOS.DATOS_INVALIDOS_ERROR.mensaje });
  }

  if (!cliente) {
    return res.status(MENSAJES_SETS_PRODUCTOS.CLIENTE_NO_SELECCIONADO.codigo).json({ mensaje: MENSAJES_SETS_PRODUCTOS.CLIENTE_NO_SELECCIONADO.mensaje });
  }

  try {
    await repositorio.crearSetsProductos(cliente, datos);
    return res.status(MENSAJES_SETS_PRODUCTOS.SETS_PRODUCTOS_CREADO_EXITO.codigo).json({ mensaje: MENSAJES_SETS_PRODUCTOS.SETS_PRODUCTOS_CREADO_EXITO.mensaje });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }


};