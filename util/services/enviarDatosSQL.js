// insertItem.js
const conexion = require("./db"); // Import the connection from db.js

module.exports = async (nombreTabla, modelo) => {
  // Prepare the query for inserting a record into the MySQL table
  const columnas = Object.keys(modelo).join(", ");
  const valores = Object.values(modelo)
    .map((valor) => `'${valor}'`)
    .join(", ");

  const query = `INSERT INTO ${nombreTabla} (${columnas}) VALUES (${valores})`;

  // Execute the query
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
