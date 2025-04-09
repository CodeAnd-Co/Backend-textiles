const repositorio = require("../Data/Repositorios/repositorioInicioSesion");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
 * - 400 si faltan campos requeridos.
 * - 401 si las credenciales son incorrectas.
 * - 500 si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error inesperado durante la operación.
 */
exports.inicioSesion = async (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia) {
    return res
      .status(400)
      .json({ mensaje: "Se necesita ingresar correo y contraseña" });
  }

  try {
    const usuario = await repositorio.obtenerUsuario(correo);
    const roles = await repositorio.obtenerRoles(correo);

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const contraCorrecta = await bcrypt.compare(
      contrasenia,
      usuario.contrasenia
    );

    if (!contraCorrecta) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { correo: usuario.correo, rol: roles.rol },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ message: "Inicio de sesion exitoso" });
  } catch {
    return res.status(500).json({ mensaje: "Error al obtener usuario" });
  }
};
