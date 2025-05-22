//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/pro/ctrl/crearProducto.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');


const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/productos/crear:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - producto
 *               - variantes
 *               - mapaImagenes
 *               - imagenProducto
 *               - imagenesVariante
 *             properties:
 *               producto:
 *                 type: string
 *                 format: json
 *                 description: Información del producto en formato JSON
 *                 example: '{"nombreComun":"Camisa casual","nombreComercial":"Camisa formal","descripcion":"Camisa de algodón","marca":"Brand","modelo":"M-123","tipoProducto":"Ropa","precioPuntos":100,"precioCliente":50.99,"precioVenta":59.99,"costo":30.00,"impuesto":16,"descuento":0,"idProveedor":1,"estado":1,"envio":1}'
 *               variantes:
 *                 type: string
 *                 format: json
 *                 description: Array de variantes del producto en formato JSON
 *                 example: '[{"identificador":"var1","nombreVariante":"Color","descripcion":"Color de la prenda","opciones":[{"valorOpcion":"Azul","cantidad":10,"descuento":0,"costoAdicional":0,"SKUautomatico":"SKU-AUTO-1","SKUcomercial":"SKU-COM-1"}]}]'
 *               mapaImagenes:
 *                 type: string
 *                 format: json
 *                 description: Mapa que relaciona imágenes con variantes en formato JSON
 *                 example: '[{"idVariante":"var1"}]'
 *               imagenProducto:
 *                 type: string
 *                 format: binary
 *                 description: Imagen principal del producto
 *               imagenesVariante:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Imágenes asociadas a cada variante del producto
 *     responses:
 *       200:
 *         description: Producto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Producto creado correctamente
 *       400:
 *         description: Error en los parámetros proporcionados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Los parámetros proporcionados no son válidos
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
 *                   example: Error al crear producto
 *                 error:
 *                   type: string
 *                   example: Error al crear variante
 */

ruteador.post(
  RUTAS.PRODUCTOS.CREAR,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.CREAR_PRODUCTO),
  controlador.crearProducto
);

module.exports = ruteador;
