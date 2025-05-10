const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/emp/ctrl/leerGrupoEmpleados.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * RF[23] Lee grupo de empleados -https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF23
 */

/**
 * @swagger
 * /api/empleados/leer-grupo:
 *   post:
 *     summary: Leer grupo de empleados.
 *     description: |
 *         Obtiene información sobre un grupo de empleados basado en los parámetros proporcionados. Requiere autenticación y permisos específicos.
 *     tags: [Empleados]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Información del grupo de empleados obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Grupo de empleados obtenido correctamente.
 *                 data:
 *                   type: object
 *                   properties:
 *                     idGrupo:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: "Grupo Ventas"
 *                     descripcion:
 *                       type: string
 *                       example: "Grupo encargado de las ventas regionales"
 *                     setsProductos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           idSetProducto:
 *                             type: integer
 *                             example: 101
 *                           nombreSet:
 *                             type: string
 *                             example: "Set de Productos A"
 *                     empleados:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           idEmpleado:
 *                             type: integer
 *                             example: 201
 *                           nombre:
 *                             type: string
 *                             example: "Juan Pérez"
 *                           departamento:
 *                             type: string
 *                             example: "Ventas"
 *       400:
 *         description: Solicitud inválida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Parámetros inválidos.
 *       401:
 *         description: No autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No tienes permisos para realizar esta acción.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al obtener el grupo de empleados.
 */
ruteador.post(
  RUTAS.EMPLEADOS.LEER_GRUPO,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.LEER_GRUPO_EMPLEADOS),
  controlador.leerGrupoEmpleados
);

module.exports = ruteador;
