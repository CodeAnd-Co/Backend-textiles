//RF02 Super Administrador Consulta Lista de Usuarios - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF2

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/usu/ctrl/consultarListaUsuarios.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/usuarios/consultar-lista-usuarios:
 *   post:
 *     summary: Consulta la lista de usuarios del sistema.
 *     tags: [Usuarios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Lista de usuarios obtenida exitosamente"
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idUsuario:
 *                         type: integer
 *                         example: 123
 *                       nombre:
 *                         type: string
 *                         example: "Juan Pérez"
 *                       correo:
 *                         type: string
 *                         example: "juan.perez@example.com"
 *                       telefono:
 *                         type: string
 *                         example: "5551234567"
 *                       rol:
 *                         type: string
 *                         example: "Administrador"
 *                       estatus:
 *                         type: integer
 *                         example: 1
 *       401:
 *         description: No autorizado - Token inválido o faltante.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No autorizado"
 *       403:
 *         description: Prohibido - No tiene permisos para realizar esta acción.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No tiene permisos para consultar la lista de usuarios"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al obtener la lista de usuarios"
 */

ruteador.post(
  RUTAS.USUARIOS.CONSULTAR_LISTA_USUARIOS,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_USUARIOS),
  controlador.consultarListaUsuarios
);

module.exports = ruteador;
