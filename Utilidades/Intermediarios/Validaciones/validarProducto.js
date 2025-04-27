/**
 * Valida los campos de un producto.
 *
 * Esta función valida los diferentes campos de un objeto `producto` asegurándose de que cumplan con los tipos y restricciones especificados. Si algún campo no cumple con las condiciones, se devuelve un objeto de error con un mensaje específico. Si todos los campos son válidos, se retorna `null`.
 *
 * @param {object} producto - El objeto que representa un producto a validar.
 * @param {number|null} producto.idProveedor - El ID del proveedor, debe ser un número entero positivo o `null`.
 * @param {string} producto.nombreComun - El nombre común del producto, debe ser una cadena de texto de máximo 100 caracteres.
 * @param {string|null} producto.nombreComercial - El nombre comercial del producto, debe ser una cadena de texto de máximo 150 caracteres o `null`.
 * @param {string|null} producto.descripcion - Descripción del producto, debe ser una cadena de texto de máximo 1000 caracteres o `null`.
 * @param {string|null} producto.marca - La marca del producto, debe ser una cadena de texto de máximo 100 caracteres o `null`.
 * @param {string|null} producto.modelo - El modelo del producto, debe ser una cadena de texto de máximo 100 caracteres o `null`.
 * @param {string|null} producto.tipoProducto - El tipo de producto, debe ser una cadena de texto de máximo 50 caracteres o `null`.
 * @param {number|null} producto.precioPuntos - El precio en puntos, debe ser un número entero positivo o `null`.
 * @param {number|null} producto.precioCliente - El precio para el cliente, debe ser un número mayor o igual a cero o `null`.
 * @param {number|null} producto.precioVenta - El precio de venta, debe ser un número mayor o igual a cero o `null`.
 * @param {number|null} producto.costo - El costo del producto, debe ser un número mayor o igual a cero o `null`.
 * @param {number|null} producto.impuesto - El impuesto del producto, debe ser un número mayor o igual a cero o `null`.
 * @param {number|null} producto.descuento - El descuento del producto, debe ser un número mayor o igual a cero o `null`.
 * @param {number} producto.estado - El estado del producto, debe ser 0 (inactivo) o 1 (activo).
 * @param {number} producto.envio - Indica si el envío está disponible, debe ser 0 (no disponible) o 1 (disponible).
 *
 * @returns {object|null} Un objeto con una propiedad `error` si hay un error de validación, o `null` si todos los campos son válidos.
 * @example
 * const producto = {
 *   idProveedor: 1,
 *   nombreComun: 'Producto X',
 *   nombreComercial: 'Producto X Comercial',
 *   descripcion: 'Descripción del producto',
 *   marca: 'Marca X',
 *   modelo: 'Modelo 123',
 *   tipoProducto: 'Tipo A',
 *   precioPuntos: 100,
 *   precioCliente: 200.50,
 *   precioVenta: 250,
 *   costo: 150,
 *   impuesto: 25,
 *   descuento: 10,
 *   estado: 1,
 *   envio: 1,
 * };
 *
 * const resultado = validarProducto(producto);
 * console.log(resultado); // null si todo está bien, o un objeto de error si algo es inválido
 */
module.exports = (producto) => {
  if (
    producto.idProveedor !== null &&
    (typeof producto.idProveedor !== 'number' ||
      producto.idProveedor <= 0 ||
      !Number.isInteger(producto.idProveedor))
  ) {
    return { error: 'idProveedor debe ser un número entero positivo o NULL.' };
  }

  if (
    !producto.nombreComun ||
    typeof producto.nombreComun !== 'string' ||
    producto.nombreComun.length > 100
  ) {
    return {
      error: 'nombreComun es requerido, debe ser una cadena de texto y no exceder 100 caracteres.',
    };
  }

  if (
    producto.nombreComercial !== null &&
    (typeof producto.nombreComercial !== 'string' || producto.nombreComercial.length > 150)
  ) {
    return {
      error: 'nombreComercial debe ser una cadena de texto o NULL y no exceder 150 caracteres.',
    };
  }

  if (
    producto.descripcion !== null &&
    (typeof producto.descripcion !== 'string' || producto.descripcion.length > 1000)
  ) {
    return {
      error: 'descripcion debe ser una cadena de texto o NULL y no exceder 1000 caracteres.',
    };
  }

  if (
    producto.marca !== null &&
    (typeof producto.marca !== 'string' || producto.marca.length > 100)
  ) {
    return { error: 'marca debe ser una cadena de texto o NULL y no exceder 100 caracteres.' };
  }

  if (
    producto.modelo !== null &&
    (typeof producto.modelo !== 'string' || producto.modelo.length > 100)
  ) {
    return { error: 'modelo debe ser una cadena de texto o NULL y no exceder 100 caracteres.' };
  }

  if (
    producto.tipoProducto !== null &&
    (typeof producto.tipoProducto !== 'string' || producto.tipoProducto.length > 50)
  ) {
    return {
      error: 'tipoProducto debe ser una cadena de texto o NULL y no exceder 50 caracteres.',
    };
  }

  const camposNumericos = [
    'precioPuntos',
    'precioCliente',
    'precioVenta',
    'costo',
    'impuesto',
    'descuento',
  ];

  for (const campo of camposNumericos) {
    if (
      producto[campo] !== null &&
      (typeof producto[campo] !== 'number' ||
        (campo === 'precioPuntos' && !Number.isInteger(producto[campo])) ||
        (campo !== 'precioPuntos' && producto[campo] < 0))
    ) {
      return { error: `${campo} debe ser un número válido y mayor o igual a cero.` };
    }
  }

  if (producto.estado !== undefined && producto.estado !== 0 && producto.estado !== 1) {
    return { error: 'estado debe ser 0 (inactivo) o 1 (activo).' };
  }

  if (producto.envio !== undefined && producto.envio !== 0 && producto.envio !== 1) {
    return { error: 'envio debe ser 0 (no disponible) o 1 (disponible).' };
  }

  return null;
};
