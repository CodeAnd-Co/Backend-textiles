const { MENSAJES_AUTENTICACION } = require("@altertex/util/const/mensajes");

module.exports = (...permisosRequeridos) => {
  return (req, res, next) => {
    const usuario = req.user;

    if (!usuario || !usuario.permisos) {
      return res
        .status(MENSAJES_AUTENTICACION.USUARIO_NO_AUTENTICADO.codigo)
        .json({
          mensaje: MENSAJES_AUTENTICACION.USUARIO_NO_AUTENTICADO.mensaje,
        });
    }

    const permisosUsuario = usuario.permisos;

    const tienePermiso = permisosRequeridos.every((permiso) =>
      permisosUsuario.includes(permiso)
    );

    if (!tienePermiso) {
      return res
        .status(MENSAJES_AUTENTICACION.ACCESO_NO_AUTORIZADO.codigo)
        .json({ mensaje: MENSAJES_AUTENTICACION.ACCESO_NO_AUTORIZADO.mensaje });
    }

    next();
  };
};
