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
};
