//RF59 - Exportar Empleados- https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF59

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/emp/ctrl/exportarEmpleados.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

/**
 * @swagger
 * /api/empleados/exportar:
 *   get:
 *     summary: Exporta la lista completa de empleados en formato CSV.
 *     tags:
 *       - Empleados
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *         description: Clave de API
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT con formato "Bearer <token>"
 *     responses:
 *       200:
 *         description: Archivo CSV generado correctamente.
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       204:
 *         description: No hay empleados para exportar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No hay empleados para exportar.
 *       400:
 *         description: Clave de API inválida o ausente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: API key inválida.
 *       401:
 *         description: Usuario no autenticado o token JWT inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No autorizado.
 *       500:
 *         description: Error interno del servidor al exportar empleados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al exportar la lista de empleados.
 */

ruteador.post(
  RUTAS.EMPLEADOS.EXPORTAR_EMPLEADOS,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  validarYSanitizar,
  verificarPermisos(PERMISOS.EXPORTAR_EMPLEADOS),
  controlador.exportarEmpleados
);

module.exports = ruteador;