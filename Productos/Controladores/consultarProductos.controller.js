const repositorio = require("../Datos/Repositorios/repositorioConsultarProductos");

exports.consultarProductos = async (req, res) => {
  try {
    const productos = await repositorio.obtenerProductos();
    res.status(200).json({
      message: "Consulta de productos exitosa",
      data: productos,
    });
  } catch (error) {
    console.error("Error al consultar productos:", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};
