const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const clienteS3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Obtiene URLs firmadas temporalmente para acceder a imágenes almacenadas en S3.
 *
 * Esta función toma un objeto `request` y un nombre de carpeta, busca las imágenes
 * dentro de esa carpeta indicadas por su `urlImagen`, y reemplaza esas rutas por URLs
 * firmadas válidas por una hora, generadas con AWS S3.
 *
 * @async
 * @function obtenerImagenFolder
 * @param {object} request - Objeto que contiene los datos con las rutas de imágenes a firmar.
 * @param {string} nombreFolder - Nombre del campo dentro del objeto `request` que contiene el arreglo con las rutas de imágenes. El último carácter (`/`) será eliminado.
 *
 * @returns {Promise<Array<object>>} Un array con los mismos objetos del array original, pero con la propiedad `urlImagen` reemplazada por la URL firmada o `null`.
 *
 * @throws {Error} - Si los datos del `request` no son válidos o si ocurre un error al obtener la imagen desde S3.
 */
async function obtenerImagenFolder(request, nombreFolder) {
  nombreFolder = nombreFolder.slice(0, -1);
  const Json = request[nombreFolder];

  if (!Json || !Array.isArray(Json)) {
    throw new Error("Invalid request data");
  }

  try {
    const jsonActualizado = await Promise.all(
      Json.map(async (folder) => {
        if (folder.urlImagen) {
          const comando = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${nombreFolder}/${folder.urlImagen}`,
          });

          folder.urlImagen = await getSignedUrl(clienteS3, comando, {
            expiresIn: 60 * 60,
          });
        } else {
          folder.urlImagen = null;
        }

        return folder;
      })
    );

    return jsonActualizado;
  } catch (error) {
    console.error("Error obteniendo imagen de S3:", error);
    throw new Error("Error obteniendo imagen de S3");
  }
}

module.exports = obtenerImagenFolder;
