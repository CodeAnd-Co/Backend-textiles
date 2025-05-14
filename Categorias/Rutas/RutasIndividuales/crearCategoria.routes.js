// RF[46] Crear categoria - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF46]

const express = require('express');
const ruteador = express.Router();
const RUTAS = require('@altertex/util/const/rutas');
const controlador = require('@altertex/cat/ctrl/crearCategoria.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const verificarPermiso = require('@altertex/util/inter/verificarPermisos');
const PERMISOS = require('@altertex/util/const/permisos');

/**
 * @swagger
 * /api/categorias/crear-categoria:
 *   post:
 *     summary: Crear una nueva categoría con productos asociados.
 *     description: Crea una categoría en la base de datos y asocia una lista de productos a ella. Requiere autenticación y permisos específicos.
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
 *               categoria:
 *                 type: object
 *                 required:
 *                   - nombreCategoria
 *                   - productos
 *                 properties:
 *                   nombreCategoria:
 *                     type: string
 *                     example: "Nuevas Camisas"
 *                   descripcion:
 *                     type: string
 *                     example: "Colección de camisas de temporada"
 *                   productos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         idProducto:
 *                           type: integer
 *                           example: 101
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito:
 *                   type: string
 *                   example: Categoría creada correctamente.
 *       400:
 *         description: Datos inválidos proporcionados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El nombre de la categoría o la lista de productos no son válidos.
 *       500:
 *         description: Error interno al crear la categoría.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear la categoría.
 */
ruteador.post(
  RUTAS.CATEGORIAS.CREAR_CATEGORIA,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  verificarPermiso(PERMISOS.CREAR_CATEGORIA_PRODUCTOS),
  controlador.crearCategoria
);

module.exports = ruteador;
