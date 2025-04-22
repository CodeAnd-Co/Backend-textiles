const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/cli/ctrl/consultarClientes.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

/**
 * RF12 - Consulta Lista de Clientes - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF12
 */

/**
 * @swagger
 * /api/clientes/consultar-lista:
 *   get:
 *     summary: Consultar lista de clientes asociados al usuario autenticado
 *     tags: [Clientes]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Lista de clientes obtenida exitosamente.
 *                 clientes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idCliente:
 *                         type: integer
 *                         example: 2
 *                       nombreComercial:
 *                         type: string
 *                         example: Toyota Motors México
 *                       nombreFiscal:
 *                         type: string
 *                         example: Toyota de México, S.A. de C.V.
 *                       idImagen:
 *                         type: integer
 *                         example: 1
 *                       urlImagen:
 *                         type: string
 *                         format: uri
 *                         example: https://altertex.s3.us-east-2.amazonaws.com/clientes/toyota.jpg?... (URL firmada)
 *                       tipoImagen:
 *                         type: string
 *                         example: Logo
 *                       textoAlternativo:
 *                         type: string
 *                         example: Logo de Toyota Motors México
 *       400:
 *         description: Datos inválidos o lista vacía
 *       401:
 *         description: No autorizado, token o API key inválida
 *       403:
 *         description: No tiene permisos para consultar clientes
 *       500:
 *         description: Error interno al consultar los clientes
 */

ruteador.get(
  RUTAS.CLIENTES.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_CLIENTES),
  controlador.consultarLista
);

module.exports = ruteador;
