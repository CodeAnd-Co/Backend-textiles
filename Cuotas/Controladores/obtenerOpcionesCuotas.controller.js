const repositorio = require("@altertex/cuota/repos/obtenerOpcionesCuotasRepositorio");

exports.obtenerOpcionesCuotas = async (req, res) => {
  try {
    const idCliente = req.query.idCliente;
    if (!idCliente) {
      return res.status(400).json({ mensaje: "No hay idCliente" });
    }

    const resultado = await repositorio.obtenerCuotaOpcion(idCliente);

    return res
      .status(201)
      .json({ mensaje: "Opciones producto para cuota", resultado });
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: "error obteniendo opciones", error });
  }
};
