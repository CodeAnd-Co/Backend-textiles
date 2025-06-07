const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/pro/ctrl/actualizarProducto.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /productos/actualizar:
 *   post:
 *     tags:
 *       - Productos
 *     summary: Actualizar un producto existente
 *     description: |
 *       Permite actualizar un producto existente con sus variantes, opciones e imágenes.
 *       Requiere autenticación, permisos específicos y está sujeto a límites de peticiones diarias.
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto
 *               - producto
 *               - variantes
 *               - mapaImagenes
 *             properties:
 *               idProducto:
 *                 type: string
 *                 description: ID único del producto a actualizar
 *                 example: "123"
 *               producto:
 *                 type: string
 *                 description: Objeto JSON stringificado con los datos del producto
 *                 example: '{"nombreComun":"Camiseta Básica","descripcion":"Camiseta 100% algodón","precio":25.99,"categoria":"Ropa","marca":"AlterTex"}'
 *               variantes:
 *                 type: string
 *                 description: Array JSON stringificado con las variantes del producto
 *                 example: '[{"identificador":"var1","nombreVariante":"Talla M","descripcion":"Talla mediana","opciones":{"color":"azul","talla":"M"}}]'
 *               mapaImagenes:
 *                 type: string
 *                 description: Array JSON stringificado que mapea imágenes con variantes
 *                 example: '[{"idVariante":"var1","indiceImagen":0}]'
 *               imagenProducto:
 *                 type: string
 *                 format: binary
 *                 description: Imagen principal del producto (opcional)
 *               imagenesVariante:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Imágenes de las variantes del producto (máximo 100)
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Producto actualizado exitosamente"
 *       400:
 *         description: Parámetros inválidos o error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Los parámetros proporcionados son inválidos"
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Token de acceso inválido"
 *       403:
 *         description: Permisos insuficientes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No tienes permisos para actualizar productos"
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Producto no encontrado para actualización"
 *       429:
 *         description: Límite de peticiones diarias excedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Límite de peticiones diarias excedido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error interno al actualizar el producto"
 *                 error:
 *                   type: string
 *                   example: "Descripción detallada del error"
 * 
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: X-API-Key
 *       description: API Key requerida para acceder al endpoint
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Token JWT para autenticación de usuario
 *   schemas:
 *     ProductoBase:
 *       type: object
 *       properties:
 *         nombreComun:
 *           type: string
 *           description: Nombre común del producto
 *           example: "Camiseta Básica"
 *         descripcion:
 *           type: string
 *           description: Descripción detallada del producto
 *           example: "Camiseta 100% algodón, cómoda y duradera"
 *         precio:
 *           type: number
 *           format: float
 *           description: Precio del producto
 *           example: 25.99
 *         categoria:
 *           type: string
 *           description: Categoría del producto
 *           example: "Ropa"
 *         marca:
 *           type: string
 *           description: Marca del producto
 *           example: "AlterTex"
 *     VarianteProducto:
 *       type: object
 *       properties:
 *         identificador:
 *           type: string
 *           description: Identificador único temporal de la variante
 *           example: "var1"
 *         nombreVariante:
 *           type: string
 *           description: Nombre de la variante
 *           example: "Talla M - Color Azul"
 *         descripcion:
 *           type: string
 *           description: Descripción de la variante
 *           example: "Talla mediana en color azul"
 *         opciones:
 *           type: object
 *           description: Opciones específicas de la variante
 *           example: {"color": "azul", "talla": "M"}
 *     MapaImagen:
 *       type: object
 *       properties:
 *         idVariante:
 *           type: string
 *           description: ID temporal de la variante asociada a la imagen
 *           example: "var1"
 *         indiceImagen:
 *           type: integer
 *           description: Índice de la imagen en el array de imágenes
 *           example: 0
 */


ruteador.post(
  RUTAS.PRODUCTOS.ACTUALIZAR,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  validarYSanitizar,
  verificarPermisos(PERMISOS.ACTUALIZAR_PRODUCTO),
  controlador.actualizarProducto
);

module.exports = ruteador;