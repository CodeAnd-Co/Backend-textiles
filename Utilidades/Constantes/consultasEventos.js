const { ELIMINAR_EVENTO } = require('./permisos');

module.exports = {
  OBTENER_LISTA_EVENTOS: `
        SELECT 
        e.nombre,
        e.descripcion,
        e.puntos,
        e.periodoRenovacion,
        e.renovacion
        FROM 
        evento e
        WHERE e.idCliente = ?   
    `,
  ELIMINAR_EVENTO: `
    DELETE FROM evento WHERE idCliente = ?
`,
};
