const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

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
