const repositorio = require('@altertex/usu/repos/repositorioEliminarUsuario');
const MENSAJES_USUARIOS = require('@altertex/util/const/mensajesUsuarios');

/**
 * Controlador para eliminar usuarios.
 * RF5 - Eliminar Usuario - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf5/
 *
 * Lee los detalles de un usuario desde la base de datos utilizando su ID.
 *
 * Valida el parámetro `idUsuario` y obtiene la información del usuario a través del repositorio.
 * Si el usuario no es encontrado o el parámetro es inválido, retorna un error.
 * Si el usuario es encontrado, retorna un 204 sin contenido.
 *
 * @async
 * @function eliminarUsuario
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.body - Cuerpo de la solicitud HTTP.
 * @param {number} req.body.idUsuario - ID del usuario a eliminar.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Respuesta HTTP con estado:
 * - 204 si el usuario fue eliminado correctamente.
 * - 404 si no se encontró el usuario.
 * - 500 si ocurre un error en el servidor.
 * @throws {Error} Si ocurre un error durante la eliminación.
 */

exports.eliminarUsuario = async (req, res) => {
  try {
    let idsUsuarios = req.body.ids;

    if (!idsUsuarios || (Array.isArray(idsUsuarios) && idsUsuarios.length === 0)) {
      return res.status(MENSAJES_USUARIOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: MENSAJES_USUARIOS.PARAMETROS_INVALIDOS.mensaje,
      });
    }

    // Asegurar que sea un array
    if (!Array.isArray(idsUsuarios)) {
      idsUsuarios = [idsUsuarios];
    }

    // Convertir a números
    const idsNumericos = idsUsuarios.map(Number);

    // Usar la función eliminarUsuarios del repositorio
    const resultado = await repositorio.eliminarUsuarios(idsNumericos);

    return res.status(200).json({
      mensaje: 'Usuarios eliminados correctamente.',
    });
  } catch (error) {
    return res.status(MENSAJES_USUARIOS.ERROR_ELIMINAR_USUARIO.codigo).json({
      mensaje: MENSAJES_USUARIOS.ERROR_ELIMINAR_USUARIO.mensaje,
    });
  }
};
