const db = require('@altertex/util/bd/db');
const CONSULTAS_USUARIOS = require('@altertex/util/const/consultasUsuarios');

/**
 * Crea un usuario y lo asocia a un rol y a uno o varios clientes en una transacción.
 *
 * @param {string} nombreCompleto
 * @param {string} correoElectronico
 * @param {string} contrasenia
 * @param {string} numeroTelefono
 * @param {string} direccion
 * @param {string} fechaNacimiento
 * @param {string} genero
 * @param {boolean} estatus
 * @param {number} idRol
 * @param {number[]|number} idCliente
 * @returns {Promise<object>} Resultado con idUsuario
 */
exports.crearUsuarioConAsociaciones = async (
  nombreCompleto,
  correoElectronico,
  contrasenia,
  numeroTelefono,
  direccion,
  fechaNacimiento,
  genero,
  estatus,
  idRol,
  idCliente
) => {
  const conexion = await db.getConnection();

  try {
    await conexion.beginTransaction();

    const valoresUsuario = [
      nombreCompleto,
      correoElectronico,
      contrasenia,
      numeroTelefono,
      direccion,
      fechaNacimiento,
      genero,
      estatus
    ];

    // 1. Insertar usuario
    const [resultadoUsuario] = await conexion.query(CONSULTAS_USUARIOS.CREAR_USUARIO, valoresUsuario);
    const idUsuario = resultadoUsuario.insertId;

    // 2. Asociar rol
    await conexion.query(CONSULTAS_USUARIOS.ASIGNAR_ROL_A_USUARIO, [idUsuario, idRol]);

    // 3. Asociar a clientes
    const clientes = Array.isArray(idCliente) ? idCliente : [idCliente];

    for (const clienteId of clientes) {
      await conexion.query(CONSULTAS_USUARIOS.ASOCIAR_USUARIO_A_CLIENTE, [idUsuario, clienteId]);
    }

    await conexion.commit();
    return { success: true, idUsuario };

  } catch (error) {
    if (conexion) await conexion.rollback();
    throw error;
  } finally {
    if (conexion) conexion.release();
  }
};