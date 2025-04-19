const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/cuota/ctrl/crearCuota.controller");

const RUTAS = require("@altertex/util/const/rutas");
const validarYSanitizar = require("@altertex/util/inter/validarYSanitizar");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");

/**
 *
 * RF31 - Crear Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31
 *
 * @swagger
 * /api/cuotas/crear-cuota:
 *   post:
 *     summary: Crea un nuevo conjunto de cuotas (cuotaSet)
 *     tags:
 *       - Cuotas
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCliente
 *               - nombre
 *               - descripcion
 *               - periodoRenovacion
 *               - renovacionHabilitada
 *               - productosYLimite
 *               - ultimaActualizacion
 *             properties:
 *               idCliente:
 *                 type: integer
 *                 example: 102
 *               nombre:
 *                 type: string
 *                 example: "Cuota Abril"
 *               descripcion:
 *                 type: string
 *                 example: "Límites para el mes de abril"
 *               periodoRenovacion:
 *                 type: string
 *                 example: "mensual"
 *               renovacionHabilitada:
 *                 type: boolean
 *                 example: true
 *               ultimaActualizacion:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-19"
 *               productosYLimite:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - idProducto
 *                     - limite
 *                     - limiteActual
 *                   properties:
 *                     idProducto:
 *                       type: string
 *                       example: "PROD001"
 *                     limite:
 *                       type: number
 *                       example: 100
 *                     limiteActual:
 *                       type: number
 *                       example: 0
 *     responses:
 *       201:
 *         description: Cuota set creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito:
 *                   type: string
 *                   example: Cuota set creado exitosamente
 *                 resultado:
 *                   type: object
 *       400:
 *         description: Error de validación o al crear el cuota set
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error creando cuota set
 */
ruteador.post(
  RUTAS.CUOTAS.AGREGAR,
  validarYSanitizar,
  revisarApiKey(),
  controlador.crearCuota
);

module.exports = ruteador;
