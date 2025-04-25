//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/pro/ctrl/consultarProductos.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

/**
 * @swagger
 * /:
 *   post:
 *     summary: Consultar productos
 *     tags: [Autenticación]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: ?????
 *       content:
 *         application/json:
 *           schema:
 *             type: object

 *     responses:
 *       200:
 *         description: Consulta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Consulta de productos exitosa
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciales inválidas, no tiene el permiso necesario
 *       500:
 *         description: Error al obtener los productos
 */

ruteador.post(
  RUTAS.PRODUCTOS.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_PRODUCTOS),
  controlador.consultarProductos
);

module.exports = ruteador;
