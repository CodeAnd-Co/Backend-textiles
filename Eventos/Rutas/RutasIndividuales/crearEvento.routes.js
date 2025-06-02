// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/eve/ctrl/crearEvento.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/eventos/crear:
 *   post:
 *     summary: Crea un nuevo evento.
 *     description: Este endpoint permite crear un nuevo evento en el sistema.
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
 *             properties:
 *               idCliente:
 *                 type: string
 *                 description: ID del cliente asociado al evento.
 *                 example: 101
 *               nombre:
 *                 type: string
 *                 description: Nombre del evento.
 *                 example: Evento de prueba
 *               descripcion:
 *                 type: string
 *                 description: Descripción del evento.
 *                 example: Este es un evento de prueba.
 *               puntos:
 *                 type: number
 *                 format: double
 *                 description: Puntos otorgados por el evento.
 *                 example: 10.5
 *               multiplicador:
 *                 type: number
 *                 format: double
 *                 description: Multiplicador de puntos del evento.
 *                 example: 1.5
 *               periodoRenovacion:
 *                 type: string
 *                 description: Periodo de renovación del evento.
 *                 example: mensual
 *               renovacion:
 *                 type: boolean
 *                 description: Indica si el evento se renueva automáticamente.
 *                 example: true
 *     responses:
 *       200:
 *         description: Evento creado exitosamente.
 *       400:
 *         description: Solicitud incorrecta.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Prohibido.
 *       404:
 *         description: No encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
ruteador.post(
  RUTAS.EVENTOS.CREAR,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.CREAR_EVENTO),
  controlador.crearEvento
);

module.exports = ruteador;
