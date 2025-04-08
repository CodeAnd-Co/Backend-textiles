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

  // Verifica que se hayan proporcionado ambos campos
  if (!correo || !contrasenia) {
    return res
      .status(400)
      .json({ mensaje: "Se necesita ingresar correo y contraseña" });
  }

  try {
    // Busca al usuario en la base de datos por su correo
    const usuario = await repositorio.obtenerUsuario(correo);

    if (!usuario) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Compara la contraseña proporcionada con la almacenada
    // Esta comparación es directa (no segura); usar bcrypt sería lo ideal
    if (usuario.contrasenia !== contrasenia) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    // Genera un token JWT con una duración de 1 hora
    const token = jwt.sign({ correo: usuario.correo }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Guarda el token en una cookie segura
    res.cookie("token", token, {
      httpOnly: true, // Solo accesible desde el servidor
      secure: true, // Solo se envía por HTTPS
      sameSite: "None", // Necesario para cookies en sitios cruzados
    });

    // Respuesta exitosa con el token
    res.status(200).json({ message: "Inicio de sesion exitoso", token });
  } catch (error) {
    // Manejo de errores internos del servidor
    return res.status(500).json({ mensaje: "Error al obtener usuario" });
  }
};
