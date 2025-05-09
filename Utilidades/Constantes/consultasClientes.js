const { CREAR_CATEGORIAS } = require("./consultasCategorias");

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
  VERIFICAR_NOMBRE_COMERCIAL: `
  SELECT IF(EXISTS(SELECT nombreComercial FROM cliente WHERE nombreComercial = ?), 1, 0)`,

  VERIFICAR_NOMBRE_FISCAL: `
  SELECT IF(EXISTS(SELECT nombreFiscal FROM cliente WHERE nombreFiscal = ?), 1, 0)`,

  CREAR_CLIENTE:  `
    INSERT INTO cliente (nombreComercial, nombreFiscal)
    VALUES (?, ?)`,
};