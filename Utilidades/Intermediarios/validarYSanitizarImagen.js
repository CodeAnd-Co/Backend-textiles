/**
 * @file validarYSanitizarImagen.js
 * @description Middleware para detectar formatos no válidos de imagen.
 */

/**
 * Middleware que analiza las imagenes del cuerpo (`req.body`) para detectar si el formato es válido.
 *
 * @param {Express.Request} req - Objeto de solicitud de Express.
 * @param {Express.Response} res - Objeto de respuesta de Express.
 * @param {Express.NextFunction} next - Función para pasar al siguiente middleware.
 *
 * @returns {void}
 */

function validarFormatoImagen(opciones = {}) {
  
    return function (req, res, next) {
        const { campoImagen } = opciones;
        const imagen = req.body[campoImagen];
        console.log('imagen:', imagen)

        if(imagen){

          // Validar que el archivo corresponde a una imagen.
          console.log(imagen.type)
          if(!imagen.type.match('image.*'))
              return res.status(400).json({
                  mensaje: 'El archivo no corresponde a una imagen.',
              });
          
          // Validar que el formato de la imagen es uno de los aceptados.
          const ext = getExtension(imagen)
          console.log(ext)
          if(!['jpg', 'jpeg', 'png'].includes(ext)){
              return res.status(400).json({
                mensaje: 'Formato de imagen no valido. Formatos válidos: JPG, JPEG, PNG',
              });
          }

          console.log(res.headers['content-length'])
          
        };
        
        // Continúa si pasa
        next();
    };
};

module.exports = validarFormatoImagen;