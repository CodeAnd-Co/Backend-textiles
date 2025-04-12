const { MENSAJES_AUTENTICACION } = require("@altertex/util/const/mensajes");

exports.cerrarSesion = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(MENSAJES_AUTENTICACION.SESION_NO_EXISTENTE.codigo)
        .json({ mensaje: MENSAJES_AUTENTICACION.SESION_NO_EXISTENTE.mensaje });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res
      .status(MENSAJES_AUTENTICACION.CIERRE_SESION_EXITOSO.codigo)
      .json({ mensaje: MENSAJES_AUTENTICACION.CIERRE_SESION_EXITOSO.mensaje });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);

    return res
      .status(MENSAJES_AUTENTICACION.ERROR_CIERRE_SESION.codigo)
      .json({ mensaje: MENSAJES_AUTENTICACION.ERROR_CIERRE_SESION.mensaje });
  }
};
