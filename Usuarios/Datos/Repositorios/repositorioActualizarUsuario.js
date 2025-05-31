const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesUsuarios');
const CONSULTAS_USUARIOS = require('@altertex/util/const/consultasUsuarios');

//RF[4] Actualizar Usuario - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF4

/**
 * Repositorio para actualizar los datos de un usuario en la BD.
 *
 * Recorre un arreglo de objetos que contienen la información de cada usuario para
 * actualizar su información.
 *
 * Utiliza un array de objetos con la información del usuario, y hace la
 * consulta correspondiente a la base de datos.
 *
 * @function actualizarUsuario
 * @async
 * @param {Array<{ idUsuario: number, nombreCompleto: string, correoElectronico: string, telefono: string }>} datos - Lista de
 * información del usuario a actualizar.
 * @throws {Error} Si el arreglo está vacío o si ocurre un error en la base de datos.
 * @returns {Promise<void>} Promesa que se resuelve cuando todas las actualizaciones han sido ejecutadas.
 */
exports.actualizarUsuario = async (datos) => {
  if (!Array.isArray(datos) || datos.length === 0) {
    throw new Error('Sin datos para actualizar.');
  }
  try {
    await Promise.all(
      datos.map(({ idUsuario, nombreCompleto, correoElectronico, telefono }) => {
        return correrQuery(CONSULTAS_USUARIOS.ACTUALIZAR, [
          nombreCompleto,
          correoElectronico,
          telefono,
          idUsuario,
        ]);
      })
    );
  } catch {
    throw new Error(MENSAJES.ERROR_ACTUALIZAR_USUARIO.mensaje);
  }
};
