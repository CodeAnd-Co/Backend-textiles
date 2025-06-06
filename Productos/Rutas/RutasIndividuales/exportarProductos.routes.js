//RF58 - Exportar Productos - https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF58

/**
 * @swagger
 * /api/productos/exportar:
 *   post:
 *     summary: Exporta la lista completa de empleados en formato CSV.
 *     tags:
 *       - Productos
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
 *         description: No hay productos para exportar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No hay productos para exportar.
 *       400:
 *         description: Error interno del servidor al exportar productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al exportar la lista de productos.
 */

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/pro/ctrl/exportarProductos.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

ruteador.post(
  RUTAS.PRODUCTOS.EXPORTAR_PRODUCTOS,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  validarYSanitizar,
  verificarPermisos(PERMISOS.EXPORTAR_PRODUCTOS),
  controlador.exportarProductos
);

module.exports = ruteador;
