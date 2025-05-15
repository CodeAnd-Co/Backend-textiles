const db = require('@altertex/util/bd/db');
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
exports.crearCliente = async (nombreComercial, nombreFiscal) => {
  try {
    const resultadoCliente = await correrQuery(QUERY.CREAR_CLIENTE, [
      nombreComercial,
      nombreFiscal,
    ]);
    return resultadoCliente;
  } catch (error) {
    // Imprime en consola el error para fines de depuración.
    console.error('Error al crear cliente:', error);

    // Lanza un nuevo error genérico para ser manejado por el controlador correspondiente.
    throw new Error('Error al crear cliente');
  }
};

exports.vincularUsuarioCliente = async (idCliente) => {
  try {
    const resultadoVincular = await correrQuery(QUERY.VINCULAR_USUARIO_CLIENTE, [idCliente]);
    return resultadoVincular;
  } catch (error) {
    console.error('Error al vincular usuario al cliente:', error);
    throw new Error('Error al vincular usuario al cliente');
  }
};

exports.crearImagenCliente = async (nombreComercial, imagen) => {
  try {
    const parametros = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `clientes/${imagen}`,
      Body: imagen.buffer,
      ContentType: imagen.mimetype,
    };

    const resultadoImagen = await correrQuery(QUERY.CREAR_IMAGEN_CLIENTE, [
      imagen,
      `Logo de ${nombreComercial}`,
    ]);
    return resultadoImagen;
  } catch (error) {
    // Imprime en consola el error para fines de depuración.
    console.error('Error al crear imagen del cliente:', error);

    // Lanza un nuevo error genérico para ser manejado por el controlador correspondiente.
    throw new Error('Error al crear imagen del cliente');
  }
};

exports.vincularImagenCliente = async (imagenId, clienteId) => {
  try {
    const resultado = await correrQuery(QUERY.VINCULAR_IMAGEN_CLIENTE, [imagenId, clienteId]);
    return resultado;
  } catch (error) {
    // Imprime en consola el error para fines de depuración.
    console.error('Error al vincular imagen y cliente', error);

    // Lanza un nuevo error genérico para ser manejado por el controlador correspondiente.
    throw new Error('Error al vincular imagen y cliente');
  }
};
