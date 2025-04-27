/**
 * Valida los campos de un proveedor.
 *
 * Esta función valida los diferentes campos de un objeto `proveedor` asegurándose de que cumplan con los tipos y restricciones especificados. Si algún campo no cumple con las condiciones, se devuelve un objeto de error con un mensaje específico. Si todos los campos son válidos, se retorna `null`.
 *
 * @param {object} proveedor - El objeto que representa un proveedor a validar.
 * @param {string} proveedor.nombre - El nombre del proveedor, debe ser una cadena de texto de máximo 100 caracteres.
 * @param {string|null} proveedor.nombreCompania - El nombre de la compañía del proveedor, debe ser una cadena de texto de máximo 150 caracteres o `null`.
 * @param {string|null} proveedor.telefonoContacto - El teléfono de contacto del proveedor, debe ser una cadena de texto de máximo 20 caracteres o `null`.
 * @param {string|null} proveedor.correoContacto - El correo electrónico de contacto del proveedor, debe ser una cadena de texto válida con un máximo de 100 caracteres o `null`.
 * @param {string|null} proveedor.direccion - La dirección del proveedor, debe ser una cadena de texto de máximo 200 caracteres o `null`.
 * @param {string|null} proveedor.codigoPostal - El código postal del proveedor, debe ser una cadena de texto de máximo 20 caracteres o `null`.
 * @param {string|null} proveedor.pais - El país del proveedor, debe ser una cadena de texto de máximo 50 caracteres o `null`.
 * @param {number} proveedor.estado - El estado del proveedor, debe ser 1 (activo) o 0 (inactivo).
 *
 * @returns {object|null} Un objeto con una propiedad `error` si hay un error de validación, o `null` si todos los campos son válidos.
 * @example
 * const proveedor = {
 *   nombre: 'Proveedor XYZ',
 *   nombreCompania: 'Compania XYZ',
 *   telefonoContacto: '1234567890',
 *   correoContacto: 'contacto@xyz.com',
 *   direccion: 'Calle Ficticia 123',
 *   codigoPostal: '12345',
 *   pais: 'México',
 *   estado: 1,
 * };
 *
 * const resultado = validarProveedor(proveedor);
 * console.log(resultado); // null si todo está bien, o un objeto de error si algo es inválido
 */
module.exports = (proveedor) => {
  console.log(proveedor);
  if (!proveedor.nombre || typeof proveedor.nombre !== 'string' || proveedor.nombre.length > 100) {
    return {
      error: 'nombre es obligatorio y debe ser una cadena de texto de máximo 100 caracteres.',
    };
  }

  if (
    proveedor.nombreCompania &&
    (typeof proveedor.nombreCompania !== 'string' || proveedor.nombreCompania.length > 150)
  ) {
    return { error: 'nombreCompania debe ser una cadena de texto de máximo 150 caracteres.' };
  }

  if (
    proveedor.telefonoContacto &&
    (typeof proveedor.telefonoContacto !== 'string' || proveedor.telefonoContacto.length > 20)
  ) {
    return { error: 'telefonoContacto debe ser una cadena de texto de máximo 20 caracteres.' };
  }

  if (
    proveedor.correoContacto &&
    (typeof proveedor.correoContacto !== 'string' ||
      proveedor.correoContacto.length > 100 ||
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(proveedor.correoContacto))
  ) {
    return {
      error:
        'correoContacto debe ser un correo electrónico válido y con un máximo de 100 caracteres.',
    };
  }

  if (
    proveedor.direccion &&
    (typeof proveedor.direccion !== 'string' || proveedor.direccion.length > 200)
  ) {
    return { error: 'direccion debe ser una cadena de texto de máximo 200 caracteres.' };
  }

  if (
    proveedor.codigoPostal &&
    (typeof proveedor.codigoPostal !== 'string' || proveedor.codigoPostal.length > 20)
  ) {
    return { error: 'codigoPostal debe ser una cadena de texto de máximo 20 caracteres.' };
  }

  if (proveedor.pais && (typeof proveedor.pais !== 'string' || proveedor.pais.length > 50)) {
    return { error: 'pais debe ser una cadena de texto de máximo 50 caracteres.' };
  }

  if (typeof proveedor.estado !== 'number' || (proveedor.estado !== 1 && proveedor.estado !== 0)) {
    return { error: 'estado debe ser 1 (activo) o 0 (inactivo).' };
  }

  return null;
};
