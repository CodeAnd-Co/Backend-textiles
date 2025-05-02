// RF[30] Eliminar Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30]
const correrQuery = require("@altertex/util/ser/correrQuery");
const { ELIMINAR_PRODUCTOS } = require("@altertex/util/const/consultasProductos");

/**
 * Funcion para eliminar productos de la base de datos.
 *
 * RF30 - Eliminar Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30]
 * 
 * @async
 * @function eliminarProductos
 * @param {Array<number>} ids - Array de IDs de productos a eliminar.
 *
 * @returns {Promise<boolean>} Resultado de la eliminación.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 * - Retorna true si se eliminaron productos, false en caso contrario.
 */
const eliminarProductos = async (ids) => {
    try {
      const placeholders = ids.map(() => '?').join(',');
      const query = ELIMINAR_PRODUCTOS.replace('(?)', `(${placeholders})`);
  
      console.log("Query generado:", query);
      console.log("IDs enviados:", ids);
  
      const resultado = await correrQuery(query, ids);
      return resultado.affectedRows > 0;
    } catch (error) {
      console.error("Error en eliminarProductos:", error);
      return false;
    }
  };

module.exports = {
  eliminarProductos,
};
