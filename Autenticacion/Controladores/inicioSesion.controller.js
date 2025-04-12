const repositorio = require("@altertex/aut/repos/repositorioInicioSesion");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { MENSAJES_AUTENTICACION } = require("@altertex/util/const/mensajes");

exports.inicioSesion = async (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia) {
    return res
      .status(MENSAJES_AUTENTICACION.CAMPOS_OBLIGATORIOS.codigo)
      .json({ mensaje: MENSAJES_AUTENTICACION.CAMPOS_OBLIGATORIOS.mensaje });
  }

  const formatoCorreoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  if (!formatoCorreoValido) {
    return res
      .status(MENSAJES_AUTENTICACION.FORMATO_CORREO_INVALIDO.codigo)
      .json({
        mensaje: MENSAJES_AUTENTICACION.FORMATO_CORREO_INVALIDO.mensaje,
      });
  }

  try {
    const usuario = await repositorio.obtenerUsuario(correo);
    const resultadoPermisos = await repositorio.obtenerPermisos(correo);
    const permisos = resultadoPermisos.map(
      (objetosPermisos) => objetosPermisos.nombre
    );

    if (!usuario) {
      return res
        .status(MENSAJES_AUTENTICACION.CREDENCIALES_INVALIDAS.codigo)
        .json({
          mensaje: MENSAJES_AUTENTICACION.CREDENCIALES_INVALIDAS.mensaje,
        });
    }

    const contraCorrecta = await bcrypt.compare(
      contrasenia,
      usuario.contrasenia
    );

    if (!contraCorrecta) {
      return res
        .status(MENSAJES_AUTENTICACION.CREDENCIALES_INVALIDAS.codigo)
        .json({
          mensaje: MENSAJES_AUTENTICACION.CREDENCIALES_INVALIDAS.mensaje,
        });
    }

    const token = jwt.sign(
      { correo: usuario.correo, permisos },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res
      .status(MENSAJES_AUTENTICACION.INICIO_SESION_EXITOSO.codigo)
      .json({ mensaje: MENSAJES_AUTENTICACION.INICIO_SESION_EXITOSO.mensaje });
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    return res
      .status(MENSAJES_AUTENTICACION.ERROR_SERVIDOR.codigo)
      .json({ mensaje: MENSAJES_AUTENTICACION.ERROR_SERVIDOR.mensaje });
  }
};
