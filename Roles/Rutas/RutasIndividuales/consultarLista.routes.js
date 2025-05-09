// Importación del framework Express para crear rutas HTTP.
const express = require('express');

// Se crea una instancia del enrutador de Express para definir rutas específicas del módulo de roles.
const ruteador = express.Router();

// Importación del controlador que contiene la lógica para manejar la consulta de lista de roles.
const controlador = require('@altertex/rol/ctrl/consultarLista.controller');

// Importación de middlewares de seguridad:
// - revisarApiKey: valida la API Key.
// - autorizarToken: valida el token JWT del usuario.
// - verificarPermisos: verifica que el usuario tenga el permiso necesario para acceder al recurso.
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

// Importación de constantes que definen los permisos y las rutas de la aplicación.
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/roles/consultar-lista:
 *   post:
 *     summary: Consulta la lista de roles disponibles en el sistema.
 *     tags:
 *       - Roles
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Consulta exitosa. Devuelve la lista de roles.
 *       204:
 *         description: No se encontraron roles registrados.
 *       401:
 *         description: Token inválido o expirado.
 *       403:
 *         description: Permisos insuficientes para acceder a esta ruta.
 *       500:
 *         description: Error interno del servidor.
 */

// Se define la ruta POST para consultar la lista de roles.
// Esta ruta está protegida por tres middlewares:
// 1. Validación de API Key.
// 2. Validación del token JWT del usuario.
// 3. Verificación de que el usuario tenga el permiso "CONSULTAR_ROLES".
ruteador.post(
  RUTAS.ROLES.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_ROLES),
  controlador.consultarLista
);

// Exporta el enrutador configurado para que pueda ser usado por el enrutador principal de la aplicación.
module.exports = ruteador;
