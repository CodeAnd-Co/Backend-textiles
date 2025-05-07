// RF21 - Crear Grupo de Empleados
// https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF21

/**
 * @file crearGrupoEmpleados.routes.js
 * @description
 * Define la ruta para crear un grupo de empleados.
 * Aplica middlewares de validación, autenticación y autorización antes de delegar al controlador.
 */

// Importaciones
const express = require('express');
const ruteador = express.Router();

const controlador = require('@altertex/emp/ctrl/crearGrupoEmpleados.controller');

const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /empleados/crearGrupo:
 *   post:
 *     summary: Crear un grupo de empleados.
 *     description: Crea un nuevo grupo de empleados y asigna empleados a ese grupo.
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
 *               nombreGrupo:
 *                 type: string
 *                 example: "Grupo de Ventas"
 *               descripcion:
 *                 type: string
 *                 example: "Grupo encargado de las ventas del mes de enero"
 *               idCliente:
 *                 type: integer
 *                 example: 123
 *               listaEmpleados:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: Grupo de empleados creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Grupo de empleados creado exitosamente."
 *                 idGrupo:
 *                   type: integer
 *                   example: 456
 *       400:
 *         description: Datos incompletos o inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Faltan datos requeridos: nombre del grupo o lista de empleados."
 *       500:
 *         description: Error interno al crear el grupo de empleados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Ocurrió un error al crear el grupo de empleados."
 */

// Ruta para crear grupo de empleados
ruteador.post(
  RUTAS.EMPLEADOS.CREAR_GRUPO,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CREAR_GRUPO_EMPLEADOS),
  controlador.crearGrupoEmpleados
);

// Exportación del ruteador
module.exports = ruteador;