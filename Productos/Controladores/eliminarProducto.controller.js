// Importación de la función que elimina productos en el repositorio de datos.
const { eliminarProductos } = require('@altertex/pro/repos/productosRepositorio');
const eliminarImagenS3 = require('@altertex/util/ser/eliminarImagenS3');


// Importación de las constantes de mensajes utilizados para respuestas del módulo de productos.
const {
  RESPUESTA_ELIMINAR_PRODUCTO_EXITOSA,
  RESPUESTA_ERROR_GENERAL,
} = require('../../Utilidades/Constantes/mensajesProductos');

/**
 * RF30 - Eliminar Producto
 * Requerimiento funcional:
 * https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30
 */

/**
 * Controlador encargado de eliminar uno o múltiples productos.
 *
 * @async
 * @function eliminarProductoController
 * @param {object} req - Objeto de solicitud HTTP (Request). Debe contener en el body un array de IDs bajo `req.body.ids`.
 * @param {object} res - Objeto de respuesta HTTP (Response).
 * @returns {Promise<void>} No retorna datos directamente; envía la respuesta HTTP al cliente.
 *
 * @description
 * Recibe un array de IDs de productos a eliminar a través del cuerpo de la solicitud (body).
 * Valida que los IDs sean un arreglo no vacío. Llama al repositorio para realizar la eliminación
 * y responde al cliente con éxito o error según corresponda.
 */
const eliminarProductoController = async (req, res) => {
  try {
    const { ids, imagenes } = req.body;

    // Validación de los IDs recibidos.
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        codigo: 400,
        mensaje: 'Debes proporcionar al menos un ID de producto para eliminar.',
      });
    }

    // Validación de las imágenes recibidas.
    if (Array.isArray(imagenes)) {
      imagenes.forEach((url) => {
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        eliminarImagenS3 ('productos/', filename);
      })
    }
    // Se realiza la eliminación de los productos.
    const resultado = await eliminarProductos(ids, imagenes);

    // Se responde dependiendo del éxito o fallo de la operación.
    if (resultado) {
      return res.status(200).json(RESPUESTA_ELIMINAR_PRODUCTO_EXITOSA);
    } else {
      return res.status(400).json(RESPUESTA_ERROR_GENERAL);
    }
  } catch (error) {
    console.error('Error en eliminarProductoController:', error);
    return res.status(500).json(RESPUESTA_ERROR_GENERAL);
  }
};

// Exporta el controlador para su uso en las rutas correspondientes.
module.exports = {
  eliminarProductoController,
};
