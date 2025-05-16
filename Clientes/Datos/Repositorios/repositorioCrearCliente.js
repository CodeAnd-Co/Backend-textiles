const QUERY = require('@altertex/util/const/consultasClientes');
const correrQuery = require('@altertex/util/ser/correrQuery');

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
 * Verifica si un cliente con el nombre fiscal especificado ya existe en la base de datos.
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
 * Crea un nuevo cliente en la base de datos.
 *
 * @async
 * @function crearCliente
 * @param {string} nombreComercial - Nombre comercial del nuevo cliente.
 * @param {string} nombreFiscal - Nombre fiscal del nuevo cliente.
 * @returns {Promise<object>} Retorna el resultado de la operación de inserción, incluyendo el ID del nuevo cliente.
 */
exports.crearCliente = async (nombreComercial, nombreFiscal) => {
  try {
    const resultadoCliente = await correrQuery(QUERY.CREAR_CLIENTE, [
      nombreComercial,
      nombreFiscal,
    ]);
    return resultadoCliente;
  } catch (error) {
    console.error('Error al crear cliente:', error);
    throw new Error('Error al crear cliente');
  }
};

/**
 * Vincula el usuario autenticado al cliente recién creado.
 *
 * @async
 * @function vincularUsuarioCliente
 * @param {number} idCliente - ID del cliente con el que se debe vincular el usuario.
 * @returns {Promise<object>} Resultado de la operación de vinculación.
 */
exports.vincularUsuarioCliente = async (idCliente) => {
  try {
    const resultadoVincular = await correrQuery(QUERY.VINCULAR_USUARIO_CLIENTE, [idCliente]);
    return resultadoVincular;
  } catch (error) {
    console.error('Error al vincular usuario al cliente:', error);
    throw new Error('Error al vincular usuario al cliente');
  }
};

/**
 * Inserta una imagen asociada a un cliente en la base de datos.
 *
 * @async
 * @function crearImagenCliente
 * @param {string} nombreComercial - Nombre comercial del cliente para asociar en la descripción.
 * @param {string} imagen - Ruta o identificador de la imagen a registrar.
 * @returns {Promise<object>} Resultado de la operación de inserción de imagen.
 */
exports.crearImagenCliente = async (nombreComercial, imagen) => {
  try {
    const resultadoImagen = await correrQuery(QUERY.CREAR_IMAGEN_CLIENTE, [
      imagen,
      `Logo de ${nombreComercial}`,
    ]);
    return resultadoImagen;
  } catch (error) {
    console.error('Error al crear imagen del cliente:', error);
    throw new Error('Error al crear imagen del cliente');
  }
};

/**
 * Vincula una imagen previamente registrada con un cliente específico.
 *
 * @async
 * @function vincularImagenCliente
 * @param {number} imagenId - ID de la imagen a vincular.
 * @param {number} clienteId - ID del cliente con el que se vinculará la imagen.
 * @returns {Promise<object>} Resultado de la operación de vinculación.
 */
exports.vincularImagenCliente = async (imagenId, clienteId) => {
  try {
    const resultado = await correrQuery(QUERY.VINCULAR_IMAGEN_CLIENTE, [imagenId, clienteId]);
    return resultado;
  } catch (error) {
    console.error('Error al vincular imagen y cliente', error);
    throw new Error('Error al vincular imagen y cliente');
  }
};
