const { validarCuotaSet } = require("@altertex/cuota/ctrl/validarCuotaSet");
const repositorio = require("@altertex/cuota/repos/crearCuotaRepositorio");

exports.crearCuota = async (req, res) => {
  const cuotaSetModelo = req.body;
  try {
    validarCuotaSet(cuotaSetModelo.nombre, cuotaSetModelo.productosYLimite);

    const hoy = new Date();
    const fechaFormateada = now.toISOString().split("T")[0];
    cuotaSetModelo.fechaCreacion = fechaFormateada;

    const resultado = await repositorio.crearCuota(cuotaSetModelo);

    return res
      .status(201)
      .json({ mensaje: "Cuota set creado exitosamente", resultado });
  } catch {
    return res.status(400).json({ mensaje: "Error creando cuota set" });
  }
};
