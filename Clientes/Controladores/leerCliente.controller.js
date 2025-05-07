const repositorio = require('@altertex/cli/repos/repositorioLeerCliente');
const obtenerImagenCliente = require('@altertex/util/ser/obtenerImagenCliente');
const MENSAJES_CLIENTES = require('@altertex/util/const/mensajesClientes');

/**
 * Lee los detalles de un cliente desde la base de datos utilizando su ID.
 *
 * Valida el parámetro `idCliente` y obtiene la información del cliente a través del repositorio.
 * Si el cliente no es encontrado o el parámetro es inválido, retorna un error.
 *
 * @param {Express.Request} req - La solicitud HTTP que contiene el `idCliente` en el cuerpo.
 * @param {Express.Response} res - La respuesta HTTP para enviar el resultado al cliente.
 * @returns {Promise<void>} Responde con el cliente encontrado o un mensaje de error.
 *
 * @see RF13 Leer cliente](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf13/)
 */
exports.leerCliente = async (req, res) => {
  const idCliente = parseInt(req.body.idCliente);

  if (isNaN(idCliente)) {
    return res
      .status(MENSAJES_CLIENTES.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.PARAMETROS_INVALIDOS.mensaje });
  }

  try {
    const cliente = await repositorio.obtenerClientePorId(idCliente);

    if (!cliente) {
      return res
        .status(MENSAJES_CLIENTES.CLIENTE_NO_ENCONTRADO.codigo)
        .json({ mensaje: MENSAJES_CLIENTES.CLIENTE_NO_ENCONTRADO.mensaje });
    }
    let imagenCliente;
    try {
      imagenCliente = await obtenerImagenCliente(cliente.urlImagen);
    } catch (errImg) {
      console.warn('Error al obtener imagen del cliente, se usará un placeholder:', errImg);
      imagenCliente = '/placeholder.png'; // URL genérica de placeholder
    }

    return res.status(MENSAJES_CLIENTES.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_CLIENTES.CONSULTA_EXITOSA.mensaje,
      cliente: {
        ...cliente,
        imagenCliente,
      },
    });
  } catch (error) {
    console.error('Error al consultar cliente:', error);
    return res
      .status(MENSAJES_CLIENTES.ERROR_CONSULTAR_CLIENTE.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.ERROR_CONSULTAR_CLIENTE.mensaje });
  }
};
