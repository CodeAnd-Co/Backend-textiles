const MENSAJES = require('@altertex/util/const/mensajesProductos');
const repositorio = require('@altertex/pro/repos/repositorioLeerProducto');
// RF[28] Leer producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF28]

/**
 * Controlador para leer la información de un producto específico.
 *
 * Este endpoint espera que el `idProducto` se encuentre en el cuerpo de la solicitud
 * y que el `idCliente` esté disponible en el objeto `req.user.clienteSeleccionado`.
 *
 * @async
 * @function leerProducto
 * @param {Express.Request} req - Objeto de solicitud de Express.
 * @param {object} req.body - Cuerpo de la solicitud.
 * @param {string|number} req.body.idProducto - ID del producto a consultar.
 * @param {object} req.user - Usuario autenticado con un cliente seleccionado.
 * @param {string|number} req.user.clienteSeleccionado - ID del cliente asociado.
 * @param {Express.Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Retorna una respuesta HTTP con la información del producto o un mensaje de error.
 * @throws {Error} Lanza un error si `idProducto` no es válido o si ocurre un error al consultar el repositorio.
 */
exports.leerProducto = async (req, res) => {
  const idProducto = req.query.idProducto;
  const idCliente = req.user.clienteSeleccionado;

  if (!idProducto) {
    return res.status(MENSAJES.ID_INVALIDO.codigo).json({ mensaje: MENSAJES.ID_INVALIDO.mensaje });
  }

  try {
    const infoProducto = await repositorio.leerProducto(idProducto, idCliente);
    return res.status(MENSAJES.LEER_PRODUCTO_EXITO.codigo).json({
      infoProducto,
    });
  } catch (error) {
    return res.status(MENSAJES.ERROR_LEER_PRODUCTO.codigo).json({ mensaje: error.message });
  }
};