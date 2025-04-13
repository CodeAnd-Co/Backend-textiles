module.exports = {
  OBTENER_CLIENTE: `
        SELECT * 
        FROM Cliente
        WHERE idCliente = ?;
    `,
};
