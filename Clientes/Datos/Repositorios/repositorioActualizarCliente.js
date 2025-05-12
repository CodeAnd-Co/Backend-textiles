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

  try {
    // Si se proporcionó una imagen, se sube al bucket de S3
    if (imagenActualizacion) {
      const [nombreImagen] = await correrQuery(CONSULTAS.OBTENER_NOMBRE_IMAGEN, [idCliente]);

      const parametros = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `clientes/${nombreImagen.urlImagen}`,
        Body: imagenActualizacion.buffer,
        ContentType: imagenActualizacion.mimetype,
      };

      await enviarS3(parametros);
    }

    // Si no se proporcionaron nombres legales ni comerciales, retorna un mensaje de éxito
    if (!nombreLegal && !nombreComercial) {
      return MENSAJES.CLIENTE_ACTUALIZADO.mensaje;
    }

    // Si se proporcionan ambos nombres, se actualizan en la base de datos
    if (nombreLegal && nombreComercial) {
      await correrQuery(CONSULTAS.ACTUALIZAR_AMBOS_NOMBRES, [
        nombreComercial,
        nombreLegal,
        idCliente,
      ]);
    } else if (nombreLegal) {
      // Si solo se proporciona el nombre legal, se actualiza en la base de datos
      await correrQuery(CONSULTAS.ACTUALIZAR_NOMBRE_FISCAL, [nombreLegal, idCliente]);
    } else if (nombreComercial) {
      // Si solo se proporciona el nombre comercial, se actualiza en la base de datos
      await correrQuery(CONSULTAS.ACTUALIZAR_NOMBRE_COMERCIAL, [nombreComercial, idCliente]);
    }

    // Retorna el mensaje de éxito después de la actualización
    return MENSAJES.CLIENTE_ACTUALIZADO.mensaje;
  } catch {
    // Si ocurre un error, se captura y se lanza un nuevo error
    throw new Error(MENSAJES.ERROR_CLIENTE_ACTUALIZADO.mensaje);
  }
};
