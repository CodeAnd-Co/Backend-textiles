const AWS = require("aws-sdk");

// Configurar AWS
AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

async function getImageFolder(request, folderName) {
  // Elimina la última barra diagonal de la carpeta
  folderName = folderName.slice(0, -1);
  // Obtiene el JSON de la solicitud
  const Json = request[folderName];

  // Verifica si el JSON es válido y es un arreglo
  if (!Json || !Array.isArray(Json)) {
    throw new Error("Invalid request data");
  }

  try {
    // Mapea cada elemento del JSON y actualiza la imagen
    const updatedJson = await Promise.all(
      Json.map(async (folder) => {
        if (folder.imagen) {
          // Parametros para obtener URL de la imagen del S3
          const imageParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folderName}/${folder.imagen}`,
            Expires: 60 * 60, // Tiempo de expiración (1 hora)
          };
          // Obtiene la URL de la imagen del S3
          folder.imagen = s3.getSignedUrl("getObject", imageParams);
        } else {
          folder.imagen = null; // Si no hay imagen, asigna null
        }
        return folder; // Retorna el folder actualizado
      })
    );

    return updatedJson;
  } catch (error) {
    console.error("Error fetching image from S3:", error);
    throw new Error("Error fetching image from S3");
  }
}

module.exports = getImageFolder;
