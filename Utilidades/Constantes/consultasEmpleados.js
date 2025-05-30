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
  INSERTAR_EMPLEADO: `
      INSERT INTO empleado (
        idUsuario, idCliente, numeroEmergencia,
        areaTrabajo, posicion, cantidadPuntos, antiguedad
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
  ACTUALIZAR: `
        UPDATE empleado SET 
        numeroEmergencia = ?, areaTrabajo = ?, posicion = ?, 
        cantidadPuntos = ?, antiguedad = ? WHERE idEmpleado = ?;
    `,
  OBTENER_DATOS_EXPORTACION: `
    SELECT 
      e.idEmpleado,
      u.nombreCompleto,
      u.correoElectronico,
      u.numeroTelefono,
      u.direccion,
      u.fechaNacimiento,
      u.genero,
      u.estatus,
      e.numeroEmergencia,
      e.areaTrabajo,
      e.posicion,
      e.cantidadPuntos,
      e.antiguedad
    FROM empleado e
    JOIN usuario u ON e.idUsuario = u.idUsuario
    WHERE e.idCliente = ? AND e.idEmpleado IN (__IDS__);
  `,
};
