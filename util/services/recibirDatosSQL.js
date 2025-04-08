// getItem.js
const conexion = require("../Database/db"); // Import the connection from db.js

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
