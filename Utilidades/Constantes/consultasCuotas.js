module.exports = {
  INSERTAR_CUOTA: `
    INSERT INTO CUOTA_SET (idCliente, nombre, descripcion, periodoRenovacion, renovacionHabilitada)
    VALUES (?, ?, ?, ?, ?)`,

  SELECCIONAR_PRODUCTO: `SELECT idProducto FROM PRODUCTO WHERE descripcion = ? LIMIT 1`,
  INSERTAR_CUOTA_PRODUCTO: `
    INSERT INTO CUOTA_SET_PRODUCTO (idCuotaSet, idProducto, limite, limite_actual) 
    VALUES (?, ?, ?, ?)`,
};
