const repositorio = require('@altertex/cuota/repos/eliminarSetCuotasRepositorio');
const MENSAJES_SET_CUOTAS = require('@altertex/util/const/mensajesCuotas');

exports.eliminarSetCuotas = async(req, res) => {
    try{
        const idsSetCuotas = req.body.idsSetCuotas;

        if(!Array.isArray(idsSetCuotas) || idsSetCuotas.length === 0){
            return res.status(MENSAJES_SET_CUOTAS.SET_CUOTA_NO_ENCONTRADO.codigo).json({
                mensaje: MENSAJES_SET_CUOTAS.SET_CUOTA_NO_ENCONTRADO.mensaje,
            });
        }

        await Promise.all(
            idsSetCuotas.map(async (idSetCuota) => {
                const resultadoSetCuotas = await repositorio.eliminarSetCuotas(idSetCuota);

                if (resultadoSetCuotas.affectedRows === 0){
                    throw new Error(`Set de cuotas con ID ${idSetCuota} no encontrado`);
                }
            })
        );

        return res.status(MENSAJES_SET_CUOTAS.SET_CUOTA_ELIMINADO.codigo).json({
            mensaje: MENSAJES_SET_CUOTAS.SET_CUOTA_ELIMINADO.mensaje,
        });
    } catch (error){
        console.error('Error al eliminar set de cuota:', error);
        return res.status(MENSAJES_SET_CUOTAS.ERROR_ELIMINAR_SET_CUOTAS.codigo).json({
            mensaje: MENSAJES_SET_CUOTAS.ERROR_ELIMINAR_SET_CUOTAS.mensaje,
        });
    }
};