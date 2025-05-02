module.exports = {
  LEER_EVENTO: `
        SELECT 
        e.idEvento,
        e.nombre,
        e.descripcion,
        e.puntos,
        e.multiplicador,
        e.periodoRenovacion,
        e.renovacion
        FROM evento e
        WHERE e.idEvento = ?;
    `,
};
