module.exports = {
  CREAR: `
    INSERT INTO opcion (idVariante, cantidad, valorOpcion, SKUautomatico, SKUcomercial, costoAdicional, descuento, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `,
};
