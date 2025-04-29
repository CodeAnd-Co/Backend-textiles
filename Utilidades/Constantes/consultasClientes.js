module.exports = {
  OBTENER_CLIENTE: `
        SELECT * 
        FROM cliente
        WHERE idCliente = ?;
    `,
  OBTENER_LISTA: `
        SELECT * 
        FROM cliente c
        JOIN imagen_cliente ic ON c.idCliente = ic.idCliente
        JOIN imagen i ON ic.idImagen = i.idImagen
        WHERE i.tipoImagen LIKE 'Logo'
        AND c.idCliente IN (?);
    `,
  ELIMINAR_CLIENTE: `
        DELETE FROM cliente
        WHERE idCliente = ?;
  `,
};