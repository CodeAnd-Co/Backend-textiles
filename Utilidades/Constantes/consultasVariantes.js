module.exports = {
  CREAR: `
      INSERT INTO variante (idProducto, nombreVariante, descripcion)
      VALUES (?, ?, ?);
      `,
  CREAR_IMAGEN_VARIANTE: `
      INSERT INTO imagen_variante (idImagen, idVariante)
      VALUES (?, ?);
      `,
};
