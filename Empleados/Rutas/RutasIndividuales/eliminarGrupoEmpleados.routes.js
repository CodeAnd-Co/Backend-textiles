//RF25 - Eliminar Grupo de Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF25

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/emp/ctrl/eliminarGrupoEmpleados.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/empleados/eliminar-grupo:
 *   delete:
 *     tags:
 *       - Empleados
 *     summary: Eliminar uno o varios grupos de empleados
 *     description: |
 *       Elimina uno o más grupos de empleados, junto con sus relaciones asociadas.
 *       Requiere autenticación por API Key y Token JWT, además de permisos específicos.
 *       **Requisito funcional:** [RF25 - Eliminar Grupo de Empleados](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF25)
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
 *               - idsGrupo
 *             properties:
 *               idsGrupo:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Lista de IDs de grupos a eliminar
 *             example:
 *               idsGrupo: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Grupos eliminados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Grupo de empleados eliminado exitosamente.
 *       400:
 *         description: Solicitud inválida (por ejemplo, sin IDs o formato incorrecto)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al eliminar grupo de empleados.
 *       500:
 *         description: Error inesperado del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error interno al procesar la eliminación.
 */

ruteador.post(
  RUTAS.EMPLEADOS.ELIMINAR_GRUPO,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ELIMINAR_GRUPO_EMPLEADOS),
  controlador.eliminarGrupoEmpleados
);

module.exports = ruteador;
