module.exports = {
  OBTENER_CLIENTE: `
        SELECT * 
        FROM Cliente
        WHERE idCliente = ?;
    `,
  OBTENER_LISTA: `
        SELECT * 
        FROM Cliente c
        JOIN Imagen_Cliente ic ON c.idCliente = ic.idCliente
        JOIN Imagen i ON ic.idImagen = i.idImagen
        WHERE i.tipoImagen LIKE 'Logo';
    `,
};
