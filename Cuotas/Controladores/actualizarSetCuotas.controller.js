// actualizarSetCuotas.controller.js
const repositorio = require('@altertex/cuota/repos/actualizarSetCuotasRepositorio');

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