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
    INSERT INTO usuario (
      nombreCompleto,
      correoElectronico,
      contrasenia,
      numeroTelefono,
      direccion,
      fechaNacimiento,
      genero,
      estatus
    )
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
    LEFT JOIN cliente c ON uc.idCliente = c.idCliente
    WHERE u.idUsuario NOT IN (
        SELECT ur2.idUsuario
        FROM usuario_rol ur2
        WHERE ur2.idRol = 3
    );

  `,

  ELIMINAR_USUARIOS: `
    DELETE FROM usuario
    WHERE idUsuario = (?);
  `,
  VALIDAR_CORREO: `
    SELECT idUsuario
    FROM usuario
    WHERE correoElectronico = ?;
  `,
  VALIDAR_TELEFONO: `
    SELECT idUsuario
    FROM usuario
    WHERE numeroTelefono = ?;`,

  OBTENER_EMPLEADOS_POR_USUARIOS: `
    SELECT idEmpleado
    FROM empleado
    WHERE idUsuario IN (?);
  `,

  ELIMINAR_CUOTA_SET_GRUPO_EMPLEADO: `
    DELETE FROM cuota_set_grupo_empleado
    WHERE idEmpleado IN (?);
  `,

  ELIMINAR_EMPLEADO_EVENTO: `
    DELETE FROM empleado_evento
    WHERE idEmpleado IN (?);
  `,

  ELIMINAR_EMPLEADO_GRUPO: `
    DELETE FROM empleado_grupo
    WHERE idEmpleado IN (?);
  `,

  ELIMINAR_EMPLEADO_PEDIDO: `
    DELETE FROM empleado_pedido
    WHERE idEmpleado IN (?);
  `,

  ELIMINAR_TIPO_PAGO_EMPLEADO: `
    DELETE FROM tipo_pago_empleado
    WHERE idEmpleado IN (?);
  `,

  OBTENER_CARRITOS_POR_USUARIOS: `
    SELECT idCarrito
    FROM carrito
    WHERE idUsuario IN (?);
  `,

  ELIMINAR_CARRITO_OPCION: `
    DELETE FROM carrito_opcion
    WHERE idCarrito IN (?);
  `,

  ELIMINAR_CARRITO_POR_USUARIOS: `
    DELETE FROM carrito
    WHERE idUsuario IN (?);
  `,

  ELIMINAR_USUARIO_ROL: `
    DELETE FROM usuario_rol
    WHERE idUsuario IN (?);
  `,

  ELIMINAR_USUARIO_CLIENTE: `
    DELETE FROM usuario_cliente
    WHERE idUsuario IN (?);
  `,

  ELIMINAR_EMPLEADO_POR_USUARIOS: `
    DELETE FROM empleado
    WHERE idUsuario IN (?);
  `,

  ELIMINAR_USUARIOS_POR_IDS: `
    DELETE FROM usuario
    WHERE idUsuario IN (?);
  `,

  CONSULTAR_USUARIOS_PROTEGIDOS: `
    SELECT idUsuario 
    FROM usuarios_2fa 
    WHERE idUsuario IN (?) 
      AND puedeActivar2FA = true;
  `,

  
};
