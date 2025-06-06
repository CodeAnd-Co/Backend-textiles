/**
 * RF49 - Actualizar categoría de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF49
 */

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/cat/ctrl/actualizarCategoria.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar'); 

/**
 * @swagger
 * /api/categorias/actualizar-categoria/{idCategoria}:
 *   put:
 *     summary: Actualiza una categoría y su lista de productos.
 *     description: Requiere autenticación y permisos adecuados. Valida que no se incluyan entradas maliciosas.
 *     tags:
 *       - Categorías
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCategoria
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoria:
 *                 type: object
 *                 properties:
 *                   nombreCategoria:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   productos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         idProducto:
 *                           type: integer
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente.
 *       400:
 *         description: Datos inválidos o entrada maliciosa detectada.
 *       500:
 *         description: Error interno al actualizar la categoría.
 */
ruteador.put(
  `${RUTAS.CATEGORIAS.ACTUALIZAR}/:idCategoria`,
  validarYSanitizar, 

  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ACTUALIZAR_CATEGORIA_PRODUCTOS),
  controlador.actualizarCategoria
);

module.exports = ruteador;