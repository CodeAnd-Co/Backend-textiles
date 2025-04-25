module.exports = {
  INSERTAR_CUOTA: `
    INSERT INTO cuota_set (idCliente, nombre, descripcion, periodoRenovacion, renovacionHabilitada, ultimaActualizacion)
    VALUES (?, ?, ?, ?, ?, ?)`,

  SELECCIONAR_PRODUCTO: `SELECT idProducto FROM producto WHERE descripcion = ? LIMIT 1`,

  INSERTAR_CUOTA_PRODUCTO: `
    INSERT INTO cuota_set_producto (idCuotaSet, idProducto, limite, limite_actual) 
    VALUES (?, ?, ?, ?)`,

  RESETEAR_LIMITES: `
    UPDATE cuota_set_producto
    JOIN cuota_set ON cuota_set_producto.idCuotaSet = cuota_set.idCuotaSet
    SET cuota_set_producto.limite_actual = cuota_set_producto.limite
    WHERE DATE_ADD(cuota_set.ultimaActualizacion, INTERVAL cuota_set.periodoRenovacion MONTH) <= CURRENT_DATE()
    AND renovacionHabilitada = true;`,

  ACTUALIZAR_FECHAS: `
    UPDATE cuota_set
    SET ultimaActualizacion = CURRENT_DATE()
    WHERE DATE_ADD(ultimaActualizacion, INTERVAL periodoRenovacion MONTH) <= CURRENT_DATE();
  `,

  OBTENER_OPCIONES: `
    SELECT idProducto as id, nombreComun as nombreProducto, tipoProducto as tipo
    FROM producto
    WHERE idCliente = ?;
  `,
};
