module.exports = {
  OBTENER_USUARIO: `
      SELECT *
      FROM Usuario u
      WHERE u.correoElectronico = ?;
    `,
  OBTENER_CLIENTES_ASOCIADOS: `
      SELECT uc.idCliente
      FROM Usuario u
      JOIN Usuario_Cliente uc ON u.idUsuario = uc.idUsuario
      WHERE u.correoElectronico = ?;
    `,
  OBTENER_PERMISOS: `
      SELECT p.nombre
      FROM Usuario u
      JOIN Usuario_Rol ur ON ur.idUsuario = u.idUsuario
      JOIN Rol r ON ur.idRol = r.idRol
      JOIN Rol_Permiso rp ON rp.idRol = r.idRol
      JOIN Permiso p ON rp.idPermiso = p.idPermiso
      WHERE u.correoElectronico = ?;
    `,
  CREAR_USUARIO: `
  INSERT INTO Usuario ( nombreCompleto, correoElectronico, contrasenia, numeroTelefono, direccion, fechaNacimiento, genero, estatus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `,
  ASIGNAR_ROL_A_USUARIO: `
    INSERT INTO Usuario_Rol (idUsuario, idRol)
    VALUES (?, ?);
  `,
  ASOCIAR_USUARIO_A_CLIENTE: `
    INSERT INTO Usuario_Cliente (idUsuario, idCliente)
    VALUES (?, ?);
  `,
  LEER_USUARIO: `
    SELECT 
      u.idUsuario,
      u.nombreCompleto,
      u.correoElectronico,
      u.numeroTelefono,
      u.direccion,
      u.fechaNacimiento,
      u.genero,
      u.estatus,
      r.nombre AS rol
    FROM Usuario u
    JOIN usuario_rol ur ON u.idUsuario = ur.idUsuario
    JOIN rol r ON ur.idRol = r.idRol
    WHERE u.idUsuario = ?;
  `,
  OBTENER_LISTA: `
      SELECT 
        u.idUsuario, 
        u.nombreCompleto AS nombre, 
        r.nombre AS rol, 
        c.nombreComercial AS cliente, 
        u.estatus, 
        u.correoElectronico AS correo, 
        u.numeroTelefono AS telefono
      FROM Usuario u
      LEFT JOIN Usuario_Rol ur ON u.idUsuario = ur.idUsuario
      LEFT JOIN Rol r ON ur.idRol = r.idRol
      LEFT JOIN Usuario_Cliente uc ON u.idUsuario = uc.idUsuario
      LEFT JOIN Cliente c ON uc.idCliente = c.idCliente;
    `,
};
