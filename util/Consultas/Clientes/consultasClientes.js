module.exports = {
  // Se obtienen todos los clientes
  obtenerClientes: `
    SELECT *
    FROM Cliente
    LIMIT ? OFFSET ?;
  `,

  // Se obtiene un cliente por medio del identificador
  obtenerClientePorId: `
    SELECT *
    FROM Cliente
    WHERE idCliente = ?;
  `,

  // Se obtiene un cliente por medio del nombre comercial
  obtenerClientePorNombreComercial: `
    SELECT *
    FROM Cliente
    WHERE nombreComercial = ?;
  `,

  // Se obtiene un cliente por medio del nombre fiscal
  obtenerClientePorNombreFiscal: `
    SELECT *
    FROM Cliente
    WHERE nombreFiscal = ?;
  `,

  // Se crea un nuvo usuario en la base de datos
  crearCliente: `
    INSERT INTO Usuario (idCliente, nombreComercial, nombreFiscal)
    VALUES (?, ?, ?);
  `,

  // Se actualiza la información del cliente por medio del identificador
  actualizarClientePorId: `
    UPDATE Cliente
    SET nombreComercial = ?, nombreFiscal = ?
    WHERE idCliente = ?;
  `,

  // Se actualiza el nombre comercial del cliente por medio del identificador
  actualizarNombreComercialPorId: `
    UPDATE Cliente
    SET nombreComercial = ?
    WHERE idCliente = ?;
  `,

  // Se actualiza el nombre fiscal del ciente por medio del identificador
  actualizarNombreFiscalPorId: `
    UPDATE Cliente
    SET nombreFiscal = ?
    WHERE idCliente = ?;
  `,

  // Se elimina un cliente por medio del identificador
  eliminarCliente: `
    DELETE FROM Cliente
    WHERE idCliente = ?;
  `,
};
