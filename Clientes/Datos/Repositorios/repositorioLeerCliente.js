const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_CLIENTES = require('@altertex/util/const/consultasClientes');

/**
 * Obtiene un cliente desde la base de datos mediante su ID.
 *
 * Ejecuta una consulta SQL y retorna el primer cliente encontrado o `null` si no existe.
 *
 * @param {number|string} idCliente - ID del cliente a buscar.
 * @returns {Promise<object|null>} El cliente encontrado o `null` si no existe.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 *
 * @see [RF13 Leer cliente](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf13/)
 */
exports.obtenerClientePorId = async (idCliente) => {
  const query = CONSULTAS_CLIENTES.LEER_CLIENTE;

  try {
    const resultado = await correrQuery(query, [idCliente]);

    if (resultado.length === 0) return null;

    const cliente = {
      idCliente: resultado[0].idCliente,
      nombreLegal: resultado[0].nombreFiscal,
      nombreVisible: resultado[0].nombreComercial,
      empleados: resultado[0].empleados,
      usuariosAsignados: resultado[0].usuariosAsignados,
      numeroEmpleados: resultado[0].numeroEmpleados,
      urlImagen: resultado[0].urlImagen,
    };

    return cliente;
  } catch (error) {
    console.error('Error al obtener el cliente con id:', error);
    throw error;
  }
};
