//RF16 - Crear Empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16]

const express = require('express');
const ruteador = express.Router();

const controlador = require('@altertex/emp/ctrl/crearEmpleado.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

/**
 * @swagger
 * /api/empleados/crear:
 *   post:
 *     summary: Crea un nuevo empleado.
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
 *                 description: Información del nuevo empleado a crear directamente en el body
 *                 required:
 *                   - idUsuario
 *                   - idCliente
 *                   - nombreCompleto
 *                   - correoElectronico
 *                   - numeroEmergencia
 *                   - areaTrabajo
 *                   - posicion
 *                   - cantidadPuntos
 *                   - antiguedad
 *                 properties:
 *                   idUsuario:
 *                     type: integer
 *                     example: 30
 *                   idCliente:
 *                     type: integer
 *                     example: 10
 *                   nombreCompleto:
 *                     type: string
 *                     example: "Carlos Pérez"
 *                   correoElectronico:
 *                     type: string
 *                     example: "cperez@google.com"
 *                   numeroEmergencia:
 *                     type: string
 *                     example: "9876543214"
 *                   areaTrabajo:
 *                     type: string
 *                     example: "Producción"
 *                   posicion:
 *                     type: string
 *                     example: "Operador"
 *                   cantidadPuntos:
 *                     type: integer
 *                     example: 0
 *                   antiguedad:
 *                     type: string
 *                     example: "2024-01-01"
 *               - type: object
 *                 properties:
 *                   empleados:
 *                     oneOf:
 *                       - type: object
 *                         description: Array único con información del empleado
 *                         required:
 *                           - idUsuario
 *                           - idCliente
 *                           - nombreCompleto
 *                           - correoElectronico
 *                           - numeroEmergencia
 *                           - areaTrabajo
 *                           - posicion
 *                           - cantidadPuntos
 *                           - antiguedad
 *                         properties:
 *                           idUsuario:
 *                             type: integer
 *                             example: 30
 *                           idCliente:
 *                             type: integer
 *                             example: 10
 *                           nombreCompleto:
 *                             type: string
 *                             example: "Carlos Pérez"
 *                           correoElectronico:
 *                             type: string
 *                             example: "cperez@google.com"
 *                           numeroEmergencia:
 *                             type: string
 *                             example: "9876543214"
 *                           areaTrabajo:
 *                             type: string
 *                             example: "Producción"
 *                           posicion:
 *                             type: string
 *                             example: "Operador"
 *                           cantidadPuntos:
 *                             type: integer
 *                             example: 0
 *                           antiguedad:
 *                             type: string
 *                             example: "2024-01-01"
 *                       - type: array
 *                         description: Array de objetos con información de empleados
 *                         items:
 *                           type: object
 *                           required:
 *                             - idUsuario
 *                             - idCliente
 *                             - nombreCompleto
 *                             - correoElectronico
 *                             - numeroEmergencia
 *                             - areaTrabajo
 *                             - posicion
 *                             - cantidadPuntos
 *                             - antiguedad
 *                           properties:
 *                             idUsuario:
 *                               type: integer
 *                               example: 30
 *                             idCliente:
 *                               type: integer
 *                               example: 10
 *                             nombreCompleto:
 *                               type: string
 *                               example: "Carlos Pérez"
 *                             correoElectronico:
 *                               type: string
 *                               example: "cperez@google.com"
 *                             numeroEmergencia:
 *                               type: string
 *                               example: "9876543214"
 *                             areaTrabajo:
 *                               type: string
 *                               example: "Producción"
 *                             posicion:
 *                               type: string
 *                               example: "Operador"
 *                             cantidadPuntos:
 *                               type: integer
 *                               example: 0
 *                             antiguedad:
 *                               type: string
 *                               example: "2024-01-01"
 *     responses:
 *       201:
 *         description: Empleado creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Empleado creado exitosamente."
 *                 datos:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Error en los datos enviados o en la creación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al crear empleado"
 *     x-codeSamples:
 *       - lang: JavaScript
 *         label: cURL
 *         source: |
 *           # Ejemplo enviando datos directamente
 *           curl -X POST "https://tu-api.com/api/empleados/crear" \
 *           -H "x-api-key: TU_API_KEY" \
 *           -H "Authorization: Bearer TU_TOKEN" \
 *           -H "Content-Type: application/json" \
 *           -d '{"idUsuario":30,"idCliente":10,"nombreCompleto":"Carlos Pérez","correoElectronico":"cperez@google.com","numeroEmergencia":"9876543214","areaTrabajo":"Producción","posicion":"Operador","cantidadPuntos":0,"antiguedad":"2024-01-01"}'
 */

ruteador.post(
  RUTAS.EMPLEADOS.CREAR,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  validarYSanitizar,
  verificarPermisos(PERMISOS.CREAR_EMPLEADO),
  controlador.crearEmpleado
);

module.exports = ruteador;
