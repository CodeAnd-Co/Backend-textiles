const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/emp/ctrl/consultarLista.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
 */

/**
 * @swagger
 * /api/empleados/consultar-lista:
 *   post:
 *     summary: Consulta la lista de empleados de un cliente
 *     description: |
 *       Este endpoint permite obtener la lista completa de empleados registrados para un cliente específico.
 *       La consulta está protegida por API Key, token de sesión y verificación de permisos.
 *     tags: [Empleados]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Lista de empleados obtenida exitosamente."
 *                 empleados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombreCompleto:
 *                         type: string
 *                         example: "Ana Martínez"
 *                       correoElectronico:
 *                         type: string
 *                         example: "ana.martinez@example.com"
 *                       idEmpleado:
 *                         type: integer
 *                         example: 3
 *                       idUsuario:
 *                         type: integer
 *                         example: 3
 *                       idCliente:
 *                         type: integer
 *                         example: 101
 *                       numeroEmergencia:
 *                         type: string
 *                         example: "5587654321"
 *                       areaTrabajo:
 *                         type: string
 *                         example: "Ventas"
 *                       posicion:
 *                         type: string
 *                         example: "Asesor Comercial"
 *                       cantidadPuntos:
 *                         type: string
 *                         example: "28.00"
 *                       antiguedad:
 *                         type: string
 *                         format: date-time
 *                         example: "2020-06-15T05:00:00.000Z"
 *       400:
 *         description: Los parámetros enviados no son válidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Parámetros inválidos."
 *       404:
 *         description: No se encontraron empleados registrados para el cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontraron resultados."
 *       500:
 *         description: Error interno al intentar consultar la lista de empleados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al consultar empleados."
 */

ruteador.post(
  RUTAS.EMPLEADOS.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_EMPLEADOS),
  controlador.consultarLista
);

module.exports = ruteador;
