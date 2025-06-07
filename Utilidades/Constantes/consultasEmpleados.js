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
      CASE 
        WHEN u.estatus = 1 THEN 'Activo'
        WHEN u.estatus = 0 THEN 'Inactivo'
        ELSE 'Desconocido'
      END AS estatus,
      e.numeroEmergencia,
      e.areaTrabajo,
      e.posicion,
      e.cantidadPuntos,
      e.antiguedad
    FROM empleado e
    JOIN usuario u ON e.idUsuario = u.idUsuario
    WHERE e.idCliente = ? AND e.idEmpleado IN (__IDS__);
  `,
  OBTENER_ULTIMO_ID_EMPLEADO: `
        SELECT idEmpleado FROM empleado ORDER BY idEmpleado DESC LIMIT 1;
    `,
  CONSULTAR_ID_VALIDO: `
        SELECT 
          CASE 
            WHEN NOT EXISTS (SELECT 1 FROM usuarios WHERE idUsuario = ?) 
            THEN 'No hay ningún usuario registrado bajo este ID'
            WHEN EXISTS (SELECT 1 FROM empleado WHERE idUsuario = ?) 
            THEN 'Este usuario ya está registrado como empleado, revisa de nuevo el ID a usar'
            ELSE 'OK'
          END AS resultado; 
    `,

  INSERTAR_USUARIO: `
    INSERT INTO usuario
         (nombreCompleto, correoElectronico, contrasenia, numeroTelefono, direccion, fechaNacimiento, genero, estatus)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)

        `,

  INSERTAR_ROL: `
    INSERT INTO usuario_rol (idUsuario, idRol)
        VALUES (?, ?)
    `,

  INSERTAR_USUARIO_CLIENTE: `
    INSERT INTO usuario_cliente (idUsuario, idCliente)
        VALUES (?, ?)
    `,

};
