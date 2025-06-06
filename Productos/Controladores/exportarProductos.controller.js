const repositorio = require('@altertex/pro/repos/repositorioExportarProducto');
const { Parser } = require('json2csv');
const { format } = require('date-fns');
const MENSAJES_PRODUCTOS = require('@altertex/util/const/mensajesProductos');

const ExcelJS = require('exceljs');

/**
 * Controlador para exportar productos seleccionados de un cliente y retornar CSV como string en JSON.
 *
 * @async
 * @function exportarProductos
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} JSON con mensaje + contenido CSV en texto plano
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

    productos.forEach((prod) => {
      prod.fechaCreacion = format(new Date(prod.fechaCreacion), 'dd/MM/yyyy');
      prod.precio = parseFloat(prod.precio).toFixed(2);
    });

    /**    const campos = [
      { label: 'ID', value: 'idProducto' },
      { label: 'Nombre', value: 'nombre' },
      { label: 'Descripción', value: 'descripcion' },
      { label: 'Precio', value: 'precio' },
      { label: 'Categoría', value: 'categoria' },
      { label: 'Fecha de creación', value: 'fechaCreacion' },
      { label: 'Estatus', value: 'estatus' }
    ];
*/
    const parser = new Parser({ fields: campos });
    const csv = parser.parse(productos);
    const csvConBOM = `\uFEFF${csv}`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=productos_${idCliente}_${Date.now()}.csv`
    );

    return res.status(200).send(csvConBOM);
  } catch (error) {
    console.error('Error al exportar productos:', error);
    return res.status(MENSAJES_PRODUCTOS.ERROR_EXPORTACION.codigo).json({
      mensaje: MENSAJES_PRODUCTOS.ERROR_EXPORTACION.mensaje,
    });
  }
};
