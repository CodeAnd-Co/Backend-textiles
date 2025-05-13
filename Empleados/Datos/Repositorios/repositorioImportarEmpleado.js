const conexion = require('@altertex/util/bd/db');
const DEFAULT_ROLE_ID = 3; 
const CONSULTAS_IMPORTAR_EMPLEADOS = require('@altertex/util/const/consultasImportarEmpleados');
/**
 * Importa en bloque múltiples empleados, creando sus usuarios, asignando rol y vinculación con clientes.
 *
 * @async
 * @function importarEmpleadosMasivo
 * @param {Array} empleados - Lista de objetos con los datos de usuario y empleado.
 * @param {string} empleados[].nombreCompleto      - Nombre completo del usuario.
 * @param {string} empleados[].correoElectronico   - Correo electrónico único del usuario.
 * @param {string} empleados[].contrasena           - Contraseña en texto plano (ya hasheada previo a la llamada).
 * @param {string} empleados[].numeroTelefono       - Teléfono del usuario (exactamente 10 dígitos).
 * @param {string} empleados[].direccion            - Dirección del usuario.
 * @param {string} empleados[].fechaNacimiento      - Fecha de nacimiento (YYYY-MM-DD).
 * @param {string} empleados[].genero               - Género del usuario.
 * @param {boolean} empleados[].estatus             - Estatus del usuario (true = activo, false = inactivo).
 * @param {number|Array<number>} empleados[].idCliente - Uno o varios IDs de cliente asociados.
 * @param {string} empleados[].numeroEmergencia     - Teléfono de emergencia.
 * @param {string} empleados[].areaTrabajo          - Área de trabajo del empleado.
 * @param {string} empleados[].posicion             - Puesto o cargo del empleado.
 * @param {number} empleados[].cantidadPuntos       - Puntos acumulados del empleado.
 * @param {string} empleados[].antiguedad           - Fecha de antigüedad/ingreso (YYYY-MM-DD).
 * @throws {Error} Si el parámetro "empleados" no es un array válido o está vacío.
 * @throws {Error} Si se detectan correos o teléfonos duplicados en la base de datos.
 * @throws {Error} Si ocurre cualquier fallo durante la inserción en la transacción.
 *
 * @returns {Promise<void>} Resuelve sin valor si la importación fue exitosa.
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
      CONSULTAS_IMPORTAR_EMPLEADOS.VALIDAR_CORREOS_DUPLICADOS,
      [correos]
    );
    if (correosExistentes.length > 0) {
      const lista = correosExistentes.map(fila => fila.correoElectronico).join(', ');
      throw new Error(`Correos ya registrados: ${lista}`);
    }

    // 2) Validar teléfonos duplicados en bloque
    const telefonos = empleados.map(elemento => elemento.numeroTelefono);
    const [telefonosExistentes] = await conn.query(
      CONSULTAS_IMPORTAR_EMPLEADOS.VALIDAR_TELEFONO_DUPLICADO,
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
      CONSULTAS_IMPORTAR_EMPLEADOS.INSERTAR_USUARIO_EN_VOLUMEN,
      [usuariosValues]
    );

    // 4) Recuperar los IDs generados
    const [rowsUsuarios] = await conn.query(
      CONSULTAS_IMPORTAR_EMPLEADOS.OBTENER_ID_GENERADOS,
      [correos]
    );
    const idMap = rowsUsuarios.reduce((map, row) => {
      map[row.correoElectronico] = row.idUsuario;
      return map;
    }, {});

    // 5) Bulk‐insert de roles
    const rolValues = empleados.map(elemento => [
      idMap[elemento.correoElectronico],
      DEFAULT_ROLE_ID
    ]);
    await conn.query(
      CONSULTAS_IMPORTAR_EMPLEADOS.INSERTAR_ROLES_EN_VOLUMEN,
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
      CONSULTAS_IMPORTAR_EMPLEADOS.INSERTAR_USUARIO_CLIENTE_EN_VOLUMEN,
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
      CONSULTAS_IMPORTAR_EMPLEADOS.INSERTAR_EMPLEADOS_EN_VOLUMEN,
      [empValues]
    );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw new Error(`Error en importación masiva: ${err.message}`);
  }
};
