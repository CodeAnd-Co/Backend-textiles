const repositorio = require("@altertex/aut/repos/repositorioInicioSesion");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const MENSAJES_AUTENTICACION = require("@altertex/util/const/mensajesAutenticacion");

/**
 * Controlador para el inicio de sesión de un usuario.
 *
 * @async
 * @function inicioSesion
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @param {string} req.body.correo - Correo electrónico del usuario.
 * @param {string} req.body.contrasenia - Contraseña proporcionada por el usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {Response} Respuesta HTTP con estado:
 * - 200 si el inicio de sesión es exitoso, junto con un JWT.
 * - 400 si faltan campos requeridos o el formato del correo es inválido.
 * - 401 si las credenciales son incorrectas.
 * - 500 si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error inesperado durante la operación.
 */
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
    const resultadoQuery = await repositorio.obtenerUsuario(correo);

    const usuario = resultadoQuery.infoUsuario[0];
    const permisos = resultadoQuery.permisos;

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
