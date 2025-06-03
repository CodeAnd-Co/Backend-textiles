const express = require('express');
const ruteador = express.Router();
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');

const controlador = require('@altertex/setspro/ctrl/crearSetsProductos.controller');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/sets-productos/crear:
 *   post:
 *     summary: Crea un nuevo set de productos para un cliente autenticado.
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
 *               nuevoSetsProductos:
 *                 type: object
 *                 required:
 *                   - nombre
 *                   - nombreVisible
 *                   - descripcion
 *                   - activo
 *                   - idProductos
 *                 properties:
 *                   nombre:
 *                     type: string
 *                     example: "combo-verano"
 *                   nombreVisible:
 *                     type: string
 *                     example: "Combo de Verano"
 *                   descripcion:
 *                     type: string
 *                     example: "Incluye productos para la temporada de verano"
 *                   activo:
 *                     type: boolean
 *                     example: true
 *                   idProductos:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: Set de productos creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Set de productos creado correctamente."
 *       400:
 *         description: Datos inválidos o faltantes en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Los datos enviados son inválidos."
 *       401:
 *         description: Token de autenticación no válido o ausente.
 *       403:
 *         description: Permisos insuficientes para crear sets de productos.
 *       429:
 *         description: Límite diario de peticiones alcanzado.
 *       500:
 *         description: Error interno del servidor al crear el set de productos.
 */
ruteador.post(RUTAS.SETS_PRODUCTOS.CREAR, validarYSanitizar, revisarApiKey(), autorizarToken, limitePeticionesDiarias, verificarPermisos(PERMISOS.CREAR_SET_PRODUCTOS), controlador.crearSetsProductos);

module.exports = ruteador;