const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/cuota/ctrl/consultarListasCuotas.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

/**
 * RF32 - Consulta Lista de Sets de Cuotas
 */

/**
 * @swagger
 * /api/cuotas/consultar-lista:
 *   post:
 *     summary: Consulta la lista de sets de cuotas del cliente autenticado
 *     tags: [Cuotas]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Consulta exitosa.
 *       204:
 *         description: No se encontraron resultados.
 *       400:
 *         description: Faltan parámetros.
 *       500:
 *         description: Error interno del servidor.
 */
ruteador.post(
  RUTAS.CUOTAS.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_CUOTAS),
  controlador.consultarLista
);

module.exports = ruteador;