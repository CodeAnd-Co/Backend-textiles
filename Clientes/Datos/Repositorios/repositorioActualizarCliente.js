const MENSAJES = require('@altertex/util/const/mensajesClientes');
const CONSULTAS = require('@altertex/util/const/consultasClientes');
const correrQuery = require('@altertex/util/ser/correrQuery');
const enviarS3 = require('@altertex/util/ser/enviarS3');

exports.actualizarCliente = async (datosActualizacion, imagenActualizacion) => {
  //if dependiendo de lo que se mando
  const { idCliente, nombreLegal, nombreComercial } = datosActualizacion;

  try {
    if (imagenActualizacion) {
    }

    if (!nombreLegal && !nombreComercial) {
      return MENSAJES.CLIENTE_ACTUALIZADO.mensaje; // o un mensaje diferente si lo deseas
    }

    if (nombreLegal && nombreComercial) {
      console.log('Ambos nombres');
      await correrQuery(CONSULTAS.ACTUALIZAR_AMBOS_NOMBRES, [
        nombreComercial,
        nombreLegal,
        idCliente,
      ]);
    } else if (nombreLegal) {
      console.log('Solo nombre legal');
      await correrQuery(CONSULTAS.ACTUALIZAR_NOMBRE_FISCAL, [nombreLegal, idCliente]);
    } else if (nombreComercial) {
      console.log('Solo nombre comercial');
      await correrQuery(CONSULTAS.ACTUALIZAR_NOMBRE_COMERCIAL, [nombreComercial, idCliente]);
    }
    return MENSAJES.CLIENTE_ACTUALIZADO.mensaje;
  } catch {
    throw new Error(MENSAJES.ERROR_CLIENTE_ACTUALIZADO.mensaje);
  }
};
