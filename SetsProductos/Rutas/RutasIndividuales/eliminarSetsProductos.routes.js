//RF[45] Elimina set de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF45]
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/setspro/ctrl/eliminarSetsProductos.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');


const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/sets-productos/eliminar-set:
 *   delete:
 *     summary: Eliminar sets de productos.
 *     description: Elimina uno o varios sets de productos de la base de datos. Requiere autenticación y permisos específicos.
 *     tags:
 *       - Sets de Productos
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
 *               idsSet:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [101, 102, 103]
 *     responses:
 *       200:
 *         description: Sets eliminados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sets eliminados correctamente.
 *       404:
 *         description: Sets no encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se encontraron los sets especificados.
 *       500:
 *         description: Error interno al eliminar los sets.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   example: Error al eliminar los sets.
 */

ruteador.post(
  RUTAS.SETS_PRODUCTOS.ELIMINAR_SET_PRODUCTOS,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.ELIMINAR_SET_PRODUCTOS),
  controlador.eliminarSetProductos
);

module.exports = ruteador;
