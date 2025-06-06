const consultas = require('@altertex/util/const/consultasProveedores');


/**
 * Verifica si un proveedor existe en la base de datos.
 * @param {object} conexion - La conexión a la base de datos.
 * @param {number|null} idProveedor - El ID del proveedor a verificar.
 * @returns {Promise<boolean>} True si el proveedor existe o si idProveedor es null.
 */
async function proveedorExiste(conexion, idProveedor) {
  if (idProveedor === null) return true; // Permitido por diseño
  const [result] = await conexion.query(
    consultas.VERIFICAR_EXISTE,
    [idProveedor]
  );
  return result.length > 0;
}

module.exports = { proveedorExiste };
