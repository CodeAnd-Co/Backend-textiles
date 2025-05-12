/**
 * Extrae el nombre real del archivo desde una URL firmada de S3.
 * @param {string} url - URL completa del archivo en S3.
 * @returns {string} Nombre del archivo con extensión, sin parámetros.
 */
const extraerNombreArchivoS3 = (url) => {
    const partes = url.split('/');
    const ultimaParte = partes[partes.length - 1];
    return ultimaParte.split('?')[0]; // Elimina query params
  };
  
  module.exports = extraerNombreArchivoS3;