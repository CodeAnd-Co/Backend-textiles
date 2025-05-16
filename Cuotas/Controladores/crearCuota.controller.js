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

    let errorValidacion = null;
    try {
      errorValidacion = validarCuotaSet(cuotaSetModelo.nombre, cuotaSetModelo.productosYLimite);
    } catch (validationError) {
      console.error('Error inesperado en validarCuotaSet:', validationError);

      // Mejor manejo de errores: respuesta robusta y consistente
      return res.status(400).json({
        error: 'Error creando cuota set',
        detalle:
          validationError && validationError.message
            ? validationError.message
            : 'Error de validación desconocido',
        contexto:
          'Ocurrió un error inesperado durante la validación de los datos del set de cuotas. Por favor revisa los campos enviados o contacta a soporte.',
      });
    }

    if (errorValidacion) {
      return res.status(400).json({
        error: errorValidacion,
        contexto: 'Error al validar los datos del set de cuotas. Verifica los campos enviados.',
      });
    }

    const hoy = new Date();
    const fechaFormateada = hoy.toISOString().split('T')[0];

    cuotaSetModelo.ultimaActualizacion = fechaFormateada;
    cuotaSetModelo.idCliente = req.user.clienteSeleccionado;

    await repositorio.crearCuota(cuotaSetModelo);

    return res.status(201).json({ exito: MENSAJES.CREACION_EXITOSA });
  } catch (error) {
    console.error('Error en crearCuota:', error);
    return res.status(400).json({
      error: MENSAJES.ERROR_CREACION,
      detalle: error.message || error,
    });
  }
};
