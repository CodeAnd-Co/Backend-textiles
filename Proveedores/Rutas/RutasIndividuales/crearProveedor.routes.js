//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/prove/ctrl/crearProveedor.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/proveedores/crear:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     description: Crea un nuevo proveedor asociado al cliente seleccionado
 *     tags: [Proveedores]
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
 *               - nombre
 *               - nombreCompania
 *               - telefonoContacto
 *               - correoContacto
 *               - direccion
 *               - codigoPostal
 *               - pais
 *               - estado
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del contacto del proveedor
 *                 example: Juan Pérez
 *               nombreCompania:
 *                 type: string
 *                 description: Nombre de la compañía del proveedor
 *                 example: Textiles del Norte S.A.
 *               telefonoContacto:
 *                 type: string
 *                 description: Número telefónico de contacto
 *                 example: +52 55 1234 5678
 *               correoContacto:
 *                 type: string
 *                 description: Correo electrónico de contacto
 *                 example: juan.perez@textilesnorte.com
 *               direccion:
 *                 type: string
 *                 description: Dirección física del proveedor
 *                 example: Av. Industrial 123, Col. Centro
 *               codigoPostal:
 *                 type: string
 *                 description: Código postal de la dirección
 *                 example: 12345
 *               pais:
 *                 type: string
 *                 description: País donde se encuentra el proveedor
 *                 example: México
 *               estado:
 *                 type: number
 *                 description: Estado del proveedor (1 activo, 0 inactivo)
 *                 enum: [0, 1]
 *                 example: 1
 *     responses:
 *       200:
 *         description: Proveedor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Proveedor creado exitosamente
 *       400:
 *         description: Datos del proveedor inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Los datos del proveedor son inválidos
 *       401:
 *         description: No autorizado, token inválido o falta de permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No tiene permisos para realizar esta acción
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al crear proveedor
 *                 error:
 *                   type: string
 *                   example: Error al crear proveedor
 */

ruteador.post(
  RUTAS.PROVEEDORES.CREAR,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CREAR_PRODUCTO),
  controlador.crearProveedor
);

module.exports = ruteador;
