const db = require("@altertex/util/bd/db");
const QUERY = require("@altertex/util/const/consultasRoles");

/**
 * Verifica si un rol con el nombre especificado ya existe en la base de datos.
 *
 * @async
 * @function verificarNombreRol
 * @param {string} nombre - Nombre del rol a verificar.
 * @returns {Promise<boolean>} Retorna `true` si el rol existe, `false` en caso contrario.
 */
exports.verificarNombreRol = async (nombre) => {
  const conexion = db.promise();
  const [rows] = await conexion.execute(QUERY.VERIFICAR_NOMBRE_ROL, [nombre]);
  return rows.length > 0;
};

/**
 * Verifica si un permiso con el ID especificado existe en la base de datos.
 *
 * @async
 * @function verificarPermiso
 * @param {number} idPermiso - ID del permiso a verificar.
 * @returns {Promise<boolean>} Retorna `true` si el permiso existe, `false` en caso contrario.
 */
exports.verificarPermiso = async (idPermiso) => {
  const conexion = db.promise();
  const [rows] = await conexion.execute(QUERY.VERIFICAR_PERMISO, [idPermiso]);
  return rows.length > 0;
};

/**
 * Inserta un nuevo rol en la base de datos.
 *
 * @async
 * @function crearRol
 * @param {string} nombre - Nombre del nuevo rol.
 * @param {string} descripcion - Descripción del nuevo rol.
 * @returns {Promise<Object>} Retorna el resultado de la operación de inserción, incluyendo el ID del nuevo rol.
 */
exports.crearRol = async (nombre, descripcion) => {
  const conexion = db.promise();
  const [resultado] = await conexion.execute(QUERY.INSERTAR_ROL, [nombre, descripcion]);
  return resultado;
};

/**
 * Asocia una lista de permisos a un rol específico en la base de datos.
 * Realiza la operación en una transacción para asegurar la integridad de los datos.
 *
 * @async
 * @function asociarPermisosARol
 * @param {number} idRol - ID del rol al que se asociarán los permisos.
 * @param {number[]} permisos - Lista de IDs de permisos a asociar.
 * @throws {Error} Lanza un error si ocurre algún fallo en la transacción.
 * @returns {Promise<void>}
 */
exports.asociarPermisosARol = async (idRol, permisos) => {
  const conexion = db.promise();

  try {
    await conexion.beginTransaction();

    for (const idPermiso of permisos) {
      await conexion.execute(QUERY.INSERTAR_ROL_PERMISO, [idRol, idPermiso]);
    }

    await conexion.commit();
  } catch (error) {
    await conexion.rollback();
    throw new Error("Error asociando permisos al rol");
  }
};
