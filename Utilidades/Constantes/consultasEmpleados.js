module.exports = {
  OBTENER_LISTA: `
        SELECT u.nombreCompleto, u.correoElectronico, e.*
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
  INSERTAR_EMPLEADO:`
      INSERT INTO empleado (
        idUsuario, idCliente, numeroEmergencia,
        areaTrabajo, posicion, cantidadPuntos, antiguedad
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
  CREAR_GRUPO: `
    INSERT INTO grupo_empleado (idCliente, nombre, descripcion) VALUES (?, ?, ?);
  `,
  ASIGNAR_EMPLEADO_A_GRUPO: `
    INSERT INTO empleado_grupo (idEmpleado, idGrupo) VALUES (?, ?);
  `
};
