const repositorio = require('@altertex/rol/repos/obtenerOpcionesRolRepositorio');
const MENSAJES = require('@altertex/util/const/mensajesRoles');

exports.obtenerOpcionesRol = async (req, res) => {
  try {
    const resultado = await repositorio.obtenerPermisos();
    return res.status(200).json({ mensaje: MENSAJES.PERMISOS_OBTENIDOS, resultado });
  } catch (error) {
    console.error('Error obteniendo permisos:', error);
    return res.status(500).json({ mensaje: MENSAJES.ERROR_OBTENIENDO_PERMISOS });
  }
};
