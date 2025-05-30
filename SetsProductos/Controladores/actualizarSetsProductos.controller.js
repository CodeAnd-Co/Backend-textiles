const MENSAJES = require('@altertex/util/const/mensajesSetsProductos');
const repositorio = require('@altertex/setspro/repos/repositorioActualizarSetsProductos');
//RF[44] Actualizar set de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF44]

/**
 * Controlador para actualizar la información de un ...
 */
exports.actualizarSetProducto = async (req, res) => {
  let datos;

  // Si no hay cambios
  if (req.body.id || req.body.idSetProducto) {
    datos = [req.body];
  } else if (req.body.cambios) {
    // Si la información viene en el formato esperado (hay cambios)
    datos = Array.isArray(req.body.cambios) ? req.body.cambios : [req.body.cambios];
  } else {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR_SET_PRODUCTOS.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR_SET_PRODUCTOS.mensaje });
  }

  if (!datos || datos.length === 0) {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR_SET_PRODUCTOS.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR_SET_PRODUCTOS.mensaje });
  }

  try {
    await repositorio.actualizarSetProducto(datos);
    return res
      .status(MENSAJES.SET_PRODUCTOS_ACTUALIZADO.codigo)
      .json({ mensaje: MENSAJES.SET_PRODUCTOS_ACTUALIZADO.mensaje, datos });
  } catch {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR_SET_PRODUCTOS.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR_SET_PRODUCTOS.mensaje });
  }
};
