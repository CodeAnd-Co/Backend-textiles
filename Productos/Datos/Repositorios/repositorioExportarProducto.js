const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_PRODUCTOS = require('@altertex/util/const/consultasProductos');
const excelJS = require('exceljs');

/**
 * Consulta la lista de productos seleccionados de un cliente para exportar en CSV.
 *
 * @param {number} idCliente
 * @param {number[]} idsProducto
 * @returns {Promise<Array<object>>}
 *
 * @see [RF58 - Documentación de requisitos](https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF58)
 */
exports.obtenerProductosExportacion = (idCliente, idsProducto) => {
  const placeholders = idsProducto.map(() => '?').join(', ');
  const query = CONSULTAS_PRODUCTOS.OBTENER_DATOS_EXPORTACION.replace('__IDS__', placeholders);
  return correrQuery(query, [idCliente, ...idsProducto]);
};

/**
 * Procesa y genera el archivo Excel con los productos exportados
 * @param {Array} productos Lista de productos a exportar
 * @returns {Promise<Buffer>} Buffer con el archivo Excel
 */
exports.generarArchivoExcel = async (productos) => {
  const workbook = new excelJS.Workbook();

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

  const variantesDesglosadas = procesarVariantes(productos);
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

  const opcionesDesglosadas = procesarOpciones(productos);
  hoja3.addRows(opcionesDesglosadas);

  return await workbook.xlsx.writeBuffer();
};

/**
 * Procesa las variantes de los productos
 * @param {Array} productos Lista de productos
 * @returns {Array} Lista de variantes procesadas
 */
function procesarVariantes(productos) {
  return productos.flatMap((producto) => {
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
}

/**
 * Procesa las opciones de los productos
 * @param {Array} productos Lista de productos
 * @returns {Array} Lista de opciones procesadas
 */
function procesarOpciones(productos) {
  return productos.flatMap((producto) => {
    return producto.variantes_opciones.split(' | ').flatMap((variante) => {
      const [datosVariante, ...opcionesParts] = variante.split(',');
      const [nombreVariante] = datosVariante.split('-');
      const opcionesCompletas = opcionesParts.join(',').trim();

      if (!opcionesCompletas) return [];

      return opcionesCompletas
        .split(', ')
        .filter((opcion) => opcion.trim())
        .map((opcion) => {
          const [valorOpcion, skuComercial, skuAutomatico, cantidad] = opcion
            .split(':')
            .map((valores) => valores.trim());

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
}
