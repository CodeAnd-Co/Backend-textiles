const correrQuery = require('@altertex/util/ser/correrQuery');

exports.eliminarUsuarioPorId = async (idUsuario) => {
  const query = `DELETE FROM usuario WHERE idUsuario = ?`;

  try {
    const resultado = await correrQuery(query, [idUsuario]);
    return resultado;
  } catch (error) {
    console.error('Error al eliminar usuario(s):', error);
    throw error;
  }
};

exports.eliminarUsuarios = async (listaUsuarios) => {
  // Para eliminar múltiples usuarios de forma eficiente
  const placeholders = listaUsuarios.map(() => '?').join(',');
  const query = `DELETE FROM usuario WHERE idUsuario IN (${placeholders})`;

  try {
    const resultado = await correrQuery(query, listaUsuarios);
    return resultado.affectedRows > 0;
  } catch (error) {
    console.error('Error al eliminar múltiples usuarios:', error);
    throw error;
  }
};
