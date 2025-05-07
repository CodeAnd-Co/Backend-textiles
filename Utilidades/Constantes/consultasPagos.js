module.exports = {
  CONSULTAR_LISTA: `
    SELECT metodo, habilitado
    FROM tipo_pago
    WHERE idCliente = ?;`,
};
