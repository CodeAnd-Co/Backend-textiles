/**
 * @file validarYSanitizarImagen.js
 * @description Middleware para detectar formatos no válidos de imagen.
 */

/**
 * Middleware que analiza las imagenes del cuerpo (`req.body`) para detectar si el formato es válido.
 *
 * @param {Express.Request} req - Objeto de solicitud de Express.
 * @param {Express.Response} res - Objeto de respuesta de Express.
 * @param {Express.NextFunction} next - Función para pasar al siguiente middleware
 * @param {campoImagen} next - Nombre del campo del body que contiene el archivo de imagen.
 *
 * @returns {void}
 */

function validarFormatoImagen() {
  return function (req, res, next) {
    // console.log("iniciando validación")
    const imagen = req.file;
    // console.log('imagen:', imagen);

    if (imagen) {
      // Validar que el archivo corresponde a una imagen.
      const tipo = imagen.mimetype.split('/')[0];
      // console.log("tipo:",tipo);
      if (!tipo.match('image.*'))
        return res.status(400).json({
          mensaje: 'El archivo no corresponde a una imagen.',
        });

      // Validar que el formato de la imagen es uno de los aceptados.
      const extension = imagen.mimetype.split('/').pop();
      // console.log("extension:",extension);
      if (!['jpg', 'jpeg'].includes(extension)) {
        return res.status(400).json({
          mensaje: 'Formato de imagen no valido. Formatos válidos: JPG',
        });
      }

      // Validar que la imagen no pese más de 5Mb
      const tamano = imagen.size;
      // console.log('tamaño:', tamano);
      if (tamano > 5500000) {
        return res.status(400).json({
          mensaje: 'Archivo muy pesado. Tamaño máximo: 5Mb.',
        });
      }
    }

    // Continúa si pasa
    next();
  };
}

module.exports = validarFormatoImagen;
