module.exports = {
  CREAR: `
      INSERT INTO variante (idProducto, nombreVariante, descripcion)
      VALUES (?, ?, ?);
      `,
  CREAR_IMAGEN_VARIANTE: `
      INSERT INTO imagen_variante (idImagen, idVariante)
      VALUES (?, ?);
      `,
  ACTUALIZAR: `
      UPDATE variante
      SET idProducto = ?, nombreVariante = ?, descripcion = ?
      WHERE idVariante = ?;
  `,
  ACTUALIZAR_IMAGEN_VARIANTE: `
      UPDATE imagen_variante
      SET idImagen = ?
      WHERE idVariante = ?;
  `,
};
