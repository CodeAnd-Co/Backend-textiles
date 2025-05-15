const { validarCuotaSet } = require('@altertex/cuota/ctrl/validarCuotaSet');
const repositorio = require('@altertex/cuota/repos/crearCuotaRepositorio');
const MENSAJES = require('@altertex/util/const/mensajesCuotas');

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
 * @param {Express.Request} req - Objeto de solicitud HTTP
 * @param {Express.Response} res - Objeto de respuesta HTTP
 *
 * @returns {Response} Respuesta HTTP con estado 201 si fue exitoso o 400 si falló
 */
exports.crearCuota = async (req, res) => {
  const cuotaSetModelo = req.body;

  try {
    if (!cuotaSetModelo || typeof cuotaSetModelo !== 'object') {
      return res.status(400).json({ error: MENSAJES.FORMATO_INVALIDO });
    }

    if (!cuotaSetModelo.nombre || cuotaSetModelo.nombre.trim() === '') {
      return res.status(400).json({ error: MENSAJES.NOMBRE_OBLIGATORIO });
    }

    validarCuotaSet(cuotaSetModelo.nombre, cuotaSetModelo.productosYLimite, res);

    const hoy = new Date();
    const fechaFormateada = hoy.toISOString().split('T')[0];

    cuotaSetModelo.ultimaActualizacion = fechaFormateada;
    cuotaSetModelo.idCliente = req.user.clienteSeleccionado;

    await repositorio.crearCuota(cuotaSetModelo);

    return res.status(201).json({ exito: MENSAJES.CREACION_EXITOSA });
  } catch {
    return res.status(400).json({ error: MENSAJES.ERROR_CREACION });
  }
};
