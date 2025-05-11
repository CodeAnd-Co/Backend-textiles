const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesEmpleados');
const CONSULTAS = require('@altertex/util/const/consultasEmpleados');

//RF[19] Actualizar empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF19]

/**
 *Repositorio para actualizar los datos de un empleado en la BD.
 *
 * Recorre un arreglo de objetos que contienen la información de cada método de pago
 * (ID, nombre del método y si está habilitado o no), y ejecuta la consulta SQL correspondiente
 * para actualizar su estado.
 *
 * Utiliza un array de objetos con la información del empleado, y hace la
 * consulta correspondiente a la base de datos.
 *
 * @function actualizarEmpleado
 * @async
 * @param {Array<{ idEmpleado: number, idUsuario: number, numeroEmergencia:
 * number,  areaTrabajo: string, posicion: string,
 * cantidadPuntos: number, antiguedad: date}>} datos - Lista de
 * información del empleado a actualizar.
 * @throws {Error} Si el arreglo está vacío o si ocurre un error en la base de datos.
 * @returns {Promise<void>} Promesa que se resuelve cuando todas las actualizaciones han sido ejecutadas.
 */
exports.actualizarEmpleado = async (datos) => {
  if (!Array.isArray(datos) || datos.length === 0) {
    throw new Error('Sin datos para actualizar.');
  }
  try {
    await Promise.all(
      datos.map(
        ({
          idEmpleado,
          idUsuario,
          numeroEmergencia,
          areaTrabajo,
          posicion,
          cantidadPuntos,
          antiguedad,
        }) => {
          return correrQuery(CONSULTAS.ACTUALIZAR, [
            numeroEmergencia,
            areaTrabajo,
            posicion,
            cantidadPuntos,
            antiguedad,
            idEmpleado,
            idUsuario,
          ]);
        }
      )
    );
  } catch {
    throw new Error(MENSAJES.ERROR_ACTUALIZAR.mensaje);
  }
};
