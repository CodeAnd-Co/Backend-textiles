const subirArchivo = require('@altertex/util/ser/enviarS3');

/**
 * Sube un archivo al bucket de AWS S3 con un nombre y ruta específicos.
 *
 * @async
 * @function
 * @param {object} file - Archivo a subir. Debe contener las propiedades `buffer` y `mimetype`.
 * @param {string} route - Ruta dentro del bucket donde se almacenará la imagen (por ejemplo, 'clientes').
 * @param {string} name - Nombre base del archivo (sin extensión). Se le añadirá `.jpg` automáticamente.
 * @returns {Promise<object>} Retorna el resultado de la operación de subida a S3.
 * @throws {Error} Lanza un error si ocurre un fallo al subir el archivo.
 */
module.exports = async (file, route, name) => {
  if (file) {
    const fileName = `${route}/${name}.jpg`;
    try {
      return await subirArchivo({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      });
    } catch (error) {
      console.error('Error al subir imagen: ', error);
      throw new Error('Error al subir imagen');
    }
  }
};
