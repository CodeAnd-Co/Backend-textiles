const correrQuery = require("@altertex/util/ser/correrQuery");
const { USUARIOS } = require("@altertex/util/const/consultasSQL");

exports.obtenerUsuario = async (correoElectronico) => {
  const query = USUARIOS.OBTENER_USUARIO;

  try {
    const usuario = await correrQuery(query, [correoElectronico]);

    if (!usuario || usuario.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    return usuario[0];
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return [];
  }
};

exports.obtenerPermisos = async (correoElectronico) => {
  const query = USUARIOS.OBTENER_PERMISOS;

  try {
    const permisos = await correrQuery(query, [correoElectronico]);
    return permisos;
  } catch (error) {
    console.error("Error al obtener permisos:", error);
    return [];
  }
};
