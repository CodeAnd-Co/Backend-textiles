const queryDynamoDB = require("../../../util/services/queryDynamoDB");
const tabla = "Usuario";
const indice = "usuario-index";
const nombreLlave = "correoElectronico";

exports.obtenerUsuario = async (correo) => {
  try {
    const usuario = await queryDynamoDB(tabla, nombreLlave, correo, indice);
    return usuario[0];
  } catch {
    return "Error obteniendo usuario";
  }
};
