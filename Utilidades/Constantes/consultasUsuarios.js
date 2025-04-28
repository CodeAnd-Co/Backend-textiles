module.exports = {
  OBTENER_USUARIO: `
      SELECT *
      FROM usuario u
      WHERE u.correoElectronico = ?;
    `,
  OBTENER_CLIENTES_ASOCIADOS: `
      SELECT uc.idCliente
      FROM usuario u
      JOIN usuario_cliente uc ON u.idUsuario = uc.idUsuario
      WHERE u.correoElectronico = ?;
    `,
  OBTENER_PERMISOS: `
      SELECT p.nombre
      FROM usuario u
      JOIN usuario_rol ur ON ur.idUsuario = u.idUsuario
      JOIN rol r ON ur.idRol = r.idRol
      JOIN rol_permiso rp ON rp.idRol = r.idRol
      JOIN permiso p ON rp.idPermiso = p.idPermiso
      WHERE u.correoElectronico = ?;
    `,
  CREAR_USUARIO: `
    INSERT INTO usuario (nombreCompleto, correoElectronico, contrasenia, numeroTelefono, direccion, fechaNacimiento, genero, estatus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `,
  ASIGNAR_ROL_A_USUARIO: `
    INSERT INTO usuario_rol (idUsuario, idRol)
    VALUES (?, ?);
  `,
  ASOCIAR_USUARIO_A_CLIENTE: `
    INSERT INTO usuario_cliente (idUsuario, idCliente)
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
    r.nombre AS rol,
    uc.idCliente,
    c.nombreComercial AS nombreCliente
  FROM usuario u
  LEFT JOIN usuario_rol ur ON u.idUsuario = ur.idUsuario
  LEFT JOIN rol r ON ur.idRol = r.idRol
  LEFT JOIN usuario_cliente uc ON u.idUsuario = uc.idUsuario
  LEFT JOIN cliente c ON uc.idCliente = c.idCliente
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
      FROM usuario u
      LEFT JOIN usuario_rol ur ON u.idUsuario = ur.idUsuario
      LEFT JOIN rol r ON ur.idRol = r.idRol
      LEFT JOIN usuario_cliente uc ON u.idUsuario = uc.idUsuario
      LEFT JOIN cliente c ON uc.idCliente = c.idCliente;
    `,
};
