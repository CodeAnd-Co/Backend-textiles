const express = require('express');
const ruteador = express.Router();

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const controlador = require('@altertex/emp/ctrl/actualizarEmpleado.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const revisarPermisos = require('@altertex/util/inter/verificarPermisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');

//RF[19] Actualizar Empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF19]

/**
 * @swagger
 * /api/empleados/actualizar:
 *   put:
 *     summary: Actualiza la información de un empleado.
 *     description: Actualiza los datos de un empleado específico en el sistema.
 *     tags:
 *       - Empleados
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
 *               cambios:
 *                 type: array
 *                 description: Información del empleado a actualizar.
 *                 items:
 *                   type: object
 *                   required:
 *                     - idEmpleado
 *                     - idUsuario
 *                     - numeroEmergencia
 *                     - areaTrabajo
 *                     - posicion
 *                     - cantidadPuntos
 *                     - antiguedad
 *                   properties:
 *                     idEmpleado:
 *                       type: integer
 *                       example: 1
 *                     idUsuario:
 *                       type: integer
 *                       example: 101
 *                     numeroEmergencia:
 *                       type: string
 *                       example: "555-1234"
 *                     areaTrabajo:
 *                       type: string
 *                       example: "Producción"
 *                     posicion:
 *                       type: string
 *                       example: "Supervisor"
 *                     cantidadPuntos:
 *                       type: integer
 *                       example: 120
 *                     antiguedad:
 *                       type: string
 *                       example: "5 años"
 *     responses:
 *       200:
 *         description: Información del empleado actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Empleado actualizado correctamente."
 *                 datos:
 *                   type: object
 *                   properties:
 *                     idEmpleado:
 *                       type: integer
 *                     idUsuario:
 *                       type: integer
 *                     numeroEmergencia:
 *                       type: string
 *                     areaTrabajo:
 *                       type: string
 *                     posicion:
 *                       type: string
 *                     cantidadPuntos:
 *                       type: integer
 *                     antiguedad:
 *                       type: string
 *       400:
 *         description: Error en los datos enviados o en la actualización.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al actualizar la información del empleado."
 *     x-codeSamples:
 *       - lang: JavaScript
 *         label: cURL
 *         source: |
 *           curl -X PUT "https://tu-api.com/api/empleados/actualizar" \
 *           -H "x-api-key: TU_API_KEY" \
 *           -H "Authorization: Bearer TU_TOKEN" \
 *           -H "Content-Type: application/json" \
 *           -d '{"cambios":[{"idEmpleado":1,"idUsuario":101,"numeroEmergencia":"555-1234","areaTrabajo":"Producción","posicion":"Supervisor","cantidadPuntos":120,"antiguedad":"5 años"}]}'
 */
ruteador.put(
  RUTAS.EMPLEADOS.ACTUALIZAR,
  revisarApiKey(),
  validarYSanitizar,
  autorizarToken,
  revisarPermisos(PERMISOS.ACTUALIZAR_EMPLEADO),
  controlador.actualizarEmpleado
);

module.exports = ruteador;
