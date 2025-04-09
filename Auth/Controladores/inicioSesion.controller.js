const repositorio = require("../Data/Repositorios/repositorioInicioSesion");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Controlador para el inicio de sesión de un usuario.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void}
 *
 * @description
 * Verifica las credenciales del usuario (correo y contraseña).
 * Si son correctas, genera un token JWT y lo guarda en una cookie segura.
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

    res.status(200).json({ message: "Inicio de sesion exitoso", token });
  } catch {
    return res.status(500).json({ mensaje: "Error al obtener usuario" });
  }
};
