// RF[27] Consulta Lista de Productos
const repositorio = require("@altertex/pro/repos/repositorioConsultarProductos");
const obtenerImagenFolder = require("@altertex/util/ser/obtenerImagenFolder");
const MENSAJES_IMAGENES = require("@altertex/util/const/mensajesImagenes");
const MENSAJES_PRODUCTOS = require("@altertex/util/const/mensajesProductos");

exports.consultarProductos = async (req, res) => {
  const idCliente = parseInt(req.user.clienteSeleccionado);

  try {
    const productos = await repositorio.obtenerProductos(idCliente);

    if (!productos || productos.length === 0) {
      return res.status(MENSAJES_PRODUCTOS.SIN_RESULTADOS.codigo).json({
        mensaje: MENSAJES_PRODUCTOS.SIN_RESULTADOS.mensaje,
      });
    }

    req.productos = productos;

    const folder = "productos/";
    let productosActualizados = [];

    try {
      productosActualizados = await obtenerImagenFolder(req, folder);
    } catch (errorImagen) {
      console.error("Error al obtener imágenes:", errorImagen);

      if (errorImagen.code === "NoSuchKey" || errorImagen.code === "NotFound") {
        return res
          .status(MENSAJES_IMAGENES.IMAGEN_NO_DISPONIBLE.codigo)
          .json({ mensaje: MENSAJES_IMAGENES.IMAGEN_NO_DISPONIBLE.mensaje });
      }

      return res.status(MENSAJES_IMAGENES.ERROR_CONSULTAR_IMAGEN.codigo).json({
        mensaje: MENSAJES_IMAGENES.ERROR_CONSULTAR_IMAGEN.mensaje,
        error: errorImagen.message,
      });
    }

    return res.status(MENSAJES_PRODUCTOS.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_PRODUCTOS.CONSULTA_EXITOSA.mensaje,
      data: {
        productos: productosActualizados,
      },
    });
  } catch (error) {
    console.error("Error al consultar productos:", error);

    return res
      .status(MENSAJES_PRODUCTOS.ERROR_CONSULTAR_PRODUCTOS.codigo)
      .json({
        mensaje: MENSAJES_PRODUCTOS.ERROR_CONSULTAR_PRODUCTOS.mensaje,
        error: error.message,
      });
  }
};
