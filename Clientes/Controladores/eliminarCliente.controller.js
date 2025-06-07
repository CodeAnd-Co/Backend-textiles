// Importaciones necesarias
const repositorio = require('@altertex/cli/repos/repositorioEliminarCliente');
const MENSAJES_CLIENTES = require('@altertex/util/const/mensajesClientes');
const extraerNombreArchivoS3 = require('@altertex/util/ser/extraerNombreArchivoS3');
const eliminarImagenS3 = require('@altertex/util/ser/eliminarImagenS3');
const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_CLIENTES = require('@altertex/util/const/consultasClientes');

/**
 * Controlador para eliminar un cliente de la base de datos y su imagen de S3.
 * @see [RF15 - Elimina Cliente](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF15)
 *
 * @async
 * @function eliminarCliente
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.body - Cuerpo de la solicitud HTTP.
 * @param {number} req.body.idCliente - ID del cliente a eliminar.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Respuesta HTTP con estado.
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

    // Obtener nombre de la imagen asociada (si existe)
    let nombreImagen = '';
    const resultadoImagen = await correrQuery(CONSULTAS_CLIENTES.OBTENER_NOMBRE_IMAGEN, [idCliente]);
    if (resultadoImagen.length > 0 && resultadoImagen[0].urlImagen) {
      nombreImagen = extraerNombreArchivoS3(resultadoImagen[0].urlImagen);
    }

    // Eliminar cliente
    const resultado = await repositorio.eliminarClientePorId(idCliente);

    if (resultado.affectedRows === 0) {
      return res
        .status(MENSAJES_CLIENTES.CLIENTE_NO_ENCONTRADO.codigo)
        .json({ mensaje: MENSAJES_CLIENTES.CLIENTE_NO_ENCONTRADO.mensaje });
    }

    // Eliminar imagen si hay nombre válido
    if (nombreImagen) {
      await eliminarImagenS3('clientes/', nombreImagen);
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