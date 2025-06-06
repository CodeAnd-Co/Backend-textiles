const db = require('@altertex/util/bd/db');
const ROL_PREDETERMINADO = 3; // ID del rol por defecto para empleados
const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesEmpleados');
const CONSULTAS_EMPLEADOS = require('@altertex/util/const/consultasEmpleados');
const CONSULTAS_IMPORTAR_EMPLEADOS = require('@altertex/util/const/consultasImportarEmpleados');

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

    // Validar fecha de nacimiento
    if (!/^\d{4}-\d{2}-\d{2}$/.test(empleado.fechaNacimiento)) {
      throw new Error('Fecha de nacimiento inválida. Debe ser en formato YYYY-MM-DD.');
    }
    const fechaNacimiento = new Date(empleado.fechaNacimiento);
    if (isNaN(fechaNacimiento.getTime())) {
      throw new Error('Fecha de nacimiento inválida.');
    }
    const hoy = new Date();
    if (fechaNacimiento > hoy) {
      throw new Error('La fecha de nacimiento no puede ser futura.');
    }
    if (fechaNacimiento.getFullYear() < 1900) {
      throw new Error('La fecha de nacimiento no puede ser anterior a 1900.');
    }

    // Validar que sea mayor o igual a 18 años
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();
    let edadFinal = edad;
    if (mes < 0 || (mes === 0 && dia < 0)) {
      edadFinal--;
    }
    if (edadFinal < 18) {
      throw new Error('El empleado debe tener al menos 18 años.');
    }

    // Validar teléfono duplicado
    const [telefonoExistente] = await conn.query(
      CONSULTAS_IMPORTAR_EMPLEADOS.VALIDAR_TELEFONO_DUPLICADO,
      [[empleado.numeroTelefono]]
    );
    if (telefonoExistente.length > 0) {
      throw new Error(`Teléfono ya registrado: ${empleado.numeroTelefono}`);
    }

    //Validar antigüedad
    if (!/^\d{4}-\d{2}-\d{2}$/.test(empleado.antiguedad)) {
      throw new Error('Antigüedad inválida. Debe ser en formato YYYY-MM-DD.');
    }
    const fechaAntiguedad = new Date(empleado.antiguedad);
    if (isNaN(fechaAntiguedad.getTime())) {
      throw new Error('Antigüedad inválida.');
    }
    if (fechaAntiguedad > hoy) {
      throw new Error('La antigüedad no puede ser futura.');
    }
    if (fechaAntiguedad.getFullYear() < 1900) {
      throw new Error('La antigüedad no puede ser anterior a 1900.');
    }
    // Validar que la antigüedad sea menor o igual a la fecha de nacimiento
    if (fechaAntiguedad < fechaNacimiento) {
      throw new Error('La antigüedad no puede ser anterior a la fecha de nacimiento.');
    }
    // Validar que la antigüedad sea menor o igual a la fecha actual
    if (fechaAntiguedad > hoy) {
      throw new Error('La antigüedad no puede ser posterior a la fecha actual.');
    }

    // Insertar usuario
    const [resultadoUsuario] = await conn.query(CONSULTAS_EMPLEADOS.INSERTAR_USUARIO, [
      empleado.nombreCompleto,
      empleado.correoElectronico,
      empleado.contrasenia,
      empleado.numeroTelefono,
      empleado.direccion,
      empleado.fechaNacimiento,
      empleado.genero,
      empleado.estatus,
    ]);
    const idUsuario = resultadoUsuario.insertId;

    // Insertar rol
    await conn.query(CONSULTAS_EMPLEADOS.INSERTAR_ROL, [idUsuario, ROL_PREDETERMINADO]);

    // Insertar asociación usuario-cliente
    const listaClientes = Array.isArray(empleado.idCliente)
      ? empleado.idCliente
      : [empleado.idCliente];
    for (const idCli of listaClientes) {
      await conn.query(CONSULTAS_EMPLEADOS.INSERTAR_USUARIO_CLIENTE, [idUsuario, idCli]);
    }

    // Insertar empleado
    await conn.query(CONSULTAS_EMPLEADOS.INSERTAR_EMPLEADO, [
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
    throw new Error(`${err.message}`);
  } finally {
    if (conn) conn.release();
  }
};
