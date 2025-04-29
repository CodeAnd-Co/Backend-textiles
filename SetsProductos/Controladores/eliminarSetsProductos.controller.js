const repositorio = require('@altertex/setspro/repos/repositorioEliminarSetsProductos');
const MENSAJES_SETS_PRODUCTOS = require('@altertex/util/const/mensajesSetsProductos');

/**
 * Controlador para eliminar uno o más set de productos.
 * //RF[45] Elimina set de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF45]
 *
 * @async
 * @function eliminarCategoria
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.body - Cuerpo de la solicitud HTTP.
 * @param {number[]} req.body.idsSetProductos - Array de IDs numéricos de los sets de productos a eliminar.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Respuesta HTTP con estado:
 * - 200 si los sets de productos fueron eliminadas correctamente.
 * - 404 si no se encontraron los sets de productos.
 * - 500 si ocurre un error en el servidor.
 * @throws {Error} Si ocurre un error durante la eliminación.
 */

exports.eliminarSetProductos = async (req, res) => {
  try {
    const idsSetsProductos = req.body.idsSetProductos;

    if (!Array.isArray(idsSetsProductos) || idsSetsProductos.length === 0) {
      return res.status(MENSAJES_SETS_PRODUCTOS.SET_PRODUCTO_NO_ENCONTRADO.codigo).json({
        mensaje: MENSAJES_SETS_PRODUCTOS.SET_PRODUCTO_NO_ENCONTRADO.mensaje,
      });
    }

    await Promise.all(
      idsSetsProductos.map(async (idSetProducto) => {
        await repositorio.eliminarSetProductoGrupoEmpleado(idSetProducto);
        await repositorio.eliminarProductoSetProducto(idSetProducto);

        const resultadoSetProducto = await repositorio.eliminarSetProducto(idSetProducto);

        if (resultadoSetProducto.affectedRows === 0) {
          throw new Error(`Set de productos con ID ${idSetProducto} no encontrado`);
        }
      })
    );

    return res.status(MENSAJES_SETS_PRODUCTOS.SET_PRODUCTOS_ELIMINADO.codigo).json({
      mensaje: MENSAJES_SETS_PRODUCTOS.SET_PRODUCTOS_ELIMINADO.mensaje,
    });
  } catch (error) {
    console.error('Error al eliminar sets de productos:', error);
    return res.status(MENSAJES_SETS_PRODUCTOS.ERROR_ELIMINAR_SET_PRODUCTOS.codigo).json({
      mensaje: MENSAJES_SETS_PRODUCTOS.ERROR_ELIMINAR_SET_PRODUCTOS.mensaje,
    });
  }
};
