const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/setspro/ctrl/consultarSetsProductos.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
 */

/**
 * @swagger
 * /sets-productos/consultar-lista:
 *   post:
 *     summary: Consulta la lista de sets de productos disponibles.
 *     description: Permite a un Super Administrador o Cliente consultar la lista de sets de productos registrados.
 *     tags:
 *       - Sets de Productos
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sets de productos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 setsProductos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idSetProducto:
 *                         type: string
 *                         description: ID único del set de producto.
 *                       nombre:
 *                         type: string
 *                         description: Nombre del set de producto.
 *                       descripcion:
 *                         type: string
 *                         description: Descripción del set de producto.
 *                       activo:
 *                         type: integer
 *                         description: Indica si el set de producto está activo (1) o inactivo (0).
 *       401:
 *         description: No autorizado. El token es inválido o ha expirado.
 *       403:
 *         description: No tiene permisos para consultar la lista de sets de productos.
 *       500:
 *         description: Error interno del servidor.
 */

ruteador.post(
  RUTAS.SETS_PRODUCTOS.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_SETS_PRODUCTOS),
  controlador.consultarLista
);

module.exports = ruteador;
