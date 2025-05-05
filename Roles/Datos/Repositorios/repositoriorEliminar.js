const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS = require('@altertex/util/const/consultasRoles');
const MENSAJES = require('@altertex/util/const/mensajesRoles');

exports.eliminarRol = async (ids) => {
  try {
    if (!Array.isArray(ids) || ids.length === 0) return;

    const placeholders = ids.map(() => '?').join(', ');
    const query = CONSULTAS.ELIMINAR_ROL.replace('__IDS__', placeholders);

    await correrQuery(query, ids);
    return;
  } catch {
    throw new Error(MENSAJES.ELIMINAR_ROL_ERROR.mensaje);
  }
};
