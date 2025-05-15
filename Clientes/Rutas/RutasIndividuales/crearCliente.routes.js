/**
 * RF11 - Crear Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF11
 */

/**
 * @swagger
 * /api/clientes/crear:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: body
 *         name: nombreComercial
 *         required: true
 *         schema:
 *           type: integer
 *         description: Nombre comercial del cliente que se quiere crear.
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Cliente creado.
 *       400:
 *         description: Error al validar los datos.
 *       401:
 *         description: No autorizado, token o API key inválida
 *       403:
 *         description: No tiene permisos para crear clientes
 *       500:
 *         description: Error interno al crear el cliente
 */

const express = require('express');
const ruteador = express.Router();
const multer = require('multer');
const controlador = require('@altertex/cli/ctrl/crearCliente.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const validarYSanitizarImagen = require('@altertex/util/inter/validarYSanitizarImagen');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

// Configuración de multer para manejar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // límite de 5MB
  },
});

ruteador.post(
  RUTAS.CLIENTES.CREAR_CLIENTE,
  upload.single('imagen'),
  validarYSanitizar,
  validarYSanitizarImagen(),
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CREAR_CLIENTE),
  controlador.crearCliente
);

module.exports = ruteador;
