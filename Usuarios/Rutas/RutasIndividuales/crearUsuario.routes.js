const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/usu/ctrl/crearUsuario.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

/**
 * RF1 - Crear Usuario - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF1
 */

/**
 * @swagger
 * /api/usuarios/crear:
 *   post:
 *     summary: Crea un nuevo usuario en el sistema.
 *     tags:
 *       - Usuarios
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
 *               - nombreCompleto
 *               - correoElectronico
 *               - contrasenia
 *               - numeroTelefono
 *               - direccion
 *               - fechaNacimiento
 *               - genero
 *               - estatus
 *               - idRol
 *               - idCliente
 *             properties:
 *               nombreCompleto:
 *                 type: string
 *                 example: Juan Pérez
 *               correoElectronico:
 *                 type: string
 *                 format: email
 *                 example: juan.perez@example.com
 *               contrasenia:
 *                 type: string
 *                 example: Segura$123
 *               numeroTelefono:
 *                 type: string
 *                 example: "5551234567"
 *               direccion:
 *                 type: string
 *                 example: Av. Central 123, CDMX
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: 1990-05-20
 *               genero:
 *                 type: string
 *                 enum: [Hombre, Mujer, Otro]
 *               estatus:
 *                 type: integer
 *                 example: 1
 *               idRol:
 *                 type: integer
 *                 example: 2
 *               idCliente:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario creado correctamente.
 *       400:
 *         description: Error de validación o entrada sospechosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Entrada sospechosa en el campo "correoElectronico".
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Permisos insuficientes.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al crear usuario.
 */

ruteador.post(
  RUTAS.USUARIOS.CREAR,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.CREAR_USUARIO),
  controlador.crearUsuario
);

module.exports = ruteador;
