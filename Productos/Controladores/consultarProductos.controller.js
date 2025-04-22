//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
const repositorio = require("@altertex/pro/repos/repositorioConsultarProductos");
const obtenerImagenFolder = require("@altertex/util/ser/obtenerImagenFolder");

exports.consultarProductos = async (req, res) => {
  const idCliente = parseInt(req.user.clienteSeleccionado);
  try {
    const productos = await repositorio.obtenerProductos(idCliente);
    req.productos = productos;

    const folder = "productos/";
    const productosActualizados = await obtenerImagenFolder(req, folder);

    res.status(200).json({
      message: "Consulta de productos e imágenes exitosa",
      data: {
        productosActualizados,
      },
    });
  } catch (error) {
    console.error("Error al consultar productos:", error);

    // Importante: usar return para no continuar ejecución
    return res.status(500).json({ message: "Error al obtener los productos" });
  }
};
