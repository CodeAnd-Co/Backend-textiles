const { eliminarProductos } = require("../Datos/Repositorios/productosRepositorio");
const { RESPUESTA_ELIMINAR_PRODUCTO_EXITOSA, RESPUESTA_ERROR_GENERAL } = require("../../Utilidades/Constantes/mensajesProductos");

/**
 * Controlador para eliminar uno o múltiples productos, recibiendo un array de IDs.
 * Este controlador se encarga de recibir la solicitud de eliminación de productos y 
 * delegar la lógica de eliminación al repositorio.
 *
 * RF30 - Eliminar Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30]
 *
 * @async
 * @function eliminarProductoController
 * @param {object} req - Objeto de solicitud (request).
 * @param {object} res - Objeto de respuesta (response).
 *
 * @returns {void}
 */

const eliminarProductoController = async (req, res) => {
  try {
    const { ids } = req.body;

    console.log("IDs recibidos en eliminarProductoController:", ids);

    if (!Array.isArray(ids) || ids.length === 0) {
      console.log("Error: IDs no son un array o están vacíos.");
      return res.status(400).json({
        codigo: 400,
        mensaje: "Debes proporcionar al menos un ID de producto para eliminar.",
      });
    }

    const resultado = await eliminarProductos(ids);

    console.log("Resultado eliminarProductos:", resultado);

    if (resultado) {
      res.status(200).json(RESPUESTA_ELIMINAR_PRODUCTO_EXITOSA);
    } else {
      res.status(400).json(RESPUESTA_ERROR_GENERAL);
    }
  } catch (error) {
    console.error("Error en eliminarProductoController:", error);
    res.status(500).json(RESPUESTA_ERROR_GENERAL);
  }
};

module.exports = {
  eliminarProductoController,
};
