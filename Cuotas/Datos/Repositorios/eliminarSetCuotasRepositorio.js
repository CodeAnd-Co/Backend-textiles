const db = require('@altertex/util/bd/db');
const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_CUOTAS = require('@altertex/util/const/consultasCuotas');

exports.eliminarSetCuotas = async (idSetCuotas) => {
    const conexion = db.promise();
    try{
        await conexion.beginTransaction();
        const resultadoProductosSetCuotas = await correrQuery(
            CONSULTAS_CUOTAS.ELIMINAR_CUOTA_SET_PRODUCTO,
            [idSetCuotas],
            conexion
        );

        const resultadoSetCuotas = await correrQuery(
            CONSULTAS_CUOTAS.ELIMINAR_CUOTA_SET,
            [idSetCuotas],
            conexion
        );

        if (resultadoSetCuotas.affectedRows === 0){
            throw new Error(`Set de cuotas con ID ${idSetCuotas} no encontrado`);
        }

        await conexion.commit();

        return {
            mensaje: 'Set de cuotas eliminado correctamente',
            resultadoProductosSetCuotas,
            resultadoSetCuotas,
        };
    } catch (error) {
        if (conexion) await conexion.rollback();
        console.error('Error durante la transacción de eliminarSetCuotas:', error.message);
        throw new Error('Error eliminando set de cuotas');
    }
};