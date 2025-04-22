/* eslint-disable operator-linebreak */
const repositorio = require("@altertex/usu/repos/repositorioCrearUsuario");
const bcrypt = require("bcryptjs");
const MENSAJES_USUARIOS = require("@altertex/util/const/mensajesUsuarios");

/**
 * Controlador para crear un nuevo usuario.
 * RF1 - Crear Usuario - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF1
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
 * @throws {Error}
 */
exports.crearUsuario = async (req, res) => {
  const {
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

  // Validar que el correo electrónico tenga un formato válido
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoValido.test(correoElectronico)) {
    return res
      .status(MENSAJES_USUARIOS.CORREO_INVALIDO.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.CORREO_INVALIDO.mensaje });
  }

  // Validar que la contraseña tenga al menos 8 caracteres y contenga un carácter especial
  const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
  if (contrasenia.length < 8) {
    return res
      .status(MENSAJES_USUARIOS.CONTRASENA_DEBIL.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.CONTRASENA_DEBIL.mensaje });
  }

  if (!tieneCaracterEspecial.test(contrasenia)) {
    return res
      .status(MENSAJES_USUARIOS.CONTRASENA_DEBIL.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.CONTRASENA_DEBIL.mensaje });
  }

  // Validar que el número de teléfono tenga un formato válido (10 dígitos)
  const telefonoValido = /^\d{10}$/;
  if (!telefonoValido.test(numeroTelefono)) {
    return res
      .status(MENSAJES_USUARIOS.TELEFONO_INVALIDO.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.TELEFONO_INVALIDO.mensaje });
  }

  try {
    const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);

    const resultado = await repositorio.crearUsuario(
      nombreCompleto,
      correoElectronico,
      contraseniaEncriptada,
      numeroTelefono,
      direccion,
      fechaNacimiento,
      genero,
      estatus
    );

    if (resultado.affectedRows && resultado.insertId) {
      const idUsuarioInsertado = resultado.insertId;
      await repositorio.asociarRolAUsuario(idUsuarioInsertado, idRol);
      await repositorio.asociarClienteAUsuario(idUsuarioInsertado, idCliente);

      return res
        .status(MENSAJES_USUARIOS.USUARIO_CREADO.codigo)
        .json({ mensaje: MENSAJES_USUARIOS.USUARIO_CREADO.mensaje });
    } else {
      return res
        .status(MENSAJES_USUARIOS.DATOS_INCOMPLETOS.codigo)
        .json({ mensaje: MENSAJES_USUARIOS.DATOS_INCOMPLETOS.mensaje });
    }
  } catch (error) {
    console.error("Error en el controlador:", error);
    return res
      .status(MENSAJES_USUARIOS.ERROR_CREAR_USUARIO.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.ERROR_CREAR_USUARIO.mensaje });
  }
};
