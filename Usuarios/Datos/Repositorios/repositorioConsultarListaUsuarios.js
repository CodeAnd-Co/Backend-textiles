//RF02 Super Administrador Consulta Lista de Usuarios - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF2

const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_USUARIOS = require("@altertex/util/const/consultasUsuarios");

exports.consultarListaUsuarios = async () => {
  const query = CONSULTAS_USUARIOS.OBTENER_LISTA;

  try {
    const listaUsuarios = await correrQuery(query);
    return listaUsuarios;
  } catch (error) {
    console.error("Error al obtener lista de usuarios:", error);
    throw error;
  }
};
