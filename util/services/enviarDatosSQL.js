/**
 * @file insertItem.js
 * @description Inserta dinámicamente un registro en una tabla MySQL usando la conexión exportada desde db.js.
 */

const conexion = require("../Database/db"); // Importa la conexión a MySQL

/**
 * Inserta un nuevo registro en la tabla especificada de la base de datos.
 *
 * @async
 * @function
 * @param {string} nombreTabla - El nombre de la tabla en la que se desea insertar el registro.
 * @param {Object} modelo - Un objeto que representa los datos a insertar. Las claves son los nombres de las columnas y los valores, los datos a insertar.
 * @returns {Promise<Object>} Una promesa que se resuelve con el resultado de la consulta si tiene éxito, o se rechaza con el error en caso contrario.
 *
 * @example
 * const insertItem = require('./insertItem');
 * const nuevoProducto = { nombre: 'Camiseta', precio: 19.99 };
 * insertItem('productos', nuevoProducto)
 *   .then(res => console.log('Insertado con éxito:', res))
 *   .catch(err => console.error('Error al insertar:', err));
 */
module.exports = async (nombreTabla, modelo) => {
  // Prepara la consulta para insertar un registro en la tabla MySQL
  const columnas = Object.keys(modelo).join(", ");
  const valores = Object.values(modelo)
    .map((valor) => `'${valor}'`)
    .join(", ");

  const query = `INSERT INTO ${nombreTabla} (${columnas}) VALUES (${valores})`;

  // Ejecuta la consulta
  return new Promise((resolver, rechazar) => {
    conexion.query(query, (err, results) => {
      if (err) {
        rechazar(err);
      } else {
        resolver(results);
      }
    });
  });
};
