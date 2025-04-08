// getItem.js
const conexion = require("./db"); // Import the connection from db.js

module.exports = async (nombreTabla, llaves) => {
  // Construct the WHERE clause based on the provided keys (llaves)
  const condiciones = Object.keys(llaves)
    .map((llaves) => `${llaves} = '${llaves[llaves]}'`)
    .join(" AND ");

  const query = `SELECT * FROM ${nombreTabla} WHERE ${condiciones}`;

  return new Promise((resolver, rechazar) => {
    conexion.query(query, (err, results) => {
      if (err) {
        rechazar(err);
      } else {
        // Return the first result (or null if no record is found)
        resolver(results.length > 0 ? results[0] : null);
      }
    });
  });
};
