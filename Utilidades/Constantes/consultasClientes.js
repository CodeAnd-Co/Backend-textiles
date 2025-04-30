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
  LEER_CLIENTE: `
        SELECT 
          c.idCliente,
          c.nombreComercial,
          c.nombreFiscal,
          (
            SELECT COUNT(*) 
            FROM empleado e 
            WHERE e.idCliente = c.idCliente
          ) AS numeroEmpleados,
          (
            SELECT COUNT(*) 
            FROM usuario_cliente uc 
            WHERE uc.idCliente = c.idCliente
          ) AS usuariosAsignados
        FROM cliente c
        WHERE c.idCliente = ?;
    `,
};
