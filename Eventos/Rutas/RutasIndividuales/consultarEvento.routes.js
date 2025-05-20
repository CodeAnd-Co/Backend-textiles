// RF38 - Leer Evento - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF38]
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/eve/ctrl/consultarEvento.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/eventos/consultar-evento:
 *   post:
 *     summary: Muestra la información de un evento específico.
 *     description: Obtiene los detalles completos de un evento usando su ID.
 *     tags: [Eventos]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idEvento
 *             properties:
 *               idEvento:
 *                 type: integer
 *                 example: 123
 *                 description: Identificador único del evento
 *     responses:
 *       200:
 *         description: Evento encontrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Información del evento obtenida exitosamente."
 *                 evento:
 *                   type: object
 *                   properties:
 *                     idEvento:
 *                       type: integer
 *                       example: 123
 *                     nombre:
 *                       type: string
 *                       example: "Entrega Puntual"
 *                     descripcion:
 *                       type: string
 *                       example: "Se otorgan puntos por cumplir con los tiempos de entrega en producción."
 *                     puntos:
 *                       type: integer
 *                       example: 10
 *                     multiplicador:
 *                       type: number
 *                       example: 1.5
 *                     periodoRenovacion:
 *                       type: string
 *                       example: "Mensual"
 *                     renovacion:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Evento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Evento no encontrado."
 *       500:
 *         description: Error interno del servidor al leer el evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Ocurrió un error al leer el evento."
 */
ruteador.post(
  RUTAS.EVENTOS.CONSULTAR_EVENTO,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.LEER_EVENTO),
  controlador.consultarEvento
);

module.exports = ruteador;
