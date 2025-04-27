const multer = require('multer');
const enviarS3 = require('@altertex/util/ser/enviarS3');
const MENSAJES_PRODUCTOS = require('@altertex/util/const/mensajesProductos');

// Configuración de multer para guardar los archivos en memoria
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Controlador para subir imagenes a S3
 *
 * @param {string} fieldName - El nombre del campo donde se recibe la imagen.
 */
exports.subirImagen = [
  // Usamos multer para manejar la carga de archivos
  upload.single('imagen'), // Solo un archivo por vez. 'imagen' es el campo que esperamos recibir.

  async (req, res) => {
    const { fieldName } = req.body; // El nombre del campo se debe pasar en el cuerpo de la solicitud

    // Verificamos que el archivo haya sido recibido
    if (!req.file) {
      return res.status(MENSAJES_PRODUCTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: 'No se recibió ningún archivo.',
      });
    }

    try {
      // Subir el archivo a S3
      const urlImagen = await enviarS3({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `productos/${fieldName}_${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });

      // Retornar la URL de la imagen subida a S3
      return res.status(200).json({
        mensaje: 'Imagen subida correctamente',
        urlImagen,
      });
    } catch (error) {
      console.error('Error al subir imagen:', error);
      return res.status(MENSAJES_PRODUCTOS.ERROR_CONSULTAR_PRODUCTOS.codigo).json({
        mensaje: MENSAJES_PRODUCTOS.ERROR_CONSULTAR_PRODUCTOS.mensaje,
        error: error.message,
      });
    }
  },
];
