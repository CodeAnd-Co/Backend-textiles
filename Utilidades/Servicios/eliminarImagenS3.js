// Importaciones específicas del AWS SDK v3
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// Crear una instancia del cliente de S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Elimina una imagen de Amazon S3.
 *
 * @param {string} folder - Carpeta dentro del bucket (ej. "productos/").
 * @param {string} filename - Nombre del archivo a eliminar.
 * @returns {Promise<void>} Lanza un error si la eliminación falla.
 * @throws {Error} Si ocurre un problema al eliminar el archivo de S3.
 */
const eliminarImagenS3 = async (folder, filename) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}${filename}`,
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
  } catch (error) {
    throw new Error(`Error al eliminar la imagen "${folder}${filename}" de S3: ${error.message}`);
  }
};

module.exports = eliminarImagenS3;
