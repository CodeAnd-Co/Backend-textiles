const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

/**
 * Carga un archivo en un bucket de Amazon S3 y devuelve la URL pública del archivo cargado.
 * Utiliza el cliente de AWS SDK para enviar el archivo al bucket S3 configurado.
 *
 * @async
 * @function subirArchivoS3
 * @param {Object} parametros - Los parámetros necesarios para cargar el archivo en S3.
 * @param {string} parametros.Bucket - El nombre del bucket S3 donde se almacenará el archivo.
 * @param {string} parametros.Key - El nombre del archivo que se almacenará en S3.
 * @param {Buffer|Uint8Array|Blob|string} parametros.Body - El contenido del archivo a cargar.
 * @param {string} [parametros.ContentType] - El tipo de contenido del archivo (opcional).
 *
 * @returns {Promise<string>} La URL pública del archivo cargado en S3.
 *
 * @throws {Error} - Si ocurre un error al cargar el archivo en S3 o al obtener la URL.
 */

const s3 = new S3Client({
  region: "us-east-1",
});

module.exports = async (parametros) => {
  await s3.send(new PutObjectCommand(parametros));
  const nombreArchivo = parametros.Key;
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${nombreArchivo}`;
};
