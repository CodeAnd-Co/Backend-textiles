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
            ) AS usuariosAsignados,
            i.urlImagen  
        FROM 
            cliente c
        LEFT JOIN 
            imagen_cliente ic ON c.idCliente = ic.idCliente
        LEFT JOIN 
            imagen i ON ic.idImagen = i.idImagen AND i.tipoImagen = "Logo"
        WHERE 
            c.idCliente = ?;
            `,
};
