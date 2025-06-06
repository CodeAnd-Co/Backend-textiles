const repositorio = require('@altertex/pro/repos/repositorioExportarProducto');
const MENSAJES_PRODUCTOS = require('@altertex/util/const/mensajesProductos');

/**
 * Controlador para exportar productos seleccionados de un cliente y retornar Excel.
 *
 * @async
 * @function exportarProductos
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} Archivo Excel con los productos exportados
 * @see [RF58 - Exportar Productos](https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF58)
 */
exports.exportarProductos = async (req, res) => {
  try {
    const idCliente = parseInt(req.user.clienteSeleccionado);
    const idsProducto = req.body.idsProducto;

    if (!Array.isArray(idsProducto) || idsProducto.length === 0) {
      return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: 'Debes seleccionar al menos un producto para exportar.',
      });
    }

    const idsSeleccionados = idsProducto.map((id) => parseInt(id));
    const productos = await repositorio.obtenerProductosExportacion(idCliente, idsSeleccionados);

    if (!productos || productos.length === 0) {
      return res.status(MENSAJES_PRODUCTOS.PRODUCTOS_NO_ENCONTRADOS.codigo).json({
        mensaje: MENSAJES_PRODUCTOS.PRODUCTOS_NO_ENCONTRADOS.mensaje,
      });
    }

    const buffer = await repositorio.generarArchivoExcel(productos);

    res.setHeader('Content-Disposition', 'attachment; filename=productos.xlsx');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    return res.send(buffer);
  } catch (error) {
    console.error('Error al exportar productos:', error);
    return res.status(MENSAJES_PRODUCTOS.ERROR_EXPORTACION.codigo).json({
      mensaje: MENSAJES_PRODUCTOS.ERROR_EXPORTACION.mensaje,
    });
  }
};
