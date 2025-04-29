const correrQuery = require('@altertex/util/ser/correrQuery');

exports.obtenerPermisos = async () => {
  const consulta = 'SELECT idPermiso AS id, nombre FROM permiso';
  return await correrQuery(consulta);
};
