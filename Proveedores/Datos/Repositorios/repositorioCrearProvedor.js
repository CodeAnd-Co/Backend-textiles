//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultas = require('@altertex/util/const/consultasProveedores');

/**
 * Crea un nuevo proveedor en la base de datos.
 *
 * Esta función ejecuta una consulta SQL para insertar los datos de un proveedor
 * utilizando los parámetros proporcionados. Devuelve el ID del proveedor recién creado
 * en caso de éxito, o un array vacío si ocurre algún error durante la operación.
 *
 * @param {string|number} clienteSeleccionado - ID o identificador del cliente del cual se quieren obtener los proveedores.
 * @param {object} proveedor - Objeto que contiene la información del proveedor.
 * @param {string} proveedor.nombre - Nombre del contacto del proveedor.
 * @param {string} proveedor.nombreCompania - Nombre de la compañía del proveedor.
 * @param {string} proveedor.telefonoContacto - Teléfono de contacto del proveedor.
 * @param {string} proveedor.direccion - Dirección del proveedor.
 * @param {string} proveedor.codigoPostal - Código postal de la dirección del proveedor.
 * @param {string} proveedor.pais - País del proveedor.
 * @param {string} proveedor.estado - Estado o provincia del proveedor.
 *
 * @returns {Promise<number|Array>} El ID del proveedor recién creado en caso de éxito, o un arreglo vacío en caso de error.
 */
exports.crearProveedor = async (clienteSeleccionado, proveedor) => {
  const query = consultas.CREAR;
  const parametros = [
    clienteSeleccionado,
    proveedor.nombre,
    proveedor.nombreCompania,
    proveedor.telefonoContacto,
    proveedor.direccion,
    proveedor.codigoPostal,
    proveedor.pais,
    proveedor.estado,
  ];

  try {
    const resultados = await correrQuery(query, parametros);

    const idProveedor = resultados.insertId;
    return idProveedor;
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    return [];
  }
};
