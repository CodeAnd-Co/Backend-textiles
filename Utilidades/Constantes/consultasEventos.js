const { ELIMINAR_EVENTO } = require("./permisos");

module.exports = {
  OBTENER_LISTA_EVENTOS: `
        SELECT 
        e.nombre,
        e.descripcion,
        e.puntos,
        e.periodoRenovacion,
        e.renovacion
        FROM 
        EVENTO e
        WHERE e.idCliente = ?   
    `,
  ELIMINAR_EVENTO: `
        DELETE FROM EVENTO WHERE idCliente = ?
    `,
};
