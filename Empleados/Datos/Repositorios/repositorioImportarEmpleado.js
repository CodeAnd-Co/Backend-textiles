// src/emp/repos/repositorioImportarEmpleado.js
const conexion = require('@altertex/util/bd/db');

/**
 * Importación masiva de empleados con creación de usuario, asignación de rol y cliente.
 *
 * @async
 * @function importarEmpleadosMasivo
 * @param {object[]} empleados Array de objetos con datos de usuario y empleado.
 * @throws {Error} Si no hay datos o si ocurre un fallo en la transacción.
 */
exports.importarEmpleadosMasivo = async (empleados) => {
  if (!Array.isArray(empleados) || empleados.length === 0) {
    throw new Error('No se recibió ningún empleado para importar.');
  }

  // Obtenemos la conexión promesada
  const conn = conexion.promise();

  try {
    // Iniciamos la transacción
    await conn.beginTransaction();

    // 1) Validar correos duplicados en bloque
    const correos = empleados.map(elemento => elemento.correoElectronico);
    const [correosExistentes] = await conn.query(
      'SELECT correoElectronico FROM usuario WHERE correoElectronico IN (?)',
      [correos]
    );
    if (correosExistentes.length > 0) {
      const lista = correosExistentes.map(fila => fila.correoElectronico).join(', ');
      throw new Error(`Correos ya registrados: ${lista}`);
    }

    // 2) Validar teléfonos duplicados en bloque
    const telefonos = empleados.map(elemento => elemento.numeroTelefono);
    const [telefonosExistentes] = await conn.query(
      'SELECT numeroTelefono FROM usuario WHERE numeroTelefono IN (?)',
      [telefonos]
    );
    if (telefonosExistentes.length > 0) {
      const lista = telefonosExistentes.map(fila => fila.numeroTelefono).join(', ');
      throw new Error(`Teléfonos ya registrados: ${lista}`);
    }

    // 3) Bulk‐insert de usuarios
    const usuariosValues = empleados.map(elemento => [
      elemento.nombreCompleto,
      elemento.correoElectronico,
      elemento.contrasena,
      elemento.numeroTelefono,
      elemento.direccion,
      elemento.fechaNacimiento,
      elemento.genero,
      elemento.estatus
    ]);
    await conn.query(
      `INSERT INTO usuario
         (nombreCompleto, correoElectronico, contrasenia, numeroTelefono, direccion, fechaNacimiento, genero, estatus)
       VALUES ?`,
      [usuariosValues]
    );

    // 4) Recuperar los IDs generados
    const [rowsUsuarios] = await conn.query(
      'SELECT idUsuario, correoElectronico FROM usuario WHERE correoElectronico IN (?)',
      [correos]
    );
    const idMap = rowsUsuarios.reduce((map, row) => {
      map[row.correoElectronico] = row.idUsuario;
      return map;
    }, {});

    // 5) Bulk‐insert de roles
    const rolValues = empleados.map(elemento => [
      idMap[elemento.correoElectronico],
      elemento.idRol
    ]);
    await conn.query(
      'INSERT INTO usuario_rol (idUsuario, idRol) VALUES ?',
      [rolValues]
    );

    // 6) Bulk‐insert de asociaciones usuario‐cliente
    const clienteValues = [];
    empleados.forEach(elemento => {
      const idU = idMap[elemento.correoElectronico];
      const listaClientes = Array.isArray(elemento.idCliente) ? elemento.idCliente : [elemento.idCliente];
      listaClientes.forEach(idCli => clienteValues.push([idU, idCli]));
    });
    await conn.query(
      'INSERT INTO usuario_cliente (idUsuario, idCliente) VALUES ?',
      [clienteValues]
    );

    // 7) Bulk‐insert de empleados
    const empValues = empleados.map(elemento => [
      idMap[elemento.correoElectronico],
      elemento.idCliente,
      elemento.numeroEmergencia,
      elemento.areaTrabajo,
      elemento.posicion,
      parseFloat(elemento.cantidadPuntos),
      elemento.antiguedad
    ]);
    await conn.query(
      `INSERT INTO empleado
         (idUsuario, idCliente, numeroEmergencia, areaTrabajo, posicion, cantidadPuntos, antiguedad)
       VALUES ?`,
      [empValues]
    );

    // 8) Commit
    await conn.commit();
  } catch (err) {
    // rollback y propagar
    await conn.rollback();
    throw new Error(`Error en importación masiva: ${err.message}`);
  }
};
