const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_USUARIOS = require('@altertex/util/const/consultasUsuarios');

/**
 * Crea un nuevo usuario en la base de datos.
 *
 * Ejecuta una consulta SQL para insertar los datos del usuario.
 *
 * @param {string} nombreCompleto - Nombre completo del usuario.
 * @param {string} correoElectronico - Correo electrónico del usuario.
 * @param {string} contrasenia - Contraseña del usuario.
 * @param {string} numeroTelefono - Número de teléfono del usuario.
 * @param {string} direccion - Dirección del usuario.
 * @param {string} fechaNacimiento - Fecha de nacimiento del usuario.
 * @param {string} genero - Género del usuario.
 * @param {string} estatus - Estatus del usuario (activo, inactivo, etc.).
 * @returns {Promise<object>} El resultado de la operación de inserción en la base de datos.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
exports.crearUsuario = async (
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
    console.error('Error al crear usuario', error);
    throw error;
  }
};

/**
 * Asocia un rol a un usuario en la base de datos.
 *
 * Ejecuta una consulta SQL para asignar un rol a un usuario específico.
 *
 * @param {number|string} idUsuario - ID del usuario al que se le asignará el rol.
 * @param {number|string} idRol - ID del rol que se asignará al usuario.
 * @returns {Promise<object>} El resultado de la operación de asignación en la base de datos.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
exports.asociarRolAUsuario = async (idUsuario, idRol) => {
  const query = CONSULTAS_USUARIOS.ASIGNAR_ROL_A_USUARIO;
  try {
    const resultado = await correrQuery(query, [idUsuario, idRol]);
    return resultado;
  } catch (error) {
    console.error('Error al asociar rol al usuario:', error);
    throw error;
  }
};

/**
 * Asocia un cliente a un usuario en la base de datos.
 *
 * Ejecuta una consulta SQL para asociar un cliente a un usuario específico.
 *
 * @param {number|string} idUsuario - ID del usuario al que se le asociará el cliente.
 * @param {number|string} idCliente - ID del cliente que se asociará al usuario.
 * @returns {Promise<object>} El resultado de la operación de asociación en la base de datos.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
exports.asociarClienteAUsuario = async (idUsuario, idCliente) => {
  const query = CONSULTAS_USUARIOS.ASOCIAR_USUARIO_A_CLIENTE;
  try {
    const resultado = await correrQuery(query, [idUsuario, idCliente]);
    return resultado;
  } catch (error) {
    console.error('Error al asociar cliente al usuario:', error);
    throw error;
  }
};
