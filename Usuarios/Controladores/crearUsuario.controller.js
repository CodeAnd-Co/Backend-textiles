const repositorio = require("@altertex/usu/repos/repositorioCrearUsuario");
const bcrypt = require("bcryptjs");

/**
 * Controlador para crear un nuevo usuario.
 *
 * @async
 * @function crearUsuario
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @param {string} req.body.nombreCompleto - Nombre completo del usuario.
 * @param {string} req.body.correoElectronico - Correo electrónico del usuario.
 * @param {string} req.body.contrasenia - Contraseña proporcionada por el usuario (sin hashear).
 * @param {string} req.body.numeroTelefono - Número de teléfono del usuario.
 * @param {string} req.body.direccion - Dirección del usuario.
 * @param {string} req.body.fechaNacimiento - Fecha de nacimiento en formato YYYY-MM-DD.
 * @param {string} req.body.genero - Género del usuario.
 * @param {boolean} req.body.estatus - Estatus activo/inactivo del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {Response} Respuesta HTTP con estado:
 * - 201 si el usuario se creó correctamente.
 * - 400 si faltan campos requeridos.
 * - 401 si no se pudo crear el usuario.
 * - 500 si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error inesperado durante la operación.
 */
exports.crearUsuario = async (req, res) => {
  const {
    // idUsuario,
    nombreCompleto,
    correoElectronico,
    contrasenia,
    numeroTelefono,
    direccion,
    fechaNacimiento,
    genero,
    estatus,
    idRol,
    idCliente,
  } = req.body;

  // Validar que todos los campos requeridos estén presentes
  if (
    // !idUsuario ||

    !nombreCompleto ||
    !correoElectronico ||
    !contrasenia ||
    !numeroTelefono ||
    !direccion ||
    !fechaNacimiento ||
    !genero ||
    estatus === undefined ||
    !idRol ||
    !idCliente
  ) {
    return res.status(400).json({ mensaje: "Faltan campos requeridos" });
  }

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoValido.test(correoElectronico)) {
    return res.status(400).json({ mensaje: "Correo electrónico no válido" });
  }

  console.log("contraseña", contrasenia);
  const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
  if (contrasenia.length < 8) {
    return res.status(400).json({
      mensaje: "La contraseña debe tener al menos 8 caracteres",
    });
  }
  if (!tieneCaracterEspecial.test(contrasenia)) {
    return res.status(400).json({
      mensaje: "La contraseña debe contener al menos un carácter especial",
    });
  }

  try {
    const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);

    const resultado = await repositorio.crearUsuario(
      // idUsuario,
      nombreCompleto,
      correoElectronico,
      contraseniaEncriptada,
      numeroTelefono,
      direccion,
      fechaNacimiento,
      genero,
      estatus
    );

    if (resultado.affectedRows && resultado.affectedRows > 0) {
      //Si el usuario se creó correctamente, asignar el rol y el cliente
      const idUsuarioInsertado = resultado.insertId;
      await repositorio.asociarRolAUsuario(idUsuarioInsertado, idRol);
      await repositorio.asociarClienteAUsuario(idUsuarioInsertado, idCliente);

      return res.status(201).json({ mensaje: "Usuario creado correctamente" });
    } else {
      return res.status(400).json({ mensaje: "No se pudo crear el usuario" });
    }
  } catch (error) {
    console.error("Error en el controlador:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
