const { ACTUALIZAR } = require('./consultasEmpleados');

module.exports = {
  CREAR: `
    INSERT INTO imagen(urlImagen, tipoImagen, textoAlternativo)
    VALUES (?, ?, ?);
    `,
  ACTUALIZAR: `
    UPDATE imagen
    SET urlImagen = ?, tipoImagen = ?, textoAlternativo = ?
    WHERE idImagen = ?;
  `,
};
