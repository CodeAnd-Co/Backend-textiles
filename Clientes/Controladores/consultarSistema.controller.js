const jwt = require('jsonwebtoken');
const repositorio = require('@altertex/cli/repos/repositorioObtenerCliente');
const MENSAJES_CLIENTES = require('@altertex/util/const/mensajesClientes');

/**
 * Controlador para consultar el sistema de un cliente específico.
 *
 *
 * @async
 * @function consultarSistema
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.user - Información del usuario autenticado (inyectada por middleware).
 * @param {string} req.user.correo - Correo electrónico del usuario autenticado.
 * @param {Array<string>} req.user.permisos - Permisos del usuario.
 * @param {Array<number>} req.user.clientesAsociados - Lista de IDs de clientes a los que el usuario tiene acceso.
 * @param {object} req.body - Cuerpo de la solicitud.
 * @param {string|number} req.body.idCliente - ID del cliente que se desea consultar.
 *
 * @param {object} res - Objeto de respuesta de Express.
 *
 * @returns {Response} Respuesta HTTP con estado:
 * - 200 si la consulta es exitosa y se emite un nuevo token con el cliente seleccionado.
 * - 400 si el formato del ID del cliente no es válido (idCliente no es un número).
 * - 403 si el usuario no está autorizado para consultar ese cliente (no tiene acceso al cliente).
 * - 404 si el cliente no tiene sistema asociado (no se encuentra en la base de datos).
 * - 500 si ocurre un error en el servidor al consultar el sistema.
 *
 * @throws {Error} Si ocurre un error inesperado durante la operación.
 */
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
      { expiresIn: '8h' }
    );

    res.cookie('token', nuevoToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    return res.status(MENSAJES_CLIENTES.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_CLIENTES.CONSULTA_EXITOSA.mensaje,
    });
  } catch (error) {
    console.error('Error al consultar sistema:', error);
    return res
      .status(MENSAJES_CLIENTES.ERROR_CONSULTAR_SISTEMA.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.ERROR_CONSULTAR_SISTEMA.mensaje });
  }
};
