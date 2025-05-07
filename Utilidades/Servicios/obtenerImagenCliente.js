const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Obtiene URL firmadas temporalmente para acceder a una imagen almacenada en S3.
 *
 * Esta función toma un nombre de archivo, busca las imágenes
 * dentro de esa carpeta indicadas por su `urlImagen`, y reemplaza la ruta por una URL
 * firmada y válida por una hora, generadas con AWS S3.
 *
 * @async
 * @function obtenerImagenCliente
 * @param {string} nombreImagen - Nombre de la imagen para obtener URL de S3.
 *
 * @returns {string} imagenUrl
 *
 * @throws {Error} - Si ocurre un error al obtener la imagen desde S3.
 */
async function obtenerImagenCliente(nombreImagen) {
  if (!nombreImagen) {
    return null; // O lanzar un error si prefieres
  }

  try {
    const parametrosImagen = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `clientes/${nombreImagen}`,
    };

    // El tiempo de expiración en segundos (ejemplo: 1 hora)
    const imagenUrl = await getSignedUrl(s3, new GetObjectCommand(parametrosImagen), {
      expiresIn: 3600,
    });

    return imagenUrl;
  } catch (error) {
    console.error('Error fetching user image from S3:', error);
    throw new Error('Error fetching user image from S3');
  }
}

module.exports = obtenerImagenCliente;
