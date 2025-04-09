/**
 * Obtiene un registro de una tabla utilizando condiciones basadas en llaves.
 *
 * @async
 * @function
 * @param {string} nombreTabla - Nombre de la tabla de la base de datos.
 * @param {Object} llaves - Objeto con las claves y valores que definen la condición WHERE.
 * @returns {Promise<Object|null>} Promesa que se resuelve con el primer registro que coincida o `null` si no hay resultados.
 *
 * @example
 * const usuario = await getItem('usuarios', { id: 1 });
 */
module.exports = async (nombreTabla, llaves) => {
  const condiciones = Object.keys(llaves)
    .map((key) => `${key} = '${llaves[key]}'`)
    .join(" AND ");

  const query = `SELECT * FROM ${nombreTabla} WHERE ${condiciones}`;

  return new Promise((resolver, rechazar) => {
    conexion.query(query, (err, results) => {
      if (err) {
        rechazar(err);
      } else {
        resolver(results.length > 0 ? results[0] : null);
      }
    });
  });
};
