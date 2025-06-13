const repositorio = require('@altertex/usu/repos/repositorioConsultarListaUsuarios');
const MENSAJES_USUARIOS = require('@altertex/util/const/mensajesUsuarios');

/**
 * Controlador que maneja la consulta de la lista de usuarios.
 * RF02 - Super Administrador Consulta Lista de Usuarios -
 * https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF2
 *
 * @function consultarListaUsuarios
 * @async
 * @param {object} req - Objeto de solicitud HTTP (Request).
 * @param {object} res - Objeto de respuesta HTTP (Response).
 *
 * @returns {Response} Retorna una respuesta con:
 * - Código 200 y lista de usuarios si se encuentran resultados.
 * - Código 200 y mensaje si no hay usuarios en la base de datos.
 * - Código 500 y mensaje de error si ocurre una falla en la consulta.
 */
exports.consultarListaUsuarios = async (req, res) => {
  try {
    const resultados = await repositorio.consultarListaUsuarios();

    if (!resultados || resultados.length === 0) {
      return res
        .status(MENSAJES_USUARIOS.USUARIOS_NO_ENCONTRADOS.codigo)
        .json({ mensaje: MENSAJES_USUARIOS.USUARIOS_NO_ENCONTRADOS.mensaje });
    }

    const generoMap = {
      masculino: 'Hombre',
      femenino: 'Mujer',
      otro: 'Otro',
    };

    const resultadosMapeados = resultados.map((usuario) => ({
      ...usuario,
      genero: generoMap[usuario.genero] || usuario.genero,
    }));

    return res.status(MENSAJES_USUARIOS.LISTA_USUARIOS_OBTENIDA.codigo).json({
      mensaje: MENSAJES_USUARIOS.LISTA_USUARIOS_OBTENIDA.mensaje,
      listaUsuarios: resultadosMapeados,
    });
  } catch {
    return res
      .status(MENSAJES_USUARIOS.ERROR_OBTENER_USUARIOS.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.ERROR_OBTENER_USUARIOS.mensaje });
  }
};
