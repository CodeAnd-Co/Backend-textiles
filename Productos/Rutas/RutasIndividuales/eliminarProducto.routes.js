// RF[30] Eliminar Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30]
const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/pro/ctrl/eliminarProducto.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

/**
 * RF[30] Eliminar Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30]
 * 
 * @swagger
 * /productos/eliminar:
 *   delete:
 *     summary: Eliminar uno o varios productos
 *     tags: [Productos]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Productos eliminados exitosamente
 *       400:
 *         description: Error al eliminar los productos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
ruteador.post(
  RUTAS.PRODUCTOS.ELIMINAR_PRODUCTO,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ELIMINAR_PRODUCTO),
  controlador.eliminarProductoController 
);

module.exports = ruteador;
