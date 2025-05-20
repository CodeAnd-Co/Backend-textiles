//RF57 - Importar Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF57

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/emp/ctrl/importarEmpleados.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const validarYSanitizar = require("@altertex/util/inter/validarYSanitizar");
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');


/**
 * @swagger
 * /api/empleados/importar:
 *   post:
 *     summary: Importa múltiples empleados desde un JSON derivado de CSV.
 *     tags:
 *       - Empleados
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *         description: Clave de API
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           description: Token JWT "Bearer <token>"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - nombreCompleto
 *                 - correoElectronico
 *                 - contrasena
 *                 - numeroTelefono
 *                 - direccion
 *                 - fechaNacimiento
 *                 - genero
 *                 - estatus
 *                 - idCliente
 *                 - numeroEmergencia
 *                 - areaTrabajo
 *                 - posicion
 *                 - cantidadPuntos
 *                 - antiguedad
 *               properties:
 *                 nombreCompleto:
 *                   type: string
 *                   example: Juan Pérez
 *                 correoElectronico:
 *                   type: string
 *                   format: email
 *                   example: juan.perez@correo.com
 *                 contrasena:
 *                   type: string
 *                   example: Password123!
 *                 numeroTelefono:
 *                   type: string
 *                   example: 5512345678
 *                 direccion:
 *                   type: string
 *                   example: Av. Siempre Viva 742
 *                 fechaNacimiento:
 *                   type: string
 *                   format: date
 *                   example: 1990-05-12
 *                 genero:
 *                   type: string
 *                   example: M
 *                 estatus:
 *                   type: boolean
 *                   example: true
 *                 idCliente:
 *                   oneOf:
 *                     - type: integer
 *                     - type: array
 *                       items:
 *                         type: integer
 *                   example: 101
 *                 numeroEmergencia:
 *                   type: string
 *                   example: 5512340000
 *                 areaTrabajo:
 *                   type: string
 *                   example: Logística
 *                 posicion:
 *                   type: string
 *                   example: Analista de datos
 *                 cantidadPuntos:
 *                   type: number
 *                   example: 120.5
 *                 antiguedad:
 *                   type: string
 *                   format: date
 *                   example: 2020-01-15
 *     responses:
 *       200:
 *         description: Todos los empleados importados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Todos los empleados importados correctamente.
 *       207:
 *         description: Importación parcial con errores en algunas filas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Importación parcial con errores.
 *                 errores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fila:
 *                         oneOf:
 *                           - type: integer
 *                           - type: string
 *                         example: 3
 *                       error:
 *                         type: string
 *                         example: Correo inválido.
 *       400:
 *         description: Petición inválida, cuerpo vacío o no es un array.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se recibieron empleados.
 *       499:
 *         description: Cliente abortó la petición.
 *       500:
 *         description: Error interno del servidor.
 */

ruteador.post(
  RUTAS.EMPLEADOS.IMPORTAR_EMPLEADOS,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  validarYSanitizar,
  verificarPermisos(PERMISOS.IMPORTAR_EMPLEADOS),
  controlador.importarEmpleados
);

module.exports = ruteador;