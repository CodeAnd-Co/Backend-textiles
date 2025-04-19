const { validarCuotaSet } = require("@altertex/cuota/ctrl/validarCuotaSet");
const repositorio = require("@altertex/cuota/repos/crearCuotaRepositorio");

/**
 *
 * RF31 - Crear Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31
 *
 * Crea un nuevo conjunto de cuotas (cuotaSet).
 *
 * Esta función recibe los datos de un cuotaSet desde el cuerpo de la solicitud,
 * valida los datos usando `validarCuotaSet`, asigna la fecha actual como `ultimaActualizacion`,
 * y luego intenta guardar el conjunto de cuotas en la base de datos utilizando el repositorio.
 *
 * @async
 * @function crearCuota
 * @param {import("express").Request} req - Objeto de solicitud HTTP de Express.
 * @param {Object} req.body - Contiene el modelo del conjunto de cuotas (`cuotaSetModelo`) que incluye nombre y productosYLimite.
 * @param {import("express").Response} res - Objeto de respuesta HTTP de Express.
 * @returns {Promise<import("express").Response>} Respuesta HTTP con el resultado del proceso:
 * - 201 con mensaje de éxito y datos del resultado si se crea correctamente.
 * - 400 con mensaje de error si ocurre un fallo en el proceso.
 */
exports.crearCuota = async (req, res) => {
  const cuotaSetModelo = req.body;
  try {
    validarCuotaSet(
      cuotaSetModelo.nombre,
      cuotaSetModelo.productosYLimite,
      res
    );

    const hoy = new Date();
    const fechaFormateada = hoy.toISOString().split("T")[0];
    cuotaSetModelo.ultimaActualizacion = fechaFormateada;

    const resultado = await repositorio.crearCuota(cuotaSetModelo);

    return res
      .status(201)
      .json({ exito: "Cuota set creado exitosamente", resultado });
  } catch {
    return res.status(400).json({ error: "Error creando cuota set" });
  }
};
