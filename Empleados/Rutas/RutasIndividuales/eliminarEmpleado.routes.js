// RF[20] Elimina empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF20

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/emp/ctrl/eliminarEmpleado.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/empleados/eliminar:
 *   delete:
 *     summary: Eliminar uno o varios empleados.
 *     description: Elimina empleados según su ID. Requiere autenticación y permisos.
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
 *               idsEmpleado:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [3, 5, 10]
 *     responses:
 *       200:
 *         description: Empleados eliminados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Empleados eliminados correctamente.
 *       404:
 *         description: Empleados no encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se encontraron los empleados especificados.
 *       500:
 *         description: Error interno al eliminar empleados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al eliminar empleados.
 */

ruteador.delete(
  RUTAS.EMPLEADOS.ELIMINAR_EMPLEADO,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ELIMINAR_EMPLEADO),
  controlador.eliminarEmpleado
);

module.exports = ruteador;