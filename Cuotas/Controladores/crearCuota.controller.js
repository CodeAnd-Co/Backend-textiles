const { validarCuotaSet } = require("@altertex/cuota/ctrl/validarCuotaSet");
const repositorio = require("@altertex/cuota/repos/crearCuotaRepositorio");

/**
 * RF31 - Crear Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31
 *
 * Controlador para crear un nuevo conjunto de cuotas (cuotaSet) desde el frontend.
 *
 * - Valida que el cuerpo de la solicitud tenga el formato correcto
 * - Valida nombre y productos usando la función `validarCuotaSet`
 * - Agrega automáticamente la fecha de creación y el ID del cliente autenticado
 * - Llama al repositorio para persistir en la base de datos
 *
 * @function crearCuota
 * @param {import('express').Request} req - Objeto de solicitud HTTP
 * @param {import('express').Response} res - Objeto de respuesta HTTP
 *
 * @returns {Response} Respuesta HTTP con estado 201 si fue exitoso o 400 si falló
 */
exports.crearCuota = async (req, res) => {
  const cuotaSetModelo = req.body;

  try {
    // Validar que el cuerpo exista
    if (!cuotaSetModelo || typeof cuotaSetModelo !== "object") {
      return res.status(400).json({ error: "Formato de cuota set inválido" });
    }

    // Validar campos esenciales usando función externa
    validarCuotaSet(
      cuotaSetModelo.nombre,
      cuotaSetModelo.productosYLimite,
      res
    );

    // Agregar fecha actual y cliente
    const hoy = new Date();
    const fechaFormateada = hoy.toISOString().split("T")[0];

    cuotaSetModelo.ultimaActualizacion = fechaFormateada;
    cuotaSetModelo.idCliente = req.user.clienteSeleccionado;

    // Guardar en base de datos
    await repositorio.crearCuota(cuotaSetModelo);

    return res.status(201).json({ exito: "Cuota set creado exitosamente" });
  } catch (error) {
    console.error("Error en crearCuota:", error);
    return res.status(400).json({ error: "Error creando cuota set" });
  }
};
