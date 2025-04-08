const repositorio = require("../Data/Repositorios/repositorioInicioSesion");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.inicioSesion = async (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia) {
    res
      .status(400)
      .json({ mensaje: "Se necesita ingresar correo y contraseña" });
  }

  try {
    const usuario = await repositorio.obtenerUsuario(correo);

    if (!usuario) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // const esCorrecta = await bcrypt.compare(contrasenia, usuario.contrasenia);

    // if (!esCorrecta) {
    //   return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    // }

    if (usuario.contrasenia !== contrasenia) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ correo: usuario.correo }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ message: "Funciona esta ruta", token, usuario });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener usuario" });
  }
};
