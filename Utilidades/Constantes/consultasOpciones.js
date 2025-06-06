module.exports = {
  CREAR: `
    INSERT INTO opcion (idVariante, cantidad, valorOpcion, SKUautomatico, SKUcomercial, costoAdicional, descuento, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `,
  ACTUALIZAR: `
    UPDATE opcion
    SET idVariante = ?, cantidad = ?, valorOpcion = ?, SKUcomercial = ?, costoAdicional = ?, descuento = ?, estado = ?
    WHERE idOpcion = ?;
    `,
};
