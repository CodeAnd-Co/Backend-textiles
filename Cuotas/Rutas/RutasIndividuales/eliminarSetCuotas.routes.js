const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/cuota/ctrl/eliminarSetCuotas.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * RF35 - Elimina Set de Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF35
 */

/**
 * @swagger
 * /api/cuotas/eliminar-set-cuotas:
 *   post:
 *     summary: Elimina uno o varios sets de cuotas
 *     description: Este endpoint permite eliminar múltiples sets de cuotas dados sus IDs.
 *     tags: [Cuotas]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idsSetCuotas:
 *                 type: array
 *                 description: IDs de los sets de cuotas a eliminar
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Sets de cuotas eliminados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Sets de cuotas eliminados correctamente."
 *       400:
 *         description: No se proporcionaron IDs válidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Set de cuota no encontrado."
 *       500:
 *         description: Error en el servidor al intentar eliminar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al eliminar set de cuotas."
 */

ruteador.post(
  RUTAS.CUOTAS.ELIMINAR_SET_CUOTAS,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ELIMINAR_SET_CUOTAS),
  controlador.eliminarSetCuotas
);

module.exports = ruteador;
