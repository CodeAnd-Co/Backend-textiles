const GRUPO_EMPLEADOS = {
  OBTENER_LISTA: `
    SELECT ge.idGrupo, ge.nombre, sp.idSetProducto, sp.nombre, 
    COUNT(e.idEmpleado) as totalEmpleados
    FROM Empleado e
    JOIN Empleado_Grupo eg ON e.idEmpleado = eg.idEmpleado
    JOIN Grupo_Empleado ge ON eg.idGrupo = ge.idGrupo
    JOIN Set_Producto_Grupo_Empleado spge ON ge.idGrupo = spge.idGrupo
    JOIN Set_Producto sp ON spge.idSetProducto = sp.idSetProducto
    WHERE ge.idCliente = ?
    GROUP BY ge.idGrupo, sp.idSetProducto
    LIMIT ? OFFSET ?;
  `,
};

const USUARIOS = {
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
};

module.exports = {
  GRUPO_EMPLEADOS,
  USUARIOS,
};
