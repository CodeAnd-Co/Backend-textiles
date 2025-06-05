/**
 * RF[03] Leer usuario - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF3
 */

/**
 * @swagger
 * /api/usuarios/consultar-usuario:
 *   post:
 *     summary: Consulta la información de un usuario específico.
 *     tags: [Usuarios]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: integer
 *                 example: 123
 *             required:
 *               - idUsuario
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Información del usuario obtenida exitosamente."
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     idUsuario:
 *                       type: integer
 *                       example: 123
 *                     nombre:
 *                       type: string
 *                       example: "Juan Pérez"
 *                     correo:
 *                       type: string
 *                       example: "juan.perez@example.com"
 *                     telefono:
 *                       type: string
 *                       example: "5551234567"
 *                     direccion:
 *                       type: string
 *                       example: "Calle Ejemplo 123"
 *                     fechaNacimiento:
 *                       type: string
 *                       format: date
 *                       example: "1990-01-01"
 *                     genero:
 *                       type: string
 *                       example: "Masculino"
 *                     rol:
 *                       type: string
 *                       example: "Administrador"
 *                     clientes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           idCliente:
 *                             type: integer
 *                             example: 123
 *                           nombreCliente:
 *                             type: string
 *                             example: "Cliente ABC"
 *                     estatus:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontró un usuario con el ID proporcionado."
 *       400:
 *         description: Error interno del servidor al consultar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Ocurrió un error al obtener los datos del usuario."
 */

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/usu/ctrl/leerUsuario.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

ruteador.post(
  RUTAS.USUARIOS.LEER,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.LEER_USUARIO),
  controlador.leerUsuario
);

module.exports = ruteador;