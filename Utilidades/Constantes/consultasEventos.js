module.exports = {
  CREAR_EVENTO: `
        INSERT INTO evento (idCliente, nombre, descripcion, puntos, multiplicador, periodoRenovacion, renovacion)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `,
  VERIFICAR_CLIENTE: `
        SELECT idCliente FROM cliente WHERE idCliente = ?;
    `,
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
        DELETE FROM evento WHERE idEvento = ?;
    `,
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
