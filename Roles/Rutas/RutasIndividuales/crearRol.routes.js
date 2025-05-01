const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/rol/ctrl/crearRol.controller");

const RUTAS = require("@altertex/util/const/rutas");
const validarYSanitizar = require("@altertex/util/inter/validarYSanitizar");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");

/**
 * @file crearRol.routes.js
 * @description Define la ruta para crear un nuevo rol, aplicando validaciones y seguridad.
 *
 * Esta ruta usa una serie de middlewares para garantizar:
 * - Que los datos enviados en el cuerpo de la solicitud estén validados y sanitizados.
 * - Que se incluya una API Key válida.
 * - Que el token JWT esté autorizado.
 * Finalmente, llama al controlador que maneja la lógica de creación del rol.
 */

/**
 * POST /roles/crear
 * 
 * Crea un nuevo rol con su lista de permisos. Protegida por:
 * - Validación y sanitización de datos (`validarYSanitizar`)
 * - Verificación de API Key (`revisarApiKey`)
 * - Autorización por token JWT (`autorizarToken`)
 * 
 * @name POST_Rol
 * @route {POST} /api/roles/crear
 * @middleware validarYSanitizar
 * @middleware revisarApiKey
 * @middleware autorizarToken
 * @controller crearRol
 */
ruteador.post(
    RUTAS.ROLES.CREAR_ROL,
    validarYSanitizar,
    revisarApiKey(),
    autorizarToken,
    controlador.crearRol
);

module.exports = ruteador;
