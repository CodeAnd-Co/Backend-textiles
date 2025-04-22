//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]

const repositorio = require("@altertex/pro/repos/repositorioConsultarProductos");
const obtenerImagenFolder = require("@altertex/util/ser/obtenerImagenFolder");
const MENSAJES_PRODUCTOS = require("@altertex/util/const/mensajesProductos");

exports.consultarProductos = async (req, res) => {
  const idCliente = parseInt(req.user.clienteSeleccionado);

  try {
    const productos = await repositorio.obtenerProductos(idCliente);
    req.productos = productos;

    if (!productos || productos.length === 0) {
      return res.status(MENSAJES_PRODUCTOS.SIN_RESULTADOS.codigo).json({
        mensaje: MENSAJES_PRODUCTOS.SIN_RESULTADOS.mensaje,
      });
    }

    const folder = "productos/";

    let productosActualizados;
    try {
      productosActualizados = await obtenerImagenFolder(req, folder);
    } catch (errorImagen) {
      console.warn(
        "Error al obtener imágenes. Se asignarán por defecto:",
        errorImagen
      );
      productosActualizados = productos.map((producto) => ({
        ...producto,
        urlImagen: "/placeholder",
      }));
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
