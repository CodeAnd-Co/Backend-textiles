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
 *             oneOf:
 *               - type: object
 *                 description: Información del empleado a actualizar directamente en el body
 *                 required:
 *                   - idEmpleado
 *                   - numeroEmergencia
 *                   - areaTrabajo
 *                   - posicion
 *                   - cantidadPuntos
 *                   - antiguedad
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 50
 *                   idEmpleado:
 *                     type: integer
 *                     example: 50
 *                   idUsuario:
 *                     type: integer
 *                     example: 30
 *                   nombreCompleto:
 *                     type: string
 *                     example: "Angel Romero"
 *                   correoElectronico:
 *                     type: string
 *                     example: "aromero@google.com"
 *                   numeroEmergencia:
 *                     type: string
 *                     example: "9876543214"
 *                   areaTrabajo:
 *                     type: string
 *                     example: "Ventas"
 *                   posicion:
 *                     type: string
 *                     example: "Auxiliar"
 *                   cantidadPuntos:
 *                     type: integer
 *                     example: 2
 *                   antiguedad:
 *                     type: string
 *                     example: "2000-02-10"
 *               - type: object
 *                 properties:
 *                   cambios:
 *                     oneOf:
 *                       - type: object
 *                         description: Objeto único con información del empleado
 *                         required:
 *                           - idEmpleado
 *                           - numeroEmergencia
 *                           - areaTrabajo
 *                           - posicion
 *                           - cantidadPuntos
 *                           - antiguedad
 *                         properties:
 *                           idEmpleado:
 *                             type: integer
 *                             example: 50
 *                           idUsuario:
 *                             type: integer
 *                             example: 30
 *                           numeroEmergencia:
 *                             type: string
 *                             example: "9876543214"
 *                           areaTrabajo:
 *                             type: string
 *                             example: "Ventas"
 *                           posicion:
 *                             type: string
 *                             example: "Auxiliar"
 *                           cantidadPuntos:
 *                             type: integer
 *                             example: 2
 *                           antiguedad:
 *                             type: string
 *                             example: "2000-02-10"
 *                       - type: array
 *                         description: Array de objetos con información de empleados
 *                         items:
 *                           type: object
 *                           required:
 *                             - idEmpleado
 *                             - numeroEmergencia
 *                             - areaTrabajo
 *                             - posicion
 *                             - cantidadPuntos
 *                             - antiguedad
 *                           properties:
 *                             idEmpleado:
 *                               type: integer
 *                               example: 50
 *                             idUsuario:
 *                               type: integer
 *                               example: 30
 *                             numeroEmergencia:
 *                               type: string
 *                               example: "9876543214"
 *                             areaTrabajo:
 *                               type: string
 *                               example: "Ventas"
 *                             posicion:
 *                               type: string
 *                               example: "Auxiliar"
 *                             cantidadPuntos:
 *                               type: integer
 *                               example: 2
 *                             antiguedad:
 *                               type: string
 *                               example: "2000-02-10"
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
 *                   example: "Actualización exitosa."
 *                 datos:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Error en los datos enviados o en la actualización.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al actualizar"
 *     x-codeSamples:
 *       - lang: JavaScript
 *         label: cURL
 *         source: |
 *           # Ejemplo enviando datos directamente
 *           curl -X PUT "https://tu-api.com/api/empleados/actualizar" \
 *           -H "x-api-key: TU_API_KEY" \
 *           -H "Authorization: Bearer TU_TOKEN" \
 *           -H "Content-Type: application/json" \
 *           -d '{"id":50,"idUsuario":30,"nombreCompleto":"Angel Romero","correoElectronico":"aromero@google.com","numeroEmergencia":"9876543214","areaTrabajo":"Ventas","posicion":"Auxiliar","cantidadPuntos":2,"antiguedad":"2000-02-10","idEmpleado":50}'
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
