//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
/**
 * Valida un conjunto de opciones para un producto.
 *
 * Esta función valida cada opción dentro del arreglo de opciones pasado como argumento.
 * Se asegura de que los valores de las propiedades cumplan con los tipos y rangos especificados,
 * y retorna un objeto de error si algún valor es inválido.
 *
 * @param {Array<object>} opciones - Un arreglo de objetos que representan las opciones de un producto.
 * @param {number} opciones[].cantidad - La cantidad de la opción, que debe ser un número entero positivo o cero.
 * @param {string} opciones[].valorOpcion - El valor de la opción, que debe ser una cadena de texto de máximo 100 caracteres.
 * @param {string} [opciones[].SKUautomatico] - El SKU automático de la opción, que debe ser una cadena de texto de máximo 50 caracteres, si se proporciona.
 * @param {string} [opciones[].SKUcomercial] - El SKU comercial de la opción, que debe ser una cadena de texto de máximo 50 caracteres, si se proporciona.
 * @param {number} opciones[].costoAdicional - El costo adicional de la opción, que debe ser un número positivo o cero.
 * @param {number} opciones[].descuento - El descuento de la opción, que debe ser un número entre 0 y 100.
 * @param {number} opciones[].estado - El estado de la opción, que debe ser 1 (activo) o 0 (inactivo).
 *
 * @returns {object|null} Un objeto con una propiedad `error` si hay un error de validación, o `null` si todas las opciones son válidas.
 * @example
 * const opciones = [
 *   {
 *     cantidad: 5,
 *     valorOpcion: 'Tamaño M',
 *     SKUautomatico: 'SKU123',
 *     SKUcomercial: 'S123',
 *     costoAdicional: 15.50,
 *     descuento: 10,
 *     estado: 1
 *   }
 * ];
 *
 * const resultado = validarOpciones(opciones);
 * console.log(resultado); // null si todo está bien, o un objeto de error si algo es inválido
 */
module.exports = (opciones) => {
  for (const opcion of opciones) {
    // prettier-ignore
    if (
      typeof opcion.cantidad !== 'number' 
      || opcion.cantidad < 0 
      || !Number.isInteger(opcion.cantidad)
      || opcion.cantidad % 1 !== 0
    ) {
      return { error: 'cantidad de la opción debe ser un número entero positivo o cero.' };
    }

    // prettier-ignore
    if (
      !opcion.valorOpcion 
      || typeof opcion.valorOpcion !== 'string' 
      || opcion.valorOpcion.length > 100
    ) {
      return {
        error: 'valorOpcion es requerido y debe ser una cadena de texto de máximo 100 caracteres.',
      };
    }

    // prettier-ignore
    if (!opcion.SKUcomercial
    || opcion.SKUcomercial == null 
    || typeof opcion.SKUcomercial !== 'string' 
    || opcion.SKUcomercial.length > 50
    ) {
      return { error: 'SKUcomercial debe ser una cadena de texto de máximo 50 caracteres.' };
    }

    if (typeof opcion.costoAdicional !== 'number' || opcion.costoAdicional < 0) {
      return { error: 'costoAdicional debe ser un número positivo o cero.' };
    }

    if (typeof opcion.descuento !== 'number' || opcion.descuento < 0 || opcion.descuento > 100) {
      return { error: 'descuento debe ser un número entre 0 y 100.' };
    }

    if (typeof opcion.estado !== 'number' || (opcion.estado !== 0 && opcion.estado !== 1)) {
      return { error: 'estado debe ser 1 (activo) o 0 (inactivo).' };
    }
  }

  return null;
};
