const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_USUARIOS = require("@altertex/util/const/consultasUsuarios");

exports.obtenerUsuarioPorId = async (idUsuario) => {
    const query = CONSULTAS_USUARIOS.LEER_USUARIO;
  
    try {
      const resultado = await correrQuery(query, [idUsuario]);
      return resultado.length > 0 ? resultado[0] : null;
    } catch (error) {
      console.error("Error al obtener el usuario por id:", error);
      throw error;
    }
};