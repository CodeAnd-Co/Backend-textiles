// RF[56] Leer producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF56]
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/pro/ctrl/importarProductos.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/productos/importar-productos:
 *   post:
 *     summary: Importa un lote de productos con variantes y opciones desde un archivo procesado.
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - producto
 *                 - variantes
 *               properties:
 *                 producto:
 *                   type: object
 *                   properties:
 *                     idProveedor:
 *                       type: integer
 *                       nullable: true
 *                       example: 12
 *                     nombreComun:
 *                       type: string
 *                       example: Tornillo galvanizado
 *                     nombreComercial:
 *                       type: string
 *                       nullable: true
 *                       example: Tornillo FG 3/4
 *                     descripcion:
 *                       type: string
 *                       nullable: true
 *                       example: Tornillo de acero inoxidable
 *                     marca:
 *                       type: string
 *                       nullable: true
 *                       example: TRUPER
 *                     modelo:
 *                       type: string
 *                       nullable: true
 *                       example: M3X40
 *                     tipoProducto:
 *                       type: string
 *                       nullable: true
 *                       example: Ferretería
 *                     costo:
 *                       type: number
 *                       example: 3.5
 *                     precioVenta:
 *                       type: number
 *                       example: 5.0
 *                     precioCliente:
 *                       type: number
 *                       example: 4.5
 *                     precioPuntos:
 *                       type: number
 *                       example: 4.0
 *                     impuesto:
 *                       type: number
 *                       example: 0.16
 *                     descuento:
 *                       type: number
 *                       example: 0.1
 *                     estado:
 *                       type: integer
 *                       enum: [0, 1]
 *                       example: 1
 *                     envio:
 *                       type: integer
 *                       enum: [0, 1]
 *                       example: 1
 *                 variantes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required:
 *                       - nombreVariante
 *                       - opciones
 *                     properties:
 *                       nombreVariante:
 *                         type: string
 *                         example: Color
 *                       descripcion:
 *                         type: string
 *                         nullable: true
 *                         example: Variantes por color
 *                       opciones:
 *                         type: array
 *                         items:
 *                           type: object
 *                           required:
 *                             - cantidad
 *                             - valorOpcion
 *                             - SKUautomatico
 *                             - SKUcomercial
 *                             - costoAdicional
 *                             - descuento
 *                             - estado
 *                           properties:
 *                             cantidad:
 *                               type: integer
 *                               example: 10
 *                             valorOpcion:
 *                               type: string
 *                               example: Rojo
 *                             SKUautomatico:
 *                               type: string
 *                               example: SKU-AUTO-1
 *                             SKUcomercial:
 *                               type: string
 *                               example: SKU-ROJO-123
 *                             costoAdicional:
 *                               type: number
 *                               example: 0.5
 *                             descuento:
 *                               type: number
 *                               example: 10
 *                             estado:
 *                               type: integer
 *                               enum: [0, 1]
 *                               example: 1
 *     responses:
 *       200:
 *         description: Importación completada exitosamente o con errores parciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Importación completada exitosamente.
 *                 errores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fila:
 *                         type: integer
 *                         example: 3
 *                       error:
 *                         type: string
 *                         example: Producto sin variantes válidas.
 *       400:
 *         description: No se recibieron productos válidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se recibieron productos válidos.
 *       401:
 *         description: No autorizado. Token inválido o faltante.
 *       403:
 *         description: Acceso denegado por falta de permisos.
 *       500:
 *         description: Error interno del servidor.
 */

ruteador.post(
  RUTAS.PRODUCTOS.IMPORTAR,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  validarYSanitizar,
  verificarPermisos(PERMISOS.IMPORTAR_PRODUCTOS),
  controlador.importarProductos
);

module.exports = ruteador;
