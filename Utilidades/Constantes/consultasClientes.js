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

  CREAR_IMAGEN_CLIENTE: `
    INSERT INTO imagen (urlImagen, tipoImagen, textoAlternativo)
    VALUES (?, 'Logo', ?)
  `,
  VINCULAR_USUARIO_CLIENTE: `
    INSERT INTO usuario_cliente (idUsuario, idCliente)
    SELECT idUsuario, ?
    FROM usuario_rol
    WHERE idRol = 1;
  `,

  VINCULAR_IMAGEN_CLIENTE: `
  INSERT INTO imagen_cliente (idImagen, idCliente)
  VALUES (?, ?)
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

  // QUERIES ACTUALIZAR
  ACTUALIZAR_NOMBRE_FISCAL: `
        UPDATE cliente
        SET nombreFiscal = ?
        WHERE idCliente = ?;
    `,
  ACTUALIZAR_NOMBRE_COMERCIAL: `
        UPDATE cliente
        SET nombreComercial = ?
        WHERE idCliente = ?;
    `,
  ACTUALIZAR_AMBOS_NOMBRES: `
        UPDATE cliente
        SET nombreComercial = ?,
            nombreFiscal = ?
        WHERE idCliente = ?;
    `,

  // OBTENER EL NOMBRE DE LA IMAGEN
  OBTENER_NOMBRE_IMAGEN: `
        SELECT i.urlImagen
        FROM imagen i
        JOIN imagen_cliente ic ON i.idImagen = ic.idImagen
        WHERE ic.idCliente = ?;
    `,
};
