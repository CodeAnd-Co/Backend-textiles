//RF27 Consulta Lista de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/pro/ctrl/actualizarProducto.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/productos/actualizar:
 *   post:
 *     summary: Actualizar un producto existente
 *     tags: [Productos]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto
 *               - producto
 *             properties:
 *               idProducto:
 *                 type: integer
 *                 description: ID del producto a actualizar
 *                 example: 123
 *               producto:
 *                 type: object
 *                 description: Información actualizada del producto
 *                 properties:
 *                   nombreComun:
 *                     type: string
 *                     example: Camisa casual actualizada
 *                   descripcion:
 *                     type: string
 *                     example: Camisa de algodón actualizada
 *                   precioCliente:
 *                     type: number
 *                     format: float
 *                     example: 55.99
 *                   estado:
 *                     type: integer
 *                     example: 1
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Producto actualizado correctamente
 *       400:
 *         description: Error en los parámetros proporcionados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Los parámetros proporcionados no son válidos
 *       401:
 *         description: No autorizado, token inválido o falta de permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No tiene permisos para realizar esta acción
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al actualizar producto
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */

ruteador.post(
  RUTAS.PRODUCTOS.ACTUALIZAR,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.ACTUALIZAR_PRODUCTO),
  controlador.actualizarProducto
);

module.exports = ruteador;
