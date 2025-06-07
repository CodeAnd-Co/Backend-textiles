/**
 * RF[47] Consulta lista de categorías - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47
 */

/**
 * @swagger
 * /api/categorias/consultar-lista-categorias:
 *   post:
 *     summary: Consulta la lista de categorías de productos asociadas a un cliente.
 *     description: |
 *       Este endpoint permite consultar las categorías de productos disponibles para el
 *       cliente autenticado. El ID del cliente se obtiene automáticamente del token de autenticación.
 *     tags: [Categorías]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       description: No requiere body. El ID del cliente se obtiene del token de autenticación.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: {}
 *     responses:
 *       200:
 *         description: Consulta exitosa. Se devuelve la lista de categorías.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Lista de categorías obtenida exitosamente."
 *                 listaCategoria:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idCategoria:
 *                         type: integer
 *                         example: 1
 *                       nombreCategoria:
 *                         type: string
 *                         example: "Calzado"
 *                       descripcion:
 *                         type: string
 *                         example: "Zapatos, botas y accesorios."
 *                       cantidadProductos:
 *                         type: integer
 *                         example: 5
 *                       idCliente:
 *                         type: integer
 *                         example: 123
 *       204:
 *         description: No se encontraron categorías registradas para el cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontraron categorías registradas."
 *       400:
 *         description: Error en el servidor al intentar obtener la lista de categorías.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Ocurrió un error al obtener la lista de categorías."
 */

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/cat/ctrl/consultarListaCategorias.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

ruteador.post(
  RUTAS.CATEGORIAS.CONSULTAR_LISTA_CATEGORIAS,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.CONSULTAR_CATEGORIAS_PRODUCTOS),
  controlador.consultarListaCategorias
);

module.exports = ruteador;