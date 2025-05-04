module.exports = {
  OBTENER_LISTA: `
        SELECT u.nombreCompleto, u.correoElectronico, e.*
        FROM empleado e
        JOIN usuario u ON e.idUsuario = u.idUsuario
        WHERE e.idCliente = ?;
      `,
  ELIMINAR_EMPLEADO: `
      DELETE FROM empleado
      WHERE idEmpleado = ?;
    `,  
};
