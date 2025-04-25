const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_USUARIOS = require("@altertex/util/const/consultasUsuarios");

exports.obtenerUsuarioPorId = async (idUsuario) => {
  const query = CONSULTAS_USUARIOS.LEER_USUARIO;

  try {
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
  } catch (error) {
    console.error("Error al obtener el usuario con id:", error);
    throw error;
  }
};