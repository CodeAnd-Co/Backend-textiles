const jwt = require("jsonwebtoken");
const repositorio = require("@altertex/cli/repos/repositorioObtenerCliente");
const MENSAJES_CLIENTES = require("@altertex/util/const/mensajesClientes");

exports.consultarSistema = async (req, res) => {
  const idCliente = parseInt(req.body.idCliente);
  const { correo, permisos, clientesAsociados } = req.user;

  if (isNaN(idCliente)) {
    return res
      .status(MENSAJES_CLIENTES.FORMATO_ID_CLIENTE_INVALIDO.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.FORMATO_ID_CLIENTE_INVALIDO.mensaje });
  }

  if (!clientesAsociados.includes(idCliente)) {
    return res
      .status(MENSAJES_CLIENTES.ACCESO_NO_AUTORIZADO.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.ACCESO_NO_AUTORIZADO.mensaje });
  }

  try {
    const sistema = await repositorio.obtenerCliente(idCliente);
    if (!sistema) {
      return res
        .status(MENSAJES_CLIENTES.CLIENTE_SIN_SISTEMA.codigo)
        .json({ mensaje: MENSAJES_CLIENTES.CLIENTE_SIN_SISTEMA.mensaje });
    }

    const nuevoToken = jwt.sign(
      {
        correo,
        permisos,
        clientesAsociados,
        clienteSeleccionado: idCliente,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.cookie("token", nuevoToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(MENSAJES_CLIENTES.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_CLIENTES.CONSULTA_EXITOSA.mensaje,
    });
  } catch (error) {
    console.error("Error al consultar sistema:", error);
    return res
      .status(MENSAJES_CLIENTES.ERROR_CONSULTAR_SISTEMA.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.ERROR_CONSULTAR_SISTEMA.mensaje });
  }
};
