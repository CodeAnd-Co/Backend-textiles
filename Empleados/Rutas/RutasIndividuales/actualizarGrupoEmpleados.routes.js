const express = require('express');
const ruteador = express.Router();
const RUTAS = require('@altertex/util/const/rutas');
const PERMISOS = require('@altertex/util/const/permisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const controlador = require('@altertex/emp/ctrl/actualizarGrupoEmpleado.controller');
// RF[24] Actualiza grupo empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF24]

/**
 * @swagger
 * /api/empleados/actualizar-grupos:
 *   put:
 *     summary: Actualiza un grupo de empleados
 *     description: Actualiza el nombre, la descripción, los empleados y los sets de productos asociados a un grupo de empleados existente.
 *     tags:
 *       - Grupos de Empleados
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
 *               - idGrupoEmpleado
 *               - nombre
 *               - descripcion
 *               - empleados
 *               - setsDeProductos
 *             properties:
 *               idGrupoEmpleado:
 *                 type: integer
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: "Grupo Administrativo"
 *               descripcion:
 *                 type: string
 *                 example: "Grupo para empleados administrativos"
 *               empleados:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [101, 102, 103]
 *               setsDeProductos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [201, 202]
 *     responses:
 *       200:
 *         description: Se actualizó correctamente el grupo de empleados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Se actualizo correctamente el grupo de empleados.
 *       400:
 *         description: Error de validación o datos inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             examples:
 *               Formato inválido:
 *                 value:
 *                   mensaje: No se obtuvieron los datos correctamente.
 *               Verificación de empleados fallida:
 *                 value:
 *                   mensaje: Algunos empleados no pertenecen al mismo cliente que el grupo.
 *               Verificación de sets fallida:
 *                 value:
 *                   mensaje: Algunos sets de productos no pertenecen al cliente de este grupo.
 *               Actualización fallida:
 *                 value:
 *                   mensaje: Error actualizando el grupo de empleados.
 *       403:
 *         description: No tiene permisos para realizar esta acción.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No tiene permiso para consultar grupos de empleados de este cliente.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Ocurrió un error al actualizar el grupo de empleados.
 */
ruteador.put(
  RUTAS.EMPLEADOS.ACTUALIZAR_GRUPO_EMPLEADO,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ACTUALIZAR_GRUPO_EMPLEADOS),
  validarYSanitizar,
  controlador.actualizarGrupoEmpleados
);

module.exports = ruteador;
