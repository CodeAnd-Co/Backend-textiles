const express = require("express");
const revisarApiKey = require("../../../util/middlewares/revisarApiKey");
const ruteador = express.Router();
const controlador = require("../../Controladores/inicioSesion.controller");
const validarInjeccion = require("../../../util/middlewares/validarInjeccionNoSql");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     security:
 *       - ApiKeyAuth: []
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
 *                 example: usuario@correo.com
 *               contrasenia:
 *                 type: string
 *                 example: ejemplo123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inicio de sesion exitoso
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Faltan campos requeridos
 *       401:
 *         description: Credenciales incorrectas o usuario no encontrado
 *       500:
 *         description: Error al obtener usuario
 */
ruteador.post(
  "/auth/login",
  validarInjeccion,
  revisarApiKey("x-api-key"),
  controlador.inicioSesion
);

module.exports = ruteador;
