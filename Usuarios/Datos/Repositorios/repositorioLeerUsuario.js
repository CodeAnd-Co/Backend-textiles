const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_USUARIOS = require('@altertex/util/const/consultasUsuarios');

/**
 * Obtiene un usuario desde la base de datos mediante su ID.
 *
 * Ejecuta una consulta SQL y retorna el primer usuario encontrado o `null` si no existe.
 *
 * @param {number|string} idUsuario - ID del usuario a buscar.
 * @returns {Promise<object|null>} El usuario encontrado o `null` si no existe.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 *
 * @see [RF03 Leer usuario](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF3)
 */
exports.obtenerUsuarioPorId = async (idUsuario) => {
  const query = CONSULTAS_USUARIOS.LEER_USUARIO;
  const resultado = await correrQuery(query, [idUsuario]);

  if (resultado.length === 0) return null;

  const usuario = {
    idUsuario: resultado[0].idUsuario,
    nombreCompleto: resultado[0].nombreCompleto,
    correoElectronico: resultado[0].correoElectronico,
    numeroTelefono: resultado[0].numeroTelefono,
    direccion: resultado[0].direccion,
    fechaNacimiento: resultado[0].fechaNacimiento,
    genero: resultado[0].genero,
    estatus: resultado[0].estatus,
    rol: resultado[0].rol,
    clientes: resultado.map((row) => ({
      idCliente: row.idCliente,
      nombreCliente: row.nombreCliente,
    })),
  };

  return usuario;
};