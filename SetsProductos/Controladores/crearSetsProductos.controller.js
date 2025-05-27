const MENSAJES_SETS_PRODUCTOS = require('@altertex/util/const/mensajesSetsProductos');
const repositorio = require('@altertex/setspro/repos/repositorioCrearSetsProductos');
exports.crearSetsProductos = async (req, res) => {
  const datos = req.body;
  const cliente = req.user.clienteSeleccionado;

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