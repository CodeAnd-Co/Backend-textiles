module.exports = {
  OBTENER_LISTA: `
      SELECT nombre, descripcion, activo 
      FROM set_producto
      WHERE idCliente = ?;
      `,
};
