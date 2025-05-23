const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const db = require('@altertex/util/bd/db');

/**
 * Controlador que genera el secreto TOTP y QR para activación de Google Authenticator.
 * Guarda el secreto en la tabla usuarios_2fa.
 * 
 * @async
 * @param {object} req - La solicitud HTTP.
 * @param {object} res - La respuesta HTTP.
 * @returns {Promise<void>} - Respuesta HTTP con el QR y mensaje de éxito.
 * @throws {Error} - Si ocurre un error durante la activación.
 * @throws {Error} - Si ocurre un error durante la activación.
 * 
 */
const activar2FA = async (req, res) => {
  try {
    const { idUsuario, nombre, correo } = req.body;

    // 1. Generar secreto con nombre legible
    const secret = speakeasy.generateSecret({
      name: `Altertex (${nombre} - ${correo})`,
    });

    // 2. Convertir el secret en código QR (para Google Authenticator)
    const otpauthURL = secret.otpauth_url;
    const qrCodeBase64 = await qrcode.toDataURL(otpauthURL);

    // 3. Insertar o actualizar en tabla usuarios_2fa
    await db.query(`
      INSERT INTO usuarios_2fa (idUsuario, tiene2FA, secret2FA, puedeEliminarSuperadmins)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE tiene2FA = VALUES(tiene2FA), secret2FA = VALUES(secret2FA)
    `, [idUsuario, true, secret.base32, true]);

    // 4. Devolver imagen del QR al frontend
    res.status(200).json({
      mensaje: 'Se generó el QR de activación.',
      qrCode: qrCodeBase64,
    });
  } catch (error) {
    console.error('Error al activar 2FA:', error);
    res.status(500).json({ mensaje: 'Error al activar autenticación 2FA.' });
  }
};

module.exports = { activar2FA};