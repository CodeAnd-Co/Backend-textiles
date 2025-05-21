const redis = require('@altertex/config/clienteRedis');

/**
 * Genera una llave única para rastrear las peticiones diarias de un usuario por correo.
 *
 * @param {string} correo - Correo electrónico del usuario autenticado.
 * @returns {string} Llave única en formato `quota:usuario:<correo>:<fecha>`.
 */
const obtenerLlave = (correo) => {
  const fecha = new Date().toISOString().split('T')[0];
  return `quota:usuario:${correo}:${fecha}`;
};

const PETICIONES_MAXIMAS_DIARIAS = 1500;

/**
 * Middleware que limita la cantidad de peticiones diarias que un usuario puede hacer,
 * usando su correo electrónico como identificador.
 *
 * Este middleware asume que `req.user.correo` ha sido definido previamente,
 * por ejemplo mediante un middleware de autenticación con JWT.
 *
 * @param {Express.Request} req - Objeto de solicitud de Express.
 * @param {Express.Response} res - Objeto de respuesta de Express.
 * @param {Express.NextFunction} next - Función para pasar al siguiente middleware.
 * @returns {Promise<void>} Retorna una promesa que se resuelve al continuar la cadena de middlewares,
 * o responde con un error si se excede el límite o ocurre un fallo.
 */
const limitePeticionesDiarias = async (req, res, next) => {
  try {
    const correo = req.user?.correo;
    if (!correo) {
      return res.status(401).json({ mensaje: 'Correo del usuario no encontrado.' });
    }

    const llave = obtenerLlave(correo);
    const contador = await redis.incr(llave);

    if (contador === 1) {
      await redis.expire(llave, 86400); // 24 horas
    }

    if (contador > PETICIONES_MAXIMAS_DIARIAS) {
      return res.status(429).json({ mensaje: 'Límite diario de peticiones excedido para el usuario.' });
    }

    next();
  } catch (error) {
    console.error('Error en middleware de límite de peticiones:', error);
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};

module.exports = limitePeticionesDiarias;
