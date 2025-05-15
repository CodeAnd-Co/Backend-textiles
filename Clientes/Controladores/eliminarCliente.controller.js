const repositorio = require('@altertex/cli/repos/repositorioEliminarCliente');
const MENSAJES_CLIENTES = require('@altertex/util/const/mensajesClientes');

/**
 * Controlador para eliminar un cliente de la base de datos.
 * @see [RF15 - Elimina Cliente](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF15)
 *
 * @async
 * @function eliminarCliente
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.body - Cuerpo de la solicitud HTTP.
 * @param {number} req.body.idCliente - ID del cliente a eliminar.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Respuesta HTTP con estado:
 * - 200 si el cliente fue eliminado correctamente.
 * - 400 si el ID del cliente es inválido.
 * - 404 si no se encontró el cliente.
 * - 500 si ocurre un error en el servidor.
 * @throws {Error} Si ocurre un error durante la eliminación.
 */
exports.eliminarCliente = async (req, res) => {
  try {
    const idCliente = parseInt(req.body.idCliente);

    if (isNaN(idCliente)) {
      return res
        .status(MENSAJES_CLIENTES.CLIENTE_INVALIDO.codigo)
        .json({ mensaje: MENSAJES_CLIENTES.CLIENTE_INVALIDO.mensaje });
    }

    const resultado = await repositorio.eliminarClientePorId(idCliente);

    if (resultado.affectedRows === 0) {
      return res
        .status(MENSAJES_CLIENTES.CLIENTE_NO_ENCONTRADO.codigo)
        .json({ mensaje: MENSAJES_CLIENTES.CLIENTE_NO_ENCONTRADO.mensaje });
    }

    return res
      .status(MENSAJES_CLIENTES.CLIENTE_ELIMINADO.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.CLIENTE_ELIMINADO.mensaje });
  } catch {
    return res
      .status(MENSAJES_CLIENTES.ERROR_ELIMINAR_CLIENTE.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.ERROR_ELIMINAR_CLIENTE.mensaje });
  }
};
