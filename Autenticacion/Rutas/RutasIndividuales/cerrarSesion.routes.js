const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/aut/ctrl/cerrarSesion.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");

/**
 * RF78 - Iniciar Sesion - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF78
 */

const RUTAS = require("@altertex/util/const/rutas");

/**
 * @swagger
 * /autenticacion/cerrar-sesion:
 *   post:
 *     summary: Cierra la sesión del usuario actual eliminando la cookie con el token.
 *     tags:
 *       - Autenticación
 *     security:
 *       - ApiKeyAuth: []  # Si usas revisión de API key
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Cierre de sesión exitoso.
 *       400:
 *         description: No existe una sesión activa (no se encontró token).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No hay sesión activa.
 *       500:
 *         description: Error al intentar cerrar sesión.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor al cerrar sesión.
 */

ruteador.post(
  RUTAS.AUTENTICACION.CERRAR_SESION,
  revisarApiKey(),
  controlador.cerrarSesion
);

module.exports = ruteador;
