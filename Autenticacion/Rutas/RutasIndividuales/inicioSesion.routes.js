const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/aut/ctrl/inicioSesion.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const validarYSanitizar = require("@altertex/util/inter/validarYSanitizar");

/**
 * RF78 - Iniciar Sesion - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF78
 */

const RUTAS = require("@altertex/util/const/rutas");

/**
 * @swagger
 * /api/autenticacion/iniciar-sesion:
 *   post:
 *     summary: Inicia sesión con correo y contraseña.
 *     tags:
 *       - Autenticación
 *     security:
 *       - ApiKeyAuth: []  # Si estás usando autenticación por API key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - contrasenia
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: maria.gonzalez@example.com
 *               contrasenia:
 *                 type: string
 *                 example: hola
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Inicio de sesión exitoso.
 *       400:
 *         description: Faltan campos requeridos o formato inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: El correo y la contraseña son obligatorios.
 *       401:
 *         description: Credenciales inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Credenciales incorrectas.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor.
 */
ruteador.post(
  RUTAS.AUTENTICACION.INICIO_SESION,
  validarYSanitizar,
  revisarApiKey(),
  controlador.inicioSesion
);

module.exports = ruteador;
