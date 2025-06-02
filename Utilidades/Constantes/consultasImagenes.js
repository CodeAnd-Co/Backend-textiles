module.exports = {
  CREAR: `
    INSERT INTO imagen(urlImagen, tipoImagen, textoAlternativo)
    VALUES (?, ?, ?);
    `,
};
