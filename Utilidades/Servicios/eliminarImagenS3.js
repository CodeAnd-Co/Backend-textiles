const AWS = require('aws-sdk');

AWS.config.update({
  signatureVersion: 'v4',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

/**
 * Elimina una imagen de Amazon S3.
 * @param {string} folder - Carpeta dentro del bucket (ej. "productos/").
 * @param {string} filename - Nombre del archivo a eliminar.
 * @returns {Promise<void>} Lanza un error si la eliminación falla.
 */
const eliminarImagenS3 = async (folder, filename) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}${filename}`,
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err) => {
      if (err) {
        reject(new Error(`Error al eliminar imagen S3: ${err.message}`));
      } else {
        resolve();
      }
    });
  });
};

module.exports = eliminarImagenS3;
