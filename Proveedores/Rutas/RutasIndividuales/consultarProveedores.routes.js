//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/prove/ctrl/consultarProveedores.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');


const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/proveedores/consultar-lista:
 *   post:
 *     summary: Consultar lista de proveedores
 *     description: Obtiene la lista de proveedores asociados al cliente seleccionado
 *     tags: [Proveedores]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {}
 *     responses:
 *       200:
 *         description: Consulta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Consulta de proveedores exitosa
 *                 listaProveedores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: Juan Pérez
 *                       nombreCompania:
 *                         type: string
 *                         example: Textiles del Norte S.A.
 *                       telefonoContacto:
 *                         type: string
 *                         example: +52 55 1234 5678
 *                       correoContacto:
 *                         type: string
 *                         example: juan.perez@textilesnorte.com
 *                       direccion:
 *                         type: string
 *                         example: Av. Industrial 123, Col. Centro
 *                       codigoPostal:
 *                         type: string
 *                         example: 12345
 *                       pais:
 *                         type: string
 *                         example: México
 *                       estado:
 *                         type: integer
 *                         example: 1
 *                       fechaCreacion:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-10-15T14:30:00Z
 *       204:
 *         description: No hay proveedores registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No hay proveedores registrados
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Los datos del proveedor son inválidos
 *       401:
 *         description: No autorizado, token inválido o falta de permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No tiene permisos para realizar esta acción
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al consultar proveedores
 */

ruteador.post(
  RUTAS.PROVEEDORES.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.CONSULTAR_PRODUCTOS),
  controlador.consultarLista
);

module.exports = ruteador;
