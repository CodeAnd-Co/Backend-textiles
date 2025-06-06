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
    const workbook = new ExcelJS.Workbook();

    // Primera hoja - Información básica del producto
    const hoja1 = workbook.addWorksheet('Información Producto');
    hoja1.columns = [
      { header: 'ID Producto', key: 'idProducto' },
      { header: 'ID Proveedor', key: 'idProveedor' },
      { header: 'Nombre Producto', key: 'nombreProducto' },
      { header: 'Nombre Comercial', key: 'nombreComercial' },
      { header: 'Descripción', key: 'descripcionProducto' },
      { header: 'Tipo Producto', key: 'tipoProducto' },
      { header: 'Marca', key: 'marca' },
      { header: 'Modelo', key: 'modelo' },
      { header: 'Costo', key: 'costo' },
      { header: 'Precio Venta', key: 'precioVenta' },
      { header: 'Precio Cliente', key: 'precioCliente' },
      { header: 'Precio Puntos', key: 'precioPuntos' },
      { header: 'Impuesto', key: 'impuesto' },
      { header: 'Descuento', key: 'descuento' },
      { header: 'Estado', key: 'estado' },
      { header: 'Envío', key: 'envio' },
    ];
    hoja1.addRows(productos);

    // Segunda hoja - Información desglosada de variantes
    const hoja2 = workbook.addWorksheet('Variantes');
    hoja2.columns = [
      { header: 'ID Producto', key: 'idProducto' },
      { header: 'Nombre Producto', key: 'nombreProducto' },
      { header: 'Nombre Variante', key: 'nombreVariante' },
      { header: 'Descripción Variante', key: 'descripcionVariante' },
    ];

    // Procesar las variantes para la segunda hoja
    const variantesDesglosadas = productos.flatMap((producto) => {
      const variantes = producto.variantes_opciones.split(' | ').map((variante) => {
        const [datosVariante] = variante.split(',');
        const [nombreVariante, descripcionVariante] = datosVariante.split('-');
        return {
          idProducto: producto.idProducto,
          nombreProducto: producto.nombreProducto,
          nombreVariante,
          descripcionVariante,
        };
      });
      return variantes;
    });
    hoja2.addRows(variantesDesglosadas);

    // Tercera hoja - Información desglosada de opciones
    const hoja3 = workbook.addWorksheet('Opciones');
    hoja3.columns = [
      { header: 'ID Producto', key: 'idProducto' },
      { header: 'Nombre Producto', key: 'nombreProducto' },
      { header: 'Nombre Variante', key: 'nombreVariante' },
      { header: 'Valor Opción', key: 'valorOpcion' },
      { header: 'SKU Comercial', key: 'skuComercial' },
      { header: 'SKU Automático', key: 'skuAutomatico' },
      { header: 'Cantidad', key: 'cantidad' },
    ];
    // Procesar las opciones para la tercera hoja
    const opcionesDesglosadas = productos.flatMap((producto) => {
      return producto.variantes_opciones.split(' | ').flatMap((variante) => {
        // Separar el encabezado de la variante y sus opciones
        const [datosVariante, ...opcionesParts] = variante.split(',');
        const [nombreVariante] = datosVariante.split('-');

        // Combinar todas las partes de opciones y dividirlas correctamente
        const opcionesCompletas = opcionesParts.join(',').trim();

        // Si no hay opciones, retornar array vacío
        if (!opcionesCompletas) return [];

        // Dividir las opciones y filtrar elementos vacíos
        return opcionesCompletas
          .split(', ')
          .filter((opcion) => opcion.trim())
          .map((opcion) => {
            const [valorOpcion, skuComercial, skuAutomatico, cantidad] = opcion
              .split(':')
              .map((s) => s.trim());

            return {
              idProducto: producto.idProducto,
              nombreProducto: producto.nombreProducto,
              nombreVariante,
              valorOpcion,
              skuComercial,
              skuAutomatico,
              cantidad,
            };
          });
      });
    });

    hoja3.addRows(opcionesDesglosadas);

    const buffer = await workbook.xlsx.writeBuffer();

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
