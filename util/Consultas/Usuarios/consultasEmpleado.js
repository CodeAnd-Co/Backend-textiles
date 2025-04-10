export default {
  /*
   * Estándar de Nomenclatura para Queries SQL
   * -------------------------------------------
   * Formato general:
   *    [verboAcción][Entidad][CondiciónOpcional]Query
   *
   * Verbos comunes:
   * - obtener   → Consultas SELECT simples
   * - buscar    → Consultas SELECT con filtros (LIKE, WHERE)
   * - crear     → INSERT
   * - actualizar→ UPDATE
   * - eliminar  → DELETE
   * - verificar → Validaciones o conteos booleanos (COUNT)
   * - asignar   → Inserción en tablas de relación
   * - remover   → Eliminación en tablas de relación
   * - cambiar   → Para actualizar campos simples como estatus
   * - contar    → Conteos totales o agrupados
   *
   * Entidades:
   * - Usuario, Rol, Permiso, Cliente, Carrito, UsuarioRol, etc.
   *
   * Condiciones comunes:
   * - PorId, PorCorreo, PorNombre
   * - Activos, Inactivos
   * - ConRol, ConPermiso, ConCarritoActivo
   * - PorGenero, PorCliente
   *
   * Ejemplos:
   * - obtenerUsuariosQuery
   * - buscarUsuariosPorNombreQuery
   * - crearUsuarioQuery
   * - actualizarUsuarioPorIdQuery
   * - eliminarUsuarioPorCorreoQuery
   * - verificarUsuarioExistenteQuery
   * - asignarRolAUsuarioQuery
   * - contarUsuariosPorGeneroQuery
   */

  /*
   * 📘 Diccionario de Queries para Empleado
   * --------------------------
   * - obtenerEmpleadosQuery → Lista todos los empleados registrados con paginación.
   * - obtenerEmpleadoPorIdQuery → Obtiene los datos completos de un empleado por su ID.
   * - obtenerEmpleadosPorClienteQuery → Lista los empleados asociados a un cliente específico.
   * - obtenerEmpleadosPorAreaTrabajoQuery → Lista los empleados que pertenecen a un área de trabajo específica.
   * - obtenerEmpleadosPorPosicionQuery → Lista los empleados que tienen una posición específica.
   * - obtenerEmpleadoConUsuarioQuery → Obtiene los datos del empleado junto con la información de su usuario asociado.
   * - obtenerEmpleadosConClienteQuery → Lista los empleados junto con la información de sus clientes asociados.
   * - obtenerEmpleadosPorGrupoQuery → Lista los empleados que pertenecen a un grupo específico.
   * - obtenerGruposDeEmpleadoQuery → Lista los grupos a los que pertenece un empleado específico.
   * - obtenerPedidosDeEmpleadoQuery → Lista los pedidos asociados a un empleado específico.
   * - obtenerEventosDeEmpleadoQuery → Lista los eventos asociados a un empleado específico.
   * - crearEmpleadoQuery → Inserta un nuevo empleado en la base de datos.
   * - actualizarEmpleadoQuery → Actualiza los datos completos de un empleado por su ID.
   * - actualizarPuntosEmpleadoQuery → Actualiza la cantidad de puntos de un empleado.
   * - incrementarPuntosEmpleadoQuery → Incrementa la cantidad de puntos de un empleado en un valor específico.
   * - actualizarAreaTrabajoQuery → Actualiza el área de trabajo de un empleado.
   * - actualizarPosicionQuery → Actualiza la posición de un empleado.
   * - eliminarEmpleadoQuery → Elimina un empleado de la base de datos por su ID.
   * - asignarEmpleadoAGrupoQuery → Asocia un empleado a un grupo de empleados.
   * - removerEmpleadoDeGrupoQuery → Elimina la asociación de un empleado con un grupo.
   * - asignarPedidoAEmpleadoQuery → Asocia un pedido a un empleado.
   * - removerPedidoDeEmpleadoQuery → Elimina la asociación de un pedido con un empleado.
   * - asignarEventoAEmpleadoQuery → Asocia un evento a un empleado.
   * - removerEventoDeEmpleadoQuery → Elimina la asociación de un evento con un empleado.
   * - verificarEmpleadoExistenteQuery → Verifica si ya existe un empleado asociado a un usuario específico.
   * - verificarEmpleadoEnGrupoQuery → Verifica si un empleado pertenece a un grupo específico.
   * - contarEmpleadosPorClienteQuery → Cuenta los empleados agrupados por cliente.
   * - contarEmpleadosPorAreaTrabajoQuery → Cuenta los empleados agrupados por área de trabajo.
   * - contarEmpleadosPorPosicionQuery → Cuenta los empleados agrupados por posición.
   * - obtenerEmpleadosConMasPuntosQuery → Lista los empleados ordenados por cantidad de puntos de mayor a menor.
   * - obtenerEmpleadosRecientesQuery → Lista los empleados más recientes según su fecha de antigüedad.
   * - obtenerEmpleadosPorAntiguedadQuery → Lista los empleados que tienen una antigüedad en un rango específico.
   * - buscarEmpleadosPorNombreQuery → Busca empleados cuyo nombre completo coincida con el criterio.
   * - obtenerCuotaSetGrupoDeEmpleadoQuery → Obtiene los grupos de cuota asignados a un empleado.
   * - obtenerTiposPagoDeEmpleadoQuery → Obtiene los tipos de pago asignados a un empleado.
   * - asignarTipoPagoAEmpleadoQuery → Asocia un tipo de pago a un empleado.
   * - removerTipoPagoDeEmpleadoQuery → Elimina la asociación de un tipo de pago con un empleado.
   * - obtenerUltimoIdEmpleadoQuery → Obtiene el último ID de empleado registrado en la base de datos.
   */

  obtenerEmpleadosQuery: `
    SELECT *
    FROM Empleado
    LIMIT ? OFFSET ?;
  `,

  obtenerEmpleadoPorIdQuery: `
    SELECT *
    FROM Empleado
    WHERE idEmpleado = ?;
  `,

  obtenerEmpleadosPorClienteQuery: `
    SELECT e.*
    FROM Empleado e
    WHERE e.idCliente = ?
    LIMIT ? OFFSET ?;
  `,

  obtenerEmpleadosPorAreaTrabajoQuery: `
    SELECT *
    FROM Empleado
    WHERE areaTrabajo = ?
    LIMIT ? OFFSET ?;
  `,

  obtenerEmpleadosPorPosicionQuery: `
    SELECT *
    FROM Empleado
    WHERE posicion = ?
    LIMIT ? OFFSET ?;
  `,

  obtenerEmpleadoConUsuarioQuery: `
    SELECT e.*, u.nombreCompleto, u.correoElectronico, u.numeroTelefono, u.direccion, u.fechaNacimiento, u.genero, u.estatus
    FROM Empleado e
    JOIN Usuario u ON e.idUsuario = u.idUsuario
    WHERE e.idEmpleado = ?;
  `,

  obtenerEmpleadosConClienteQuery: `
    SELECT e.*, c.nombreComercial, c.nombreFiscal
    FROM Empleado e
    JOIN Cliente c ON e.idCliente = c.idCliente
    LIMIT ? OFFSET ?;
  `,

  obtenerEmpleadosPorGrupoQuery: `
    SELECT e.*
    FROM Empleado e
    JOIN Empleado_Grupo eg ON e.idEmpleado = eg.idEmpleado
    JOIN Grupo_Empleado g ON eg.idGrupo = g.idGrupo
    WHERE g.idGrupo = ?
    LIMIT ? OFFSET ?;
  `,

  obtenerGruposDeEmpleadoQuery: `
    SELECT g.*
    FROM Grupo_Empleado g
    JOIN Empleado_Grupo eg ON g.idGrupo = eg.idGrupo
    WHERE eg.idEmpleado = ?;
  `,

  obtenerPedidosDeEmpleadoQuery: `
    SELECT p.*
    FROM Pedido p
    JOIN Empleado_Pedido ep ON p.idPedido = ep.idPedido
    WHERE ep.idEmpleado = ?
    LIMIT ? OFFSET ?;
  `,

  obtenerEventosDeEmpleadoQuery: `
    SELECT e.*
    FROM Evento e
    JOIN Empleado_Evento ee ON e.idEvento = ee.idEvento
    WHERE ee.idEmpleado = ?;
  `,

  crearEmpleadoQuery: `
    INSERT INTO Empleado (idEmpleado, idUsuario, idCliente, numeroEmergencia, areaTrabajo, posicion, cantidadPuntos, antiguedad)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `,

  actualizarEmpleadoQuery: `
    UPDATE Empleado
    SET idUsuario = ?, idCliente = ?, numeroEmergencia = ?, areaTrabajo = ?, posicion = ?, cantidadPuntos = ?, antiguedad = ?
    WHERE idEmpleado = ?;
  `,

  actualizarPuntosEmpleadoQuery: `
    UPDATE Empleado
    SET cantidadPuntos = ?
    WHERE idEmpleado = ?;
  `,

  incrementarPuntosEmpleadoQuery: `
    UPDATE Empleado
    SET cantidadPuntos = cantidadPuntos + ?
    WHERE idEmpleado = ?;
  `,

  actualizarAreaTrabajoQuery: `
    UPDATE Empleado
    SET areaTrabajo = ?
    WHERE idEmpleado = ?;
  `,

  actualizarPosicionQuery: `
    UPDATE Empleado
    SET posicion = ?
    WHERE idEmpleado = ?;
  `,

  eliminarEmpleadoQuery: `
    DELETE FROM Empleado
    WHERE idEmpleado = ?;
  `,

  asignarEmpleadoAGrupoQuery: `
    INSERT INTO Empleado_Grupo (idEmpleado, idGrupo)
    VALUES (?, ?);
  `,

  removerEmpleadoDeGrupoQuery: `
    DELETE FROM Empleado_Grupo
    WHERE idEmpleado = ? AND idGrupo = ?;
  `,

  asignarPedidoAEmpleadoQuery: `
    INSERT INTO Empleado_Pedido (idEmpleado, idPedido)
    VALUES (?, ?);
  `,

  removerPedidoDeEmpleadoQuery: `
    DELETE FROM Empleado_Pedido
    WHERE idEmpleado = ? AND idPedido = ?;
  `,

  asignarEventoAEmpleadoQuery: `
    INSERT INTO Empleado_Evento (idEmpleado, idEvento)
    VALUES (?, ?);
  `,

  removerEventoDeEmpleadoQuery: `
    DELETE FROM Empleado_Evento
    WHERE idEmpleado = ? AND idEvento = ?;
  `,

  verificarEmpleadoExistenteQuery: `
    SELECT COUNT(*) as cuenta
    FROM Empleado
    WHERE idUsuario = ?;
  `,

  verificarEmpleadoEnGrupoQuery: `
    SELECT COUNT(*) as cuenta
    FROM Empleado_Grupo
    WHERE idEmpleado = ? AND idGrupo = ?;
  `,

  contarEmpleadosPorClienteQuery: `
    SELECT idCliente, COUNT(*) as totalEmpleados
    FROM Empleado
    GROUP BY idCliente;
  `,

  contarEmpleadosPorAreaTrabajoQuery: `
    SELECT areaTrabajo, COUNT(*) as cantidad
    FROM Empleado
    GROUP BY areaTrabajo;
  `,

  contarEmpleadosPorPosicionQuery: `
    SELECT posicion, COUNT(*) as cantidad
    FROM Empleado
    GROUP BY posicion;
  `,

  obtenerEmpleadosConMasPuntosQuery: `
    SELECT e.*, u.nombreCompleto
    FROM Empleado e
    JOIN Usuario u ON e.idUsuario = u.idUsuario
    ORDER BY e.cantidadPuntos DESC
    LIMIT ?;
  `,

  obtenerEmpleadosRecientesQuery: `
    SELECT e.*, u.nombreCompleto
    FROM Empleado e
    JOIN Usuario u ON e.idUsuario = u.idUsuario
    ORDER BY e.antiguedad DESC
    LIMIT ?;
  `,

  obtenerEmpleadosPorAntiguedadQuery: `
    SELECT e.*, u.nombreCompleto
    FROM Empleado e
    JOIN Usuario u ON e.idUsuario = u.idUsuario
    WHERE e.antiguedad BETWEEN ? AND ?
    LIMIT ? OFFSET ?;
  `,

  buscarEmpleadosPorNombreQuery: `
    SELECT e.*, u.nombreCompleto
    FROM Empleado e
    JOIN Usuario u ON e.idUsuario = u.idUsuario
    WHERE u.nombreCompleto LIKE ?
    LIMIT ? OFFSET ?;
  `,

  obtenerCuotaSetGrupoDeEmpleadoQuery: `
    SELECT csg.*
    FROM Cuota_Set_Grupo csg
    JOIN Cuota_Set_Grupo_Empleado csge ON csg.idCuotaSetGrupo = csge.idCuotaSetGrupo
    WHERE csge.idEmpleado = ?;
  `,

  obtenerTiposPagoDeEmpleadoQuery: `
    SELECT tp.*
    FROM Tipo_Pago tp
    JOIN Tipo_Pago_Empleado tpe ON tp.idTipoPago = tpe.idTipoPago
    WHERE tpe.idEmpleado = ?;
  `,

  asignarTipoPagoAEmpleadoQuery: `
    INSERT INTO Tipo_Pago_Empleado (idTipoPago, idEmpleado)
    VALUES (?, ?);
  `,

  removerTipoPagoDeEmpleadoQuery: `
    DELETE FROM Tipo_Pago_Empleado
    WHERE idTipoPago = ? AND idEmpleado = ?;
  `,

  obtenerUltimoIdEmpleadoQuery: `
    SELECT MAX(idEmpleado) as ultimoId
    FROM Empleado;
  `,
};
