const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesEmpleados');
const CONSULTAS_EMPLEADOS = require('@altertex/util/const/consultasEmpleados');

//RF[16] Crear empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16]

/**
 * Repositorio para insertar un nuevo empleado en la base de datos.
 *
 * Este repositorio recibe un array con la información del nuevo empleado
 * y realiza la inserción en la base de datos.
 *
 * @function insertarEmpleado
 * @async
 * @param {Array<{ idEmpleado: number, idUsuario: number, idCliente: number, numeroEmergencia:
 * number, areaTrabajo: string, posicion: string,
 * cantidadPuntos: number, antiguedad: Date}>} datos - Información del nuevo empleado a insertar.
 * @throws {Error} Si el arreglo está vacío o si ocurre un error en la base de datos.
 * @returns {Promise<void>} Promesa que se resuelve cuando la inserción ha sido exitosa.
 */

exports.insertarEmpleado = async (datos) => {
  if (!Array.isArray(datos) || datos.length === 0) {
    throw new Error('Sin datos para insertar.');
  }
  try {
    await Promise.all(
      datos.map(
        ({
          idUsuario,
          idCliente,
          numeroEmergencia,
          areaTrabajo,
          posicion,
          cantidadPuntos,
          antiguedad,
        }) => {
          return correrQuery(CONSULTAS_EMPLEADOS.INSERTAR_EMPLEADO, [
            idUsuario,
            idCliente,
            numeroEmergencia,
            areaTrabajo,
            posicion,
            cantidadPuntos,
            antiguedad,
          ]);
        }
      )
    );
  } catch (error) {
    throw new Error(MENSAJES.ERROR_CREAR.mensaje);
  }
};
