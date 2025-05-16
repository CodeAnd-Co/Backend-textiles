/**
 * @file validarYSanitizarImagen.js
 * @description Middleware para detectar formatos no válidos de imagen.
 */

/**
 * Retorna un middleware que valida si el archivo recibido como imagen cumple con los requisitos:
 * - El archivo debe ser una imagen.
 * - El formato debe ser JPG o JPEG.
 * - El tamaño debe ser menor a 5MB.
 *
 * @function validarFormatoImagen
 * @returns {function(Express.Request, Express.Response, Express.NextFunction): void}
 * Middleware de validación de imagen.
 */
function validarFormatoImagen() {
  return function (req, res, next) {
    const imagen = req.file;

    if (imagen) {
      // Validar que el archivo corresponde a una imagen.
      const tipo = imagen.mimetype.split('/')[0];
      if (!tipo.match('image.*')) {
        return res.status(400).json({
          mensaje: 'El archivo no corresponde a una imagen.',
        });
      }

      // Validar que el formato de la imagen es uno de los aceptados.
      const extension = imagen.mimetype.split('/').pop();
      if (!['jpg', 'jpeg'].includes(extension)) {
        return res.status(400).json({
          mensaje: 'Formato de imagen no válido. Formatos válidos: JPG',
        });
      }

      // Validar que la imagen no pese más de 5Mb
      const tamano = imagen.size;
      if (tamano > 5500000) {
        return res.status(400).json({
          mensaje: 'Archivo muy pesado. Tamaño máximo: 5Mb.',
        });
      }
    }

    next();
  };
}

module.exports = validarFormatoImagen;
