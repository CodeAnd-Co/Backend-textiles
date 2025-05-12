const express = require('express');
const ruteador = express.Router();
const multer = require('multer');
const RUTAS = require('@altertex/util/const/rutas');
const PERMISOS = require('@altertex/util/const/permisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const controlador = require('@altertex/cli/ctrl/actualizarClientes.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// RF14 - Actualiza Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF14
/**
 * @swagger
 * /api/clientes/actualizar-cliente:
 *   put:
 *     tags:
 *       - Clientes
 *     summary: Actualiza los datos de un cliente
 *     description: >
 *       Esta ruta permite actualizar los datos de un cliente, incluyendo su nombre legal, nombre comercial y una imagen opcional.
 *       Requiere autenticación mediante token JWT, una API key válida, y permisos específicos (ACTUALIZAR_CLIENTE).
 *     operationId: actualizarCliente
 *     security:
 *       - ApiKeyAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - idCliente
 *             properties:
 *               idCliente:
 *                 type: string
 *                 description: ID del cliente a actualizar.
 *                 example: "123"
 *               nombreLegal:
 *                 type: string
 *                 description: Nuevo nombre legal del cliente.
 *                 example: "Altertex S.A. de C.V."
 *               nombreComercial:
 *                 type: string
 *                 description: Nuevo nombre comercial del cliente.
 *                 example: "Altertex Textiles"
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: Imagen nueva del cliente (opcional).
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Cliente actualizado correctamente.
 *       400:
 *         description: Formato inválido del ID del cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: ID del cliente con formato inválido.
 *       403:
 *         description: Permisos insuficientes o token inválido
 *       500:
 *         description: Error del servidor al actualizar el cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Ocurrió un error al actualizar el cliente.
 */
ruteador.put(
  RUTAS.CLIENTES.ACTUALIZAR,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ACTUALIZAR_CLIENTE),
  validarYSanitizar,
  upload.single('imagen'),
  controlador.actualizarClientes
);

module.exports = ruteador;
