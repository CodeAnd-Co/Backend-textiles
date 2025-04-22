const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_USUARIOS = require("@altertex/util/const/consultasUsuarios");

/**
 * Inserta un nuevo usuario en la base de datos MySQL.
 * RF1 - Crear Usuario - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF1
 * @async
 * @function crearUsuario
 * @param {string} nombreCompleto - Nombre completo del usuario.
 * @param {string} correoElectronico - Correo electrónico del usuario.
 * @param {string} contrasenia - Contraseña encriptada del usuario.
 * @param {string} numeroTelefono - Número de teléfono del usuario.
 * @param {string} direccion - Dirección del usuario.
 * @param {string} fechaNacimiento - Fecha de nacimiento (formato YYYY-MM-DD).
 * @param {string} genero - Género del usuario.
 * @param {boolean} estatus - Estatus activo/inactivo del usuario.
 *
 * @returns {Promise<Object>} Objeto de resultado de la operación de MySQL.
 * Contiene propiedades como `affectedRows`, `insertId`, etc.
 *
 * @throws {Error} Si ocurre un error durante la ejecución del query.
 *
 * @description
 * Ejecuta un `INSERT INTO Usuario (...) VALUES (...)` utilizando la consulta
 * definida en `consultasUsuarios.crearUsuarioQuery` y el servicio `correrQuery`.
 */

// Función para insertar un nuevo usuario en la base de datos MySQL
exports.crearUsuario = async (
  // idUsuario,
  nombreCompleto,
  correoElectronico,
  contrasenia,
  numeroTelefono,
  direccion,
  fechaNacimiento,
  genero,
  estatus
) => {
  const query = CONSULTAS_USUARIOS.CREAR_USUARIO;
  try {
    const resultado = await correrQuery(query, [
      // idUsuario,
      nombreCompleto,
      correoElectronico,
      contrasenia,
      numeroTelefono,
      direccion,
      fechaNacimiento,
      genero,
      estatus,
    ]);
    return resultado;
  } catch (error) {
    console.error("Error al crear usuario", error);
    throw error;
  }
};

exports.asociarRolAUsuario = async (idUsuario, idRol) => {
  const query = CONSULTAS_USUARIOS.ASIGNAR_ROL_A_USUARIO;
  try {
    const resultado = await correrQuery(query, [idUsuario, idRol]);
    return resultado;
  } catch (error) {
    console.error("Error al asociar rol al usuario:", error);
    throw error;
  }
};

exports.asociarClienteAUsuario = async (idUsuario, idCliente) => {
  const query = CONSULTAS_USUARIOS.ASOCIAR_USUARIO_A_CLIENTE;
  try {
    const resultado = await correrQuery(query, [idUsuario, idCliente]);
    return resultado;
  } catch (error) {
    console.error("Error al asociar cliente al usuario:", error);
    throw error;
  }
};
