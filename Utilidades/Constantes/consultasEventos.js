module.exports = {
  OBTENER_LISTA_EVENTOS: `
        SELECT 
        e.idEvento,
        e.nombre,
        e.descripcion,
        e.puntos,
        e.periodoRenovacion,
        e.renovacion
        FROM 
        evento e
        WHERE e.idCliente = ?   
    `,
  ELIMINAR_EMPLEADO_EVENTO: `
        DELETE FROM empleado_evento WHERE idEvento = ?;
    `,
  ELIMINAR_EVENTO: `
        DELETE FROM evento WHERE idEvento = ? AND idCliente = ?;
    `,
};
