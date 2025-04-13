const correrQuery = require("@altertex/util/ser/correrQuery");
const { USUARIOS } = require("@altertex/util/const/consultasSQL");

exports.obtenerUsuario = async (correoElectronico) => {
  const queryUsuarios = USUARIOS.OBTENER_USUARIO;
  const queryPermisos = USUARIOS.OBTENER_PERMISOS;

  try {
    const usuario = await correrQuery(queryUsuarios, [correoElectronico]);
    const resultadoPermisos = await correrQuery(queryPermisos, [
      correoElectronico,
    ]);

    if (!usuario || usuario.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    const resultado = {
      infoUsuario: usuario,
      permisos: resultadoPermisos.map(
        (objetosPermisos) => objetosPermisos.nombre
      ),
    };

    return resultado;
  } catch (error) {
    return `Error obteniendo usuario: ${error}`;
  }
};
