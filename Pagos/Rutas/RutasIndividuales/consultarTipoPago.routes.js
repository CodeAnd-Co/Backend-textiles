const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/pago/ctrl/consultarTipoPago.controller');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const revisarPermisos = require('@altertex/util/inter/verificarPermisos');

//RF[52] Consulta Lista de Pago - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF52]

/**
 * @swagger
 * /api/pagos/consultar-lista:
 *   get:
 *     summary: Consulta los tipos de pago disponibles para el cliente autenticado.
 *     description: Retorna una lista de métodos de pago habilitados según el cliente seleccionado en el token.
 *     tags:
 *       - Pagos
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Consulta exitosa de métodos de pago.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Consulta exitosa."
 *                 listaTipoPagos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       metodo:
 *                         type: string
 *                         example: "tarjeta_credito"
 *                       habilitado:
 *                         type: boolean
 *                         example: true
 *       400:
 *         description: El cliente no ha sido seleccionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se ha seleccionado un cliente válido."
 *       500:
 *         description: Error interno al consultar los métodos de pago.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al consultar los métodos de pago."
 */
ruteador.get(
  RUTAS.PAGOS.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  revisarPermisos(PERMISOS.CONSULTAR_TIPOS_PAGO),
  controlador.consultarTipoPago
);

module.exports = ruteador;
