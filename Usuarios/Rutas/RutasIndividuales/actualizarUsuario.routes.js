const express = require('express');
const ruteador = express.Router();
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const controlador = require('@altertex/usu/ctrl/actualizarUsuario.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const revisarPermisos = require('@altertex/util/inter/verificarPermisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

//RF[4] Actualizar Usuario - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF4]

/**
 * @swagger
 * /api/usuarios/actualizar:
 *   put:
 *     summary: Actualiza la información de un usuario.
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
 *             oneOf:
 *               - type: object
 *                 description: Información del usuario a actualizar directamente
 *                 required:
 *                   - idUsuario
 *                   - nombreCompleto
 *                   - correoElectronico
 *                   - contrasenia
 *                   - numeroTelefono
 *                   - direccion
 *                   - fechaNacimiento
 *                   - genero
 *                   - estatus
 *                   - idRol
 *                 properties:
 *                   idUsuario:
 *                     type: integer
 *                     example: 30
 *                   nombreCompleto:
 *                     type: string
 *                     example: "Luis Hernández"
 *                   correoElectronico:
 *                     type: string
 *                     example: "lhernandez@gmail.com"
 *                   contrasenia:
 *                     type: string
 *                     example: "NuevaContraseniaSegura123"
 *                   numeroTelefono:
 *                     type: string
 *                     example: "5551234567"
 *                   direccion:
 *                     type: string
 *                     example: "Av. Revolución 123, CDMX"
 *                   fechaNacimiento:
 *                     type: string
 *                     format: date
 *                     example: "1995-06-15"
 *                   genero:
 *                     type: string
 *                     enum: [Masculino, Femenino, Otro]
 *                     example: "Masculino"
 *                   estatus:
 *                     type: boolean
 *                     example: true
 *                   idRol:
 *                     type: integer
 *                     example: 2
 *               - type: object
 *                 properties:
 *                   usuarios:
 *                     oneOf:
 *                       - type: object
 *                         required:
 *                           - idUsuario
 *                           - nombreCompleto
 *                           - correoElectronico
 *                           - contrasenia
 *                           - numeroTelefono
 *                           - direccion
 *                           - fechaNacimiento
 *                           - genero
 *                           - estatus
 *                           - idRol
 *                         properties:
 *                           idUsuario:
 *                             type: integer
 *                             example: 30
 *                           nombreCompleto:
 *                             type: string
 *                             example: "Luis Hernández"
 *                           correoElectronico:
 *                             type: string
 *                             example: "lhernandez@gmail.com"
 *                           contrasenia:
 *                             type: string
 *                             example: "NuevaContraseniaSegura123"
 *                           numeroTelefono:
 *                             type: string
 *                             example: "5551234567"
 *                           direccion:
 *                             type: string
 *                             example: "Av. Revolución 123, CDMX"
 *                           fechaNacimiento:
 *                             type: string
 *                             format: date
 *                             example: "1995-06-15"
 *                           genero:
 *                             type: string
 *                             example: "Masculino"
 *                           estatus:
 *                             type: boolean
 *                             example: true
 *                           idRol:
 *                             type: integer
 *                             example: 2
 *                       - type: array
 *                         items:
 *                           type: object
 *                           required:
 *                             - idUsuario
 *                             - nombreCompleto
 *                             - correoElectronico
 *                             - contrasenia
 *                             - numeroTelefono
 *                             - direccion
 *                             - fechaNacimiento
 *                             - genero
 *                             - estatus
 *                             - idRol
 *                           properties:
 *                             idUsuario:
 *                               type: integer
 *                               example: 30
 *                             nombreCompleto:
 *                               type: string
 *                               example: "Luis Hernández"
 *                             correoElectronico:
 *                               type: string
 *                               example: "lhernandez@gmail.com"
 *                             contrasenia:
 *                               type: string
 *                               example: "NuevaContraseniaSegura123"
 *                             numeroTelefono:
 *                               type: string
 *                               example: "5551234567"
 *                             direccion:
 *                               type: string
 *                               example: "Av. Revolución 123, CDMX"
 *                             fechaNacimiento:
 *                               type: string
 *                               format: date
 *                               example: "1995-06-15"
 *                             genero:
 *                               type: string
 *                               example: "Masculino"
 *                             estatus:
 *                               type: boolean
 *                               example: true
 *                             idRol:
 *                               type: integer
 *                               example: 2
 *     responses:
 *       200:
 *         description: Información del usuario actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Usuario actualizado con éxito."
 *                 datos:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Error en los datos enviados o en la actualización.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al actualizar el usuario."
 *     x-codeSamples:
 *       - lang: JavaScript
 *         label: cURL
 *         source: |
 *           curl -X PUT "https://tu-api.com/api/usuarios/actualizar" \
 *           -H "x-api-key: TU_API_KEY" \
 *           -H "Authorization: Bearer TU_TOKEN" \
 *           -H "Content-Type: application/json" \
 *           -d '{
 *             "idUsuario": 30,
 *             "nombreCompleto": "Luis Hernández",
 *             "correoElectronico": "lhernandez@gmail.com",
 *             "contrasenia": "NuevaContraseniaSegura123",
 *             "numeroTelefono": "5551234567",
 *             "direccion": "Av. Revolución 123, CDMX",
 *             "fechaNacimiento": "1995-06-15",
 *             "genero": "Masculino",
 *             "estatus": true,
 *             "idRol": 2
 *           }'
 */

ruteador.put(
  RUTAS.USUARIOS.ACTUALIZAR,
  revisarApiKey(),
  validarYSanitizar,
  autorizarToken,
  limitePeticionesDiarias,
  revisarPermisos(PERMISOS.ACTUALIZAR_USUARIO),
  controlador.actualizarUsuario
);

module.exports = ruteador;
