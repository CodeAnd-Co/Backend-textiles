//RF33 - LEER COUTA SET - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF33]
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/cuota/ctrl/leerSetCuotas.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/cuotas/leer-set-cuotas:
 *   post:
 *     summary: Leer set de cuotas
 *     description: Obtiene el set de cuotas según los parámetros enviados.
 *     tags:
 *       - Cuotas
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idSet:
 *                 type: string
 *                 description: ID del set de cuotas a consultar
 *             required:
 *               - idSet
 *     responses:
 *       '200':
 *         description: Set de cuotas obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cuotas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     # Define los campos de cada cuota aquí
 *       '401':
 *         description: No autorizado (API Key o Token inválido)
 *       '403':
 *         description: Permisos insuficientes
 *       '400':
 *         description: Error de validación o parámetros incorrectos
 *       '500':
 *         description: Error interno del servidor
 */

ruteador.post(
  RUTAS.CUOTAS.LEER_SET_CUOTAS,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.LEER_SET_CUOTAS),
  controlador.leerSetCuotas
);

module.exports = ruteador;
