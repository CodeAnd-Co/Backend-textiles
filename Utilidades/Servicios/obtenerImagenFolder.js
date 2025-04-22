const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Crear cliente S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function obtenerImagenFolder(request, folderNombre) {
  folderNombre = folderNombre.slice(0, -1);
  const Json = request[folderNombre];

  if (!Json || !Array.isArray(Json)) {
    throw new Error("Invalid request data");
  }

  try {
    const updatedJson = await Promise.all(
      Json.map(async (folder) => {
        if (folder.urlImagen) {
          const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folderNombre}/${folder.urlImagen}`,
          });

          // Obtenemos la URL firmada
          folder.urlImagen = await getSignedUrl(s3Client, command, {
            expiresIn: 60 * 60, // 1 hora
          });
        } else {
          folder.urlImagen = null;
        }

        return folder;
      })
    );

    return updatedJson;
  } catch (error) {
    console.error("Error obteniendo imagen de S3:", error);
    throw new Error("Error obteniendo imagen de S3");
  }
}

module.exports = obtenerImagenFolder;
