//RF37 Consulta Lista de Eventos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF37]
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/eve/ctrl/consultarListaEventos.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/eventos/consultar-lista-eventos:
 *   post:
 *     summary: Obtener lista de eventos
 *     tags: [Eventos]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Lista de eventos obtenida exitosamente
 *                 lista_eventos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idEvento:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       descripcion:
 *                         type: string
 *                       puntos:
 *                         type: number
 *                       periodoRenovacion:
 *                         type: string
 *                       renovacion:
 *                         type: boolean
 *       204:
 *         description: No se encontraron eventos
 *       400:
 *         description: Parámetros inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       500:
 *         description: Error al obtener eventos
 */
ruteador.post(
  RUTAS.EVENTOS.CONSULTAR_LISTA_EVENTOS,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_EVENTO),
  controlador.consultarListaEventos
);

module.exports = ruteador;
