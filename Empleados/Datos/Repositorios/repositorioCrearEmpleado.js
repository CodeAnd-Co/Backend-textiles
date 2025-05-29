const db = require('@altertex/util/bd/db');
const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesEmpleados');
const CONSULTAS_EMPLEADOS = require('@altertex/util/const/consultasEmpleados');

//RF[16] Crear empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16]

/**
 * Crea un nuevo empleado y su usuario asociado en la base de datos.
 *
 * @async
 * @function crearEmpleado
 * @param {Object} empleado - Objeto con los datos del nuevo empleado.
 * @param {string} empleado.nombreCompleto - Nombre completo del usuario.
 * @param {string} empleado.correoElectronico - Correo electrónico único del usuario.
 * @param {string} empleado.contrasena - Contraseña en texto plano (ya hasheada).
 * @param {string} empleado.numeroTelefono - Teléfono del usuario (exactamente 10 dígitos).
 * @param {string} empleado.direccion - Dirección del usuario.
 * @param {string} empleado.fechaNacimiento - Fecha de nacimiento (YYYY-MM-DD).
 * @param {string} empleado.genero - Género del usuario.
 * @param {boolean} empleado.estatus - Estatus del usuario (true = activo, false = inactivo).
 * @param {number} empleado.idRol - ID del rol asignado al usuario.
 * @param {number} empleado.idCliente - ID del cliente asociado al usuario.
 * @param {string} empleado.numeroEmergencia - Teléfono de emergencia del empleado.
 * @param {string} empleado.areaTrabajo - Área de trabajo del empleado.
 * @param {string} empleado.posicion - Puesto o cargo del empleado.
 * @param {number} empleado.cantidadPuntos - Puntos acumulados del empleado.
 * @param {string} empleado.antiguedad - Fecha de antigüedad/ingreso (YYYY-MM-DD).
 * @throws {Error} Si el parámetro "empleado" no es un objeto válido o está vacío.
 * @throws {Error} Si ocurre cualquier fallo durante la inserción en la transacción.
 *
 * @returns {Promise<Object>} Resuelve con un objeto que contiene el ID del nuevo empleado y su usuario.
 */
exports.crearEmpleado = async (empleado) => {
  if (!empleado || typeof empleado !== 'object') {
    throw new Error('No se recibió un empleado válido para importar.');
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // Validar correo duplicado
    const [correoExistente] = await conn.query(
      CONSULTAS_IMPORTAR_EMPLEADOS.VALIDAR_CORREOS_DUPLICADOS,
      [[empleado.correoElectronico]]
    );
    if (correoExistente.length > 0) {
      throw new Error(`Correo ya registrado: ${empleado.correoElectronico}`);
    }

    // Validar teléfono duplicado
    const [telefonoExistente] = await conn.query(
      CONSULTAS_IMPORTAR_EMPLEADOS.VALIDAR_TELEFONO_DUPLICADO,
      [[empleado.numeroTelefono]]
    );
    if (telefonoExistente.length > 0) {
      throw new Error(`Teléfono ya registrado: ${empleado.numeroTelefono}`);
    }

    // Insertar usuario
    const [resultadoUsuario] = await conn.query(CONSULTAS_IMPORTAR_EMPLEADOS.INSERTAR_USUARIO, [
      empleado.nombreCompleto,
      empleado.correoElectronico,
      empleado.contrasena,
      empleado.numeroTelefono,
      empleado.direccion,
      empleado.fechaNacimiento,
      empleado.genero,
      empleado.estatus,
    ]);
    const idUsuario = resultadoUsuario.insertId;

    // Insertar rol
    await conn.query(CONSULTAS_IMPORTAR_EMPLEADOS.INSERTAR_ROL, [idUsuario, DEFAULT_ROLE_ID]);

    // Insertar asociación usuario-cliente
    const listaClientes = Array.isArray(empleado.idCliente)
      ? empleado.idCliente
      : [empleado.idCliente];
    for (const idCli of listaClientes) {
      await conn.query(CONSULTAS_IMPORTAR_EMPLEADOS.INSERTAR_USUARIO_CLIENTE, [idUsuario, idCli]);
    }

    // Insertar empleado
    await conn.query(CONSULTAS_IMPORTAR_EMPLEADOS.INSERTAR_EMPLEADO, [
      idUsuario,
      empleado.idCliente,
      empleado.numeroEmergencia,
      empleado.areaTrabajo,
      empleado.posicion,
      parseFloat(empleado.cantidadPuntos),
      empleado.antiguedad,
    ]);

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw new Error(`Error en importación: ${err.message}`);
  } finally {
    if (conn) conn.release();
  }
};
