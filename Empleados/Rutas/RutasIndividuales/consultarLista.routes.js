const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/emp/ctrl/consultarLista.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

/**
 * RF17 - Consulta Lista de Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
 */

/**
 * @swagger
 * /api/empleados/consultar-lista:
 *   post:
 *     summary: Consulta la lista de grupos de empleados de un cliente
 *     description: |
 *       Este endpoint permite consultar los grupos de empleados asociados a un cliente, especificando un límite
 *       y un offset para la paginación de resultados.
 *     tags: [Empleados]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               limit:
 *                 type: integer
 *                 description: Número máximo de resultados a devolver.
 *                 example: 10
 *               offset:
 *                 type: integer
 *                 description: Número de resultados a omitir (para paginación).
 *                 example: 0
 *     responses:
 *       200:
 *         description: Consulta exitosa. Se devuelve la lista de grupos de empleados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Lista de empleados obtenida exitosamente."
 *                 grupo_empleados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idGrupo:
 *                         type: integer
 *                         example: 3
 *                       nombre:
 *                         type: string
 *                         example: "Set Calidad Toyota"
 *                       idSetProducto:
 *                         type: integer
 *                         example: 3
 *                       totalEmpleados:
 *                         type: integer
 *                         example: 1
 *       400:
 *         description: Los parámetros 'limit' o 'offset' son inválidos o faltan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Parámetros inválidos."
 *       404:
 *         description: No se encontraron resultados para la consulta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontraron resultados."
 *       500:
 *         description: Error en el servidor al intentar obtener la lista de empleados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al consultar empleados."
 */

ruteador.post(
  RUTAS.EMPLEADOS.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_GRUPOS_EMPLEADOS),
  controlador.consultarLista
);

module.exports = ruteador;
