// @file verificar2FA.controller.js
// @description Verifica el código 2FA de Google Authenticator para acciones críticas como eliminar superadmins.

const speakeasy = require('speakeasy'); // Biblioteca para verificar códigos TOTP (2FA)
const db = require('@altertex/util/bd/db'); // Conexión a la base de datos

/**
 * Controlador que verifica el código 2FA de Google Authenticator.
 *
 * Se utiliza en operaciones críticas (ej. eliminación de Superadmins),
 * validando el token TOTP generado desde una app de autenticación (como Google Authenticator).
 *
 * @async
 * @function verificar2FA
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {number} req.body.idUsuario - ID del usuario que solicita la operación.
 * @param {string} req.body.codigo - Código TOTP ingresado por el usuario.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Envía una respuesta JSON con el resultado de la verificación.
 */
const verificar2FA = async (req, res) => {
  try {
    const { idUsuario, codigo } = req.body;

    // Validación básica de parámetros
    if (!idUsuario || !codigo) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos.' });
    }

    // Consultar el secreto almacenado para el usuario con 2FA activado
    const [resultado] = await db.query(
      'SELECT secret2FA FROM usuarios_2fa WHERE idUsuario = ? AND tiene2FA = true',
      [idUsuario]
    );

    // Verificación de existencia de secreto
    if (!resultado || resultado.length === 0) {
      return res.status(403).json({ mensaje: 'No tienes activado 2FA o no estás autorizado.' });
    }

    const { secret2FA } = resultado[0];

    // Verificación del código TOTP usando el secreto y un margen de 30s
    const esValido = speakeasy.totp.verify({
      secret: secret2FA,
      encoding: 'base32',
      token: codigo,
      window: 1,
    });

    if (!esValido) {
      return res.status(401).json({ mensaje: 'Código inválido o expirado.' });
    }

    return res.status(200).json({ mensaje: 'Código verificado correctamente.' });
  } catch (error) {
    console.error('Error al verificar 2FA:', error);
    return res.status(500).json({ mensaje: 'Error al verificar autenticación 2FA.' });
  }
};

module.exports = { verificar2FA };