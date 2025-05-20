const redis = require('@altertex/config/clienteRedis');

/**
 * Genera una llave única para rastrear las peticiones diarias de un usuario.
 *
 * @param {string|number} idUsuario - ID del usuario autenticado.
 * @returns {string} Llave única en formato `quota:usuario:<idUsuario>:<fecha>`.
 */
const obtenerLlave = (idUsuario) => {
  const fecha = new Date().toISOString().split('T')[0];
  return `quota:usuario:${idUsuario}:${fecha}`;
};

const PETICIONES_MAXIMAS_DIARIAS = 1500;

/**
 * Middleware que limita la cantidad de peticiones diarias que un usuario puede hacer.
 * Utiliza Redis para llevar el conteo por usuario por día.
 *
 * Este middleware asume que `req.user.idUsuario` ha sido definido previamente,
 * por ejemplo mediante otro middleware de autenticación con JWT.
 *
 * @param {Express.Request} req - Objeto de solicitud HTTP.
 * @param {Express.Response} res - Objeto de respuesta HTTP.
 * @param {Express.NextFunction} next - Función para pasar al siguiente middleware.
 * @returns {void}
 */
const limitePeticionesDiarias = async (req, res, next) => {
  try {
    const idUsuario = req.user?.idUsuario;
    if (!idUsuario) {
      return res.status(401).json({ mensaje: 'ID del usuario no encontrado.' });
    }

    const llave = obtenerLlave(idUsuario);
    const contador = await redis.incr(llave);

    if (contador === 1) {
      await redis.expire(llave, 86400);
    }

    if (contador > PETICIONES_MAXIMAS_DIARIAS) {
      return res.status(429).json({ mensaje: 'Limite diario de peticiones excedido para el usuario.' });
    }
    next();
  } catch (error) {
    console.error('Error en middleware de limite de peticiones', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = limitePeticionesDiarias;

