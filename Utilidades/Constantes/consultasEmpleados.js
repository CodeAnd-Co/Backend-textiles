module.exports = {
  OBTENER_LISTA: `
        SELECT u.idUsuario, u.nombreCompleto, u.correoElectronico, e.*
        FROM empleado e
        JOIN usuario u ON e.idUsuario = u.idUsuario
        WHERE e.idCliente = ?;
    `,
  OBTENER_ID_USUARIO_POR_EMPLEADO: `
        SELECT idUsuario FROM empleado WHERE idEmpleado = ?;
    `,
  ELIMINAR_EMPLEADO: `
        DELETE FROM empleado
        WHERE idEmpleado = ?;
    `,
  ACTUALIZAR: `
        UPDATE empleado SET 
        numeroEmergencia = ?, areaTrabajo = ?, posicion = ?, 
        cantidadPuntos = ?, antiguedad = ? WHERE idEmpleado = ?;
  `,
};
