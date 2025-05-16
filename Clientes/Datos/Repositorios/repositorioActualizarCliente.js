const MENSAJES = require('@altertex/util/const/mensajesClientes');
const CONSULTAS = require('@altertex/util/const/consultasClientes');
const correrQuery = require('@altertex/util/ser/correrQuery');
const enviarS3 = require('@altertex/util/ser/enviarS3');
// RF14 - Actualiza Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF14

/**
 * Actualiza los datos de un cliente, incluyendo su nombre legal y/o comercial,
 * y la imagen asociada al cliente si se proporciona.
 *
 * @param {object} datosActualizacion - Datos de actualización del cliente.
 * @param {string} datosActualizacion.idCliente - ID único del cliente a actualizar.
 * @param {string} [datosActualizacion.nombreLegal] - Nuevo nombre legal del cliente (opcional).
 * @param {string} [datosActualizacion.nombreComercial] - Nuevo nombre comercial del cliente (opcional).
 * @param {object} [imagenActualizacion] - Información de la imagen a actualizar.
 * @param {Buffer} imagenActualizacion.buffer - El buffer de la imagen a cargar.
 * @param {string} imagenActualizacion.mimetype - Tipo MIME de la imagen (ej. 'image/jpeg').
 *
 * @returns {string} Mensaje indicando si la actualización fue exitosa.
 *
 * @throws {Error} Lanza un error si ocurre un problema durante la actualización del cliente.
 */
exports.actualizarCliente = async (datosActualizacion, imagenActualizacion) => {
  const { idCliente, nombreLegal, nombreComercial } = datosActualizacion;

  const resultadoCliente = await correrQuery(CONSULTAS.OBTENER_CLIENTE, [idCliente]);
  if (!resultadoCliente || resultadoCliente.length === 0) {
    throw new Error(MENSAJES.CLIENTE_NO_ENCONTRADO.mensaje);
  }

  if (nombreComercial) {
    const [resultadoNombreComercial] = await correrQuery(CONSULTAS.VERIFICAR_NOMBRE_COMERCIAL, [
      nombreComercial,
    ]);
    const existeNombreComercial = Object.values(resultadoNombreComercial)[0];

    if (existeNombreComercial === 1) {
      const [clienteActual] = await correrQuery(CONSULTAS.OBTENER_CLIENTE, [idCliente]);
      if (clienteActual && clienteActual.nombreComercial !== nombreComercial) {
        throw new Error(MENSAJES.CLIENTE_COMERCIAL_EXISTENTE.mensaje);
      }
    }
  }

  if (nombreLegal) {
    const [resultadoNombreFiscal] = await correrQuery(CONSULTAS.VERIFICAR_NOMBRE_FISCAL, [
      nombreLegal,
    ]);
    const existeNombreFiscal = Object.values(resultadoNombreFiscal)[0];

    if (existeNombreFiscal === 1) {
      const [clienteActual] = await correrQuery(CONSULTAS.OBTENER_CLIENTE, [idCliente]);
      if (clienteActual && clienteActual.nombreFiscal !== nombreLegal) {
        throw new Error(MENSAJES.CLIENTE_FISCAL_EXISTENTE.mensaje);
      }
    }
  }

  if (imagenActualizacion) {
    const resultadoImagen = await correrQuery(CONSULTAS.OBTENER_NOMBRE_IMAGEN, [idCliente]);
    if (!resultadoImagen || resultadoImagen.length === 0 || !resultadoImagen[0].urlImagen) {
      throw new Error('No se encontró la imagen del cliente para actualizar');
    }

    const nombreImagen = resultadoImagen[0];
    const parametros = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `clientes/${nombreImagen.urlImagen}`,
      Body: imagenActualizacion.buffer,
      ContentType: imagenActualizacion.mimetype,
    };

    await enviarS3(parametros);
  }

  if (!nombreLegal && !nombreComercial) {
    return MENSAJES.CLIENTE_ACTUALIZADO.mensaje;
  }

  let resultadoQuery;
  if (nombreLegal && nombreComercial) {
    resultadoQuery = await correrQuery(CONSULTAS.ACTUALIZAR_AMBOS_NOMBRES, [
      nombreComercial,
      nombreLegal,
      idCliente,
    ]);
    if (!resultadoQuery || resultadoQuery.affectedRows === 0) {
      throw new Error('No se pudo actualizar los nombres del cliente');
    }
  } else if (nombreLegal) {
    resultadoQuery = await correrQuery(CONSULTAS.ACTUALIZAR_NOMBRE_FISCAL, [
      nombreLegal,
      idCliente,
    ]);
    if (!resultadoQuery || resultadoQuery.affectedRows === 0) {
      throw new Error('No se pudo actualizar el nombre fiscal del cliente');
    }
  } else if (nombreComercial) {
    resultadoQuery = await correrQuery(CONSULTAS.ACTUALIZAR_NOMBRE_COMERCIAL, [
      nombreComercial,
      idCliente,
    ]);
    if (!resultadoQuery || resultadoQuery.affectedRows === 0) {
      throw new Error('No se pudo actualizar el nombre comercial del cliente');
    }
  }

  return MENSAJES.CLIENTE_ACTUALIZADO.mensaje;
};
