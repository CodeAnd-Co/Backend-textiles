//RF[50] Elimina categoría de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF50]

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/cat/ctrl/eliminarCategoria.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/categorias/eliminar-categoria:
 *   post:
 *     summary: Eliminar categorías de productos.
 *     description: Elimina una o varias categorías de productos de la base de datos. Requiere autenticación y permisos específicos.
 *     tags:
 *       - Categorías
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
 *               idsCategoria:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Categorías eliminadas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Categorías eliminadas correctamente.
 *       404:
 *         description: Categorías no encontradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se encontraron las categorías especificadas.
 *       500:
 *         description: Error interno al eliminar las categorías.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al eliminar las categorías.
 */

ruteador.post(
  RUTAS.CATEGORIAS.ELIMINAR_CATEGORIA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ELIMINAR_CATEGORIA_PRODUCTOS),
  controlador.eliminarCategoria
);

module.exports = ruteador;
