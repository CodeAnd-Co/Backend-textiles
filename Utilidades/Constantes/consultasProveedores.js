module.exports = {
  OBTENER_LISTA: `
    SELECT * FROM proveedor
    WHERE idCliente = ?;
  `,
  CREAR: `
    INSERT INTO proveedor (idCliente, nombre, nombreCompania, telefonoContacto, direccion, codigoPostal, pais, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `,
  VERIFICAR_EXISTE:`
    SELECT idProveedor FROM proveedor WHERE idProveedor = ? LIMIT 1
  `
}

