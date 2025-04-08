// runQuery.js
const conexion = require("../Database/db"); // Import the connection from db.js

module.exports = async (query, params = []) => {
  return new Promise((resolver, rechazar) => {
    conexion.query(query, params, (err, results) => {
      if (err) {
        rechazar(err);
      } else {
        resolver(results);
      }
    });
  });
};
