const repositorio = require("@altertex/cli/repos/repositorioClientes");
const MENSAJES_CLIENTES = require("@altertex/util/const/mensajesClientes");

exports.consultarSistema = async (req, res) => {
  const idCliente = parseInt(req.body.idCliente);
  const usuario = req.user;

  console.log(usuario, idCliente);

  // if (isNaN(idCliente) || isNaN(idUsuario)) {
  //   return res
  //     .status(MENSAJES_CLIENTES.PARAMETROS_INVALIDOS.codigo)
  //     .json({ mensaje: MENSAJES_CLIENTES.PARAMETROS_INVALIDOS.mensaje });
  // }

  try {
    //   const tieneRelacion = await repositorio.validarRelacionUsuarioCliente(
    //     idUsuario,
    //     idCliente
    //   );
    //   if (!tieneRelacion) {
    //     return res
    //       .status(MENSAJES_CLIENTES.ACCESO_NO_AUTORIZADO.codigo)
    //       .json({ mensaje: MENSAJES_CLIENTES.ACCESO_NO_AUTORIZADO.mensaje });
    //   }
    //   // Obtener sistema
    //   const sistema = await repositorio.obtenerSistemaPorCliente(idCliente);
    //   if (!sistema) {
    //     return res
    //       .status(MENSAJES_CLIENTES.CLIENTE_SIN_SISTEMA.codigo)
    //       .json({ mensaje: MENSAJES_CLIENTES.CLIENTE_SIN_SISTEMA.mensaje });
    //   }
    //   // Guardar idCliente e idSistema en una cookie segura
    //   res.cookie(
    //     "contexto_cliente",
    //     JSON.stringify({
    //       idCliente,
    //       idSistema: sistema.id,
    //     }),
    //     {
    //       httpOnly: true,
    //       secure: true,
    //       sameSite: "Strict",
    //       maxAge: 30 * 60 * 1000, // 30 minutos
    //     }
    //   );
    //   // Respuesta exitosa
    //   return res.status(MENSAJES_CLIENTES.CONSULTA_EXITOSA.codigo).json({
    //     mensaje: MENSAJES_CLIENTES.CONSULTA_EXITOSA.mensaje,
    //     sistema,
    //   });
  } catch (error) {
    console.error("Error al consultar sistema:", error);
    return res
      .status(MENSAJES_CLIENTES.ERROR_CONSULTAR_SISTEMA.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.ERROR_CONSULTAR_SISTEMA.mensaje });
  }
};
