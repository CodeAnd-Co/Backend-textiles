module.exports = {
  CONSULTAR_LISTA: `
    SELECT idTipoPago,metodo, habilitado
    FROM tipo_pago
    WHERE idCliente = ?;`,
  ACTUALIZAR: `
    UPDATE tipo_pago SET habilitado = ? WHERE (idTipoPago = ?)`,
};
