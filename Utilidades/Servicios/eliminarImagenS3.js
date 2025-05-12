const AWS = require("aws-sdk");

AWS.config.update({
  signatureVersion: "v4",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

/**
 * Elimina una imagen de Amazon S3.
 * @param {string} folder - Carpeta dentro del bucket (ej. "productos/").
 * @param {string} filename - Nombre del archivo a eliminar.
 */
const eliminarImagenS3 = (folder, filename) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}${filename}`,
  };

  s3.deleteObject(params, (err) => {
    if (err) {
      // console.error("Error eliminando imagen de S3:", err);
    } else {
      // console.log("Imagen eliminada de S3:", filename);
    }
  });
};

module.exports = eliminarImagenS3;
