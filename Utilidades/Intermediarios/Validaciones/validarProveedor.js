//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
/**
 * Valida los campos de un proveedor.
 *
 * Esta función verifica que los campos del objeto `proveedor` cumplan con los requisitos de tipo, longitud y formato.
 * Si algún campo no es válido, devuelve un objeto con un mensaje de error específico.
 * Si todos los campos son válidos, retorna `null`.
 *
 * @param {object} proveedor - Objeto que representa al proveedor a validar.
 * @param {string} proveedor.nombre - Nombre del proveedor (obligatorio, máximo 100 caracteres).
 * @param {string} [proveedor.nombreCompania] - Nombre de la compañía (opcional, máximo 150 caracteres).
 * @param {string} [proveedor.telefonoContacto] - Teléfono de contacto (opcional, máximo 20 caracteres).
 * @param {string} [proveedor.correoContacto] - Correo electrónico de contacto (opcional, válido y máximo 100 caracteres).
 * @param {string} [proveedor.direccion] - Dirección del proveedor (opcional, máximo 200 caracteres).
 * @param {string} [proveedor.codigoPostal] - Código postal (opcional, máximo 20 caracteres).
 * @param {string} [proveedor.pais] - País del proveedor (opcional, máximo 50 caracteres).
 * @param {number} proveedor.estado - Estado del proveedor: 1 (activo) o 0 (inactivo).
 *
 * @returns {{ error: string } | null} Retorna un objeto con la propiedad `error` si hay un error de validación, o `null` si todo es válido.
 */
module.exports = (proveedor) => {
  /**
   * Verifica si un texto es válido (tipo string, no vacío, dentro del límite de caracteres).
   *
   * @param {string} valor - Texto a validar.
   * @param {number} max - Longitud máxima permitida.
   * @returns {boolean} `true` si es válido, `false` en caso contrario.
   */
  // prettier-ignore
  const esTextoValido = (valor, max) => typeof valor === 'string' && valor.trim().length > 0 && valor.trim().length <= max;

  if (!esTextoValido(proveedor.nombre, 100)) {
    return {
      error: 'nombre es obligatorio y debe ser una cadena de texto de máximo 100 caracteres.',
    };
  }

  if (proveedor.nombreCompania != null && !esTextoValido(proveedor.nombreCompania, 150)) {
    return {
      error: 'nombreCompania debe ser una cadena de texto no vacía de máximo 150 caracteres.',
    };
  }

  if (proveedor.telefonoContacto != null && !esTextoValido(proveedor.telefonoContacto, 20)) {
    return {
      error: 'telefonoContacto debe ser una cadena de texto no vacía de máximo 20 caracteres.',
    };
  }

  // prettier-ignore
  if (proveedor.correoContacto != null) {
    const correo = proveedor.correoContacto.trim();
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      typeof correo !== 'string' 
      || correo.length === 0 
      || correo.length > 100 
      || !regexCorreo.test(correo)
    ) {
      return {
        error:
          'correoContacto debe ser un correo electrónico válido y con un máximo de 100 caracteres.',
      };
    }
  }

  if (proveedor.direccion != null && !esTextoValido(proveedor.direccion, 200)) {
    return { error: 'direccion debe ser una cadena de texto no vacía de máximo 200 caracteres.' };
  }

  if (proveedor.codigoPostal != null && !esTextoValido(proveedor.codigoPostal, 20)) {
    return { error: 'codigoPostal debe ser una cadena de texto no vacía de máximo 20 caracteres.' };
  }

  if (proveedor.pais != null && !esTextoValido(proveedor.pais, 50)) {
    return { error: 'pais debe ser una cadena de texto no vacía de máximo 50 caracteres.' };
  }

  if (typeof proveedor.estado !== 'number' || (proveedor.estado !== 1 && proveedor.estado !== 0)) {
    return { error: 'estado debe ser 1 (activo) o 0 (inactivo).' };
  }

  return null;
};
