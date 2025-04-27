module.exports = {
  CREAR: `
    INSERT INTO proveedor (nombre, nombreCompania, telefonoContacto, direccion, codigoPostal, pais, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    `,
};
