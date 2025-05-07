module.exports = {
  OBTENER_LISTA: `
    SELECT 
    p.idPedido,
    u.nombreCompleto AS nombreEmpleado,
    p.fechaOrden,
    p.estado AS estatusPedido,
    p.precioTotal,
    pg.estatus AS estatusPago,
    e.estado AS estatusEnvio
    FROM 
        pedido p
    JOIN 
        empleado_pedido ep ON p.idPedido = ep.idPedido
    JOIN 
        empleado em ON ep.idEmpleado = em.idEmpleado AND em.idCliente = ?
    JOIN 
        usuario u ON em.idUsuario = u.idUsuario
    JOIN 
        pago pg ON p.idPago = pg.idPago
    JOIN 
        envio e ON p.idEnvio = e.idEnvio
    ORDER BY 
        p.idPedido;`,

  ELIMINAR_PEDIDO_OPCION: `
    DELETE FROM pedido_opcion
    WHERE idPedido = ?;`,

  ELIMINAR_EMPLEADO_PEDIDO: `
    DELETE FROM empleado_pedido
    WHERE idPedido = ?;`,

  ELIMINAR_PEDIDO: `
    DELETE FROM pedido
    WHERE idPedido = ?;`,
};
