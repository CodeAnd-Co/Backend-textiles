const express = require('express');
const ruteador = express.Router();

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const controlador = require('@altertex/pago/ctrl/actualizarTipoPago.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const revisarPermisos = require('@altertex/util/inter/verificarPermisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');

//RF[54] Actualizar Lista de Pago - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF54]

/**
 * @swagger
 * /api/pagos/actualizar:
 *   put:
 *     summary: Actualiza el estado de métodos de pago habilitados.
 *     tags:
 *       - Pagos
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
 *               cambios:
 *                 type: array
 *                 description: Lista de tipos de pago a actualizar.
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                     - metodo
 *                     - habilitado
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     metodo:
 *                       type: string
 *                       example: "tarjeta_credito"
 *                     habilitado:
 *                       type: boolean
 *                       example: true
 *     responses:
 *       200:
 *         description: Tipos de pago actualizados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Método(s) de pago actualizados correctamente."
 *                 datos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       metodo:
 *                         type: string
 *                       habilitado:
 *                         type: boolean
 *       400:
 *         description: Error en los datos enviados o en la actualización.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al actualizar los métodos de pago."
 *     x-codeSamples:
 *       - lang: JavaScript
 *         label: cURL
 *         source: |
 *           curl -X PUT "https://tu-api.com/api/pagos/tipo" \
 *           -H "x-api-key: TU_API_KEY" \
 *           -H "Authorization: Bearer TU_TOKEN" \
 *           -H "Content-Type: application/json" \
 *           -d '{"cambios":[{"id":1,"metodo":"tarjeta_credito","habilitado":true}]}'
 */
ruteador.put(
  RUTAS.PAGOS.ACTUALIZAR,
  revisarApiKey(),
  validarYSanitizar,
  autorizarToken,
  revisarPermisos(PERMISOS.ACTUALIZAR_TIPO_PAGO),
  controlador.actualizarTipoPago
);

module.exports = ruteador;
