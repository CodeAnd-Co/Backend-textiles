const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_USUARIOS = require("@altertex/util/const/consultasUsuarios");

exports.consultarListaUsuarios = async (limit, offset) => {
  const query = CONSULTAS_USUARIOS.OBTENER_LISTA;

  try {
    const listaUsuarios = await correrQuery(query, [limit, offset]);

    if (!listaUsuarios || listaUsuarios.length === 0) {
      throw new Error("No hay usuarios");
    }

    return listaUsuarios;
  } catch (error) {
    console.error("Error al obtener lista de usuarios:", error);
    return [];
  }
};
