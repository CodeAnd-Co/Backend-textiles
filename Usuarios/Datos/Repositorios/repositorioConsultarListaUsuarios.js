const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_USUARIOS = require("@altertex/util/const/consultasUsuarios");

/**
 * Consulta la lista de usuarios en la base de datos.
 * RF02 - Super Administrador Consulta Lista de Usuarios -
 * https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF2
 *
 * @async
 * @function consultarListaUsuarios
 *
 * @returns {Promise<Object[]>} Arreglo de objetos con los datos de los usuarios.
 * Cada objeto puede incluir propiedades como `id`, `nombre`, `correo`, `rol`, etc.
 *
 * @throws {Error} Si ocurre un error durante la ejecución del query a la base de datos.
 *
 * @description
 * Ejecuta una consulta SQL definida en `CONSULTAS_USUARIOS.OBTENER_LISTA` utilizando el
 * servicio `correrQuery`. Se utiliza para obtener la lista completa de usuarios registrados.
 */
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
