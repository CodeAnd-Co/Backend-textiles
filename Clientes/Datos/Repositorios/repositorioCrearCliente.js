const db = require("@altertex/util/bd/db");
const QUERY = require("@altertex/util/const/consultasClientes");
const correrQuery = require("@altertex/util/ser/correrQuery");

/**
 * Verifica si un cliente con el nombre comercial especificado ya existe en la base de datos.
 *
 * @async
 * @function verificarNombreComercial
 * @param {string} nombre - Nombre comercial del cliente a verificar.
 * @returns {Promise<boolean>} Retorna `true` si existe otro cliente con ese nombre comercial, `false` en caso contrario.
 */
exports.verificarNombreComercial = async (nombre) => {
    const resultado = await correrQuery(QUERY.VERIFICAR_NOMBRE_COMERCIAL, [nombre]);
    const valor = Object.values(resultado[0])[0]; 
    return valor == 1;
};
  

/**
 * Verifica si un cliente con el nombre comercial especificado ya existe en la base de datos.
 *
 * @async
 * @function verificarNombreFiscal
 * @param {string} nombre - Nombre fiscal del cliente a verificar.
 * @returns {Promise<boolean>} Retorna `true` si existe otro cliente con ese nombre fiscal, `false` en caso contrario.
 */
exports.verificarNombreFiscal = async (nombre) => {
    const resultado = await correrQuery(QUERY.VERIFICAR_NOMBRE_FISCAL, [nombre]);
    const valor = Object.values(resultado[0])[0];
    return valor == 1;
};


/**
 * Inserta un nuevo rol en la base de datos.
 *
 * @async
 * @function crearCliente
 * @param {string} nombreComercial - Nombre comercial del nuevo cliente.
 * @param {string} nombreFiscal - Nombre fiscal del nuevo cliente.
 * @param {string} imagen - Ruta de la imagen del cliente en el S3.
 * @returns {Promise<object>} Retorna el resultado de la operación de inserción, incluyendo el ID del nuevo cliente.
 */
exports.crearCliente = async (nombreComercial, nombreFiscal, imagen) => {
  console.log('intentar crear cliente con: ', nombreComercial, nombreFiscal, imagen);
  const resultado = await correrQuery(QUERY.CREAR_CLIENTE, [nombreComercial, nombreFiscal]);
  console.log(resultado);
  console.log(resultado.insertId)
  return resultado;
};
