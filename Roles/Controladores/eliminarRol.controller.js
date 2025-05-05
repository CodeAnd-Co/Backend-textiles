const MENSAJES = require('@altertex/util/const/mensajesRoles');
const repositorio = require('@altertex/rol/repos/repositoriorEliminar');

exports.eliminarRol = async (req, res) => {
  const idRol = req.body.idRol;
  try {
    await repositorio.eliminarRol(idRol);
    return res
      .status(MENSAJES.ELIMINAR_ROL_EXITO.codigo)
      .json({ mensaje: MENSAJES.ELIMINAR_ROL_EXITO.mensaje });
  } catch (error) {
    console.log(error);
    return res.status(MENSAJES.ELIMINAR_ROL_ERROR.codigo).json({ mensaje: error });
  }
};
