const { validarCuotaSet } = require("@altertex/cuota/ctrl/validarCuotaSet");
const repositorio = require("@altertex/cuota/repos/crearCuotaRepositorio");

exports.crearCuota = async (req, res) => {
  const cuotaSetModelo = req.body;
  try {
    validarCuotaSet(cuotaSetModelo.nombre, cuotaSetModelo.productosYLimite);

    const resultado = await repositorio.crearCuota(cuotaSetModelo);

    return res
      .status(201)
      .json({ mensaje: "Cuota set creado exitosamente", resultado });
  } catch {
    return res.status(400).json({ mensaje: "Error creando cuota set" });
  }
};
