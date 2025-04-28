// Importación del framework Express para la creación de rutas HTTP.
const express = require('express');

// Creación de una instancia del enrutador de Express.
const ruteador = express.Router();

// Importación del controlador encargado de consultar la lista de sets de cuotas.
const controlador = require('@altertex/cuota/ctrl/consultarListasCuotas.controller');

// Importación de middlewares de seguridad para validar API Key, token JWT y permisos de usuario.
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

// Importación de constantes de permisos y rutas del sistema.
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * RF32 - Consulta Lista de Sets de Cuotas
 * Documentación del requisito funcional:
 * https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF32
 */

/**
 * @swagger
 * /api/cuotas/consultar-lista:
 *   post:
 *     summary: Consulta la lista de sets de cuotas del cliente autenticado.
 *     tags:
 *       - Cuotas
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Consulta exitosa de sets de cuotas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Consulta de cuotas exitosa.
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error en la solicitud.
 *       401:
 *         description: Credenciales inválidas o token no autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales inválidas, no tiene el permiso necesario.
 *       403:
 *         description: No tiene el permiso necesario para realizar esta acción.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No tiene el permiso necesario.
 *       404:
 *         description: No se encontraron sets de cuotas para el cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se encontraron resultados.
 *       500:
 *         description: Error interno al obtener los sets de cuotas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener los sets de cuotas.
 */

// Definición de la ruta POST para consultar la lista de sets de cuotas.
// Protegida por validación de API Key, autenticación de token y verificación de permisos.
ruteador.post(
  RUTAS.CUOTAS.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_SETS_CUOTAS),
  controlador.consultarLista,
);

// Exporta el enrutador para que pueda ser utilizado por la aplicación principal.
module.exports = ruteador;