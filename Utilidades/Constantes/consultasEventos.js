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
};
