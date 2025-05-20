const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/rol/ctrl/crearRol.controller');

const RUTAS = require('@altertex/util/const/rutas');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

/**
 * @swagger
 * /api/roles/crear:
 *   post:
 *     summary: Crear un nuevo rol en el sistema
 *     description: Crea un nuevo rol con sus permisos asociados. Solo usuarios autorizados pueden crear roles.
 *     tags:
 *       - Roles
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
 *               - nombre
 *               - descripcion
 *               - permisos
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del rol
 *                 example: "Supervisor de Producción"
 *               descripcion:
 *                 type: string
 *                 description: Descripción detallada del rol
 *                 example: "Supervisa las actividades de producción y gestiona el personal operativo"
 *               permisos:
 *                 type: array
 *                 description: Lista de IDs de permisos asignados al rol
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3, 4]
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Rol creado exitosamente"
 *                 rol:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: "Supervisor de Producción"
 *                     descripcion:
 *                       type: string
 *                       example: "Supervisa las actividades de producción y gestiona el personal operativo"
 *                     permisos:
 *                       type: array
 *                       items:
 *                         type: integer
 *                       example: [1, 2, 3, 4]
 *       400:
 *         description: Error en los datos proporcionados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Datos inválidos para crear el rol"
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No autorizado"
 *       403:
 *         description: Forbidden - No tiene permisos suficientes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No tiene permisos para crear roles"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al crear el rol"
 */

ruteador.post(
  RUTAS.ROLES.CREAR_ROL,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  controlador.crearRol
);

module.exports = ruteador;
