/**
 * RF13 - Consulta Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf13/
 */

/**
 * @swagger
 * /api/clientes/consultar-cliente:
 *   post:
 *     summary: Consulta la información de un cliente específico.
 *     description: |
 *       Este endpoint permite consultar los datos de un cliente por su ID. 
 *     tags: [Clientes]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idCliente:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - idCliente
 *     responses:
 *       200:
 *         description: Cliente encontrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Información del cliente obtenida exitosamente."
 *                 cliente:
 *                   type: object
 *                   properties:
 *                     idCliente:
 *                       type: integer
 *                       example: 1
 *                     nombreLegal:
 *                       type: string
 *                       example: "Toyota Motors Corporation"
 *                     nombreVisible:
 *                       type: string
 *                       example: "Toyota"
 *                     empleados:
 *                       type: integer
 *                       example: 1902
 *                     usuariosAsignados:
 *                       type: integer
 *                       example: 5
 *                     imagenCliente:
 *                       type: string
 *                       example: "https://example.com/logo-toyota.png"
 *       404:
 *         description: Cliente no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontró un cliente con el ID proporcionado."
 *       500:
 *         description: Error interno del servidor al consultar el cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Ocurrió un error al obtener los datos del cliente."
 */

const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/cli/ctrl/leerCliente.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

ruteador.post(
  RUTAS.CLIENTES.LEER,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.LEER_CLIENTE),
  controlador.leerCliente
);

module.exports = ruteador;