module.exports = {
    OBTENER_LISTA: `
      SELECT r.idRol, r.nombre, r.descripcion, COUNT(ur.idUsuario) AS totalUsuarios
      FROM Rol r
      LEFT JOIN Usuario_Rol ur ON r.idRol = ur.idRol
      GROUP BY r.idRol
      LIMIT ? OFFSET ?;
    `,
  };