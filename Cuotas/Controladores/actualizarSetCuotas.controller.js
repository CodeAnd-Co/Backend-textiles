const repositorio = require('@altertex/cuota/repos/actualizarSetCuotasRepositorio');

/**
 * Controlador que gestiona la actualización de un set de cuotas.
 *
 * @param {object} req - Objeto de solicitud HTTP de Express.
 * @param {object} res - Objeto de respuesta HTTP de Express.
 * @returns {object} Respuesta JSON con el resultado de la operación.
 */
exports.actualizarSetCuotas = async (req, res) => {
  try {
    const { idCuotaSet, cambios } = req.body;

    if (!idCuotaSet || !cambios) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    await repositorio.actualizarSetCuotas(idCuotaSet, cambios);
    return res.status(200).json({ mensaje: 'Set de cuotas actualizado correctamente' });

  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};
