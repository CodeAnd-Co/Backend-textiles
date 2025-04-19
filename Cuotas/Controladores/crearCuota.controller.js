const { validarCuotaSet } = require("@altertex/cuota/ctrl/validarCuotaSet");
const repositorio = require("@altertex/cuota/repos/crearCuotaRepositorio");

exports.crearCuota = async (req, res) => {
  const cuotaSetModelo = req.body;
  try {
    validarCuotaSet(cuotaSetModelo.nombre, cuotaSetModelo.productosYLimite);

    const hoy = new Date(2025, 0, 19); //TODO: cambiar esto para que sea la fecha de hyo, esa fecha solo es para probar
    const fechaFormateada = hoy.toISOString().split("T")[0];
    cuotaSetModelo.ultimaActualizacion = fechaFormateada;

    const resultado = await repositorio.crearCuota(cuotaSetModelo);

    return res.status(201).json({ mensaje: "Cuota set creado exitosamente" });
  } catch {
    return res.status(400).json({ mensaje: "Error creando cuota set" });
  }
};
