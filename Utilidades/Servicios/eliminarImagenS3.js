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
 * @param {string} folder - Carpeta dentro del bucket (ej. "productos/").
 * @param {string} filename - Nombre del archivo a eliminar.
 */
const eliminarImagenS3 = async (folder, filename) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}${filename}`,
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
    // Imagen eliminada exitosamente (sin logs para consola limpia)
  } catch (error) {
    // Error al eliminar imagen (sin logs para consola limpia)
  }
};

module.exports = eliminarImagenS3;