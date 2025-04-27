/**
 * Valida los campos de una variante.
 *
 * Esta función valida los diferentes campos de un objeto `variante` asegurándose de que cumplan con los tipos y restricciones especificadas. Si algún campo no cumple con las condiciones, se devuelve un objeto de error con un mensaje específico. Si todos los campos son válidos, se retorna `null`.
 *
 * @param {object} variante - El objeto que representa una variante a validar.
 * @param {string} variante.nombreVariante - El nombre de la variante, debe ser una cadena de texto de máximo 100 caracteres.
 * @param {string|null} variante.descripcion - La descripción de la variante, debe ser una cadena de texto de máximo 1000 caracteres o `null`.
 *
 * @returns {object|null} Un objeto con una propiedad `error` si hay un error de validación, o `null` si todos los campos son válidos.
 * @example
 * const variante = {
 *   nombreVariante: 'Tamaño L',
 *   descripcion: 'Variante para talla grande',
 * };
 *
 * const resultado = validarVariante(variante);
 * console.log(resultado); // null si todo está bien, o un objeto de error si algo es inválido
 */
module.exports = (variante) => {
  if (
    !variante.nombreVariante ||
    typeof variante.nombreVariante !== 'string' ||
    variante.nombreVariante.length > 100
  ) {
    return {
      error:
        'nombreVariante es requerido, debe ser una cadena de texto y no exceder 100 caracteres.',
    };
  }

  if (
    variante.descripcion !== null &&
    (typeof variante.descripcion !== 'string' || variante.descripcion.length > 1000)
  ) {
    return {
      error: 'descripcion debe ser una cadena de texto o NULL y no exceder 1000 caracteres.',
    };
  }

  return null;
};
