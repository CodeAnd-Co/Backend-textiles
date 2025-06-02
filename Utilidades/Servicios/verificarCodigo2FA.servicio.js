// @file verificarCodigo2FA.servicio.js

const speakeasy = require('speakeasy');
const db = require('@altertex/util/bd/db');

/**
 * Verifica un código TOTP contra el secreto almacenado de un usuario.
 * @param {number} idUsuario - ID del usuario que ejecuta la acción
 * @param {string} codigo - Código TOTP ingresado (6 dígitos)
 * @returns {Promise<boolean>} true si el código es válido
 */
const verificarCodigo2FA = async (idUsuario, codigo) => {
  const [resultado] = await db.query(
    'SELECT secret2FA FROM usuarios_2fa WHERE idUsuario = ? AND tiene2FA = true',
    [idUsuario]
  );

  if (!resultado || resultado.length === 0) {
    return false;
  }

  const { secret2FA } = resultado[0];

  return speakeasy.totp.verify({
    secret: secret2FA,
    encoding: 'base32',
    token: codigo,
    window: 1
  });
};

module.exports = { verificarCodigo2FA };