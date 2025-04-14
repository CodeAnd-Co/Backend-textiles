module.exports = {
  OBTENER_USUARIO: `
      SELECT *
      FROM Usuario u
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
};
