const repositorio = require('@altertex/cli/repos/repositorioCrearCliente');
const MENSAJES = require('@altertex/util/const/mensajesClientes');
const subirImagen = require('@altertex/util/ser/subirImagen');

/**
 * Controlador para crear un nuevo cliente.
 *
 * Este controlador realiza las siguientes validaciones y operaciones:
 * - Verifica que el nombre comercial del cliente sea válido.
 * - Verifica que el nombre fiscal del cliente sea válido.
 * - Verifica que la imagen del cliente sea válida.
 * - Valida que el nombre comercial del cliente no esté duplicado en la base de datos.
 * - Valida que el nombre fiscal del cliente no esté duplicado en la base de datos.
 * - Inserta el cliente si todas las validaciones son exitosas.
 *
 * @async
 * @function crearRol
 * @param {Express.Request} req - Objeto de solicitud HTTP. Se espera que el cuerpo (`req.body`) contenga:
 *   @param {string} req.body.cliente.nombreComercial - Nombre comercial del cliente.
 *   @param {string} req.body.cliente.nombreFiscal - Nombre fiscal del cliente.
 *   @param {number[]} req.body.cliente.imagen - Imagen del cliente.
 * @param {Express.Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Respuesta JSON con el estado de la creación del rol.
 */
exports.crearCliente = async (req, res) => {
  const { nombreComercial, nombreFiscal } = req.body;
  const imagen = req.file;

  // Validación del nombre comercial del cliente
  if (!nombreComercial || typeof nombreComercial !== 'string') {
    return res.status(400).json({ mensaje: MENSAJES.CAMPO_OBLIGATORIO.mensaje });
  }

  // Validación del nombre fiscal del cliente
  if (!nombreFiscal || typeof nombreFiscal !== 'string') {
    return res.status(400).json({ mensaje: MENSAJES.CAMPO_OBLIGATORIO.mensaje });
  }

  try {
    // Verificar si ya existe un cliente con ese nombre comercial
    const existeComercial = await repositorio.verificarNombreComercial(nombreComercial);
    if (existeComercial) {
      return res.status(400).json({ mensaje: MENSAJES.CLIENTE_COMERCIAL_EXISTENTE.mensaje });
    }

    // Verificar si ya existe un cliente con ese nombre comercial
    const existeFiscal = await repositorio.verificarNombreFiscal(nombreFiscal);
    if (existeFiscal) {
      return res.status(400).json({ mensaje: MENSAJES.CLIENTE_FISCAL_EXISTENTE.mensaje });
    }

    // Crear el cliente
    const resultadoCliente = await repositorio.crearCliente(nombreComercial, nombreFiscal);
    const resultadoVincular = await repositorio.vincularUsuarioCliente(resultadoCliente.insertId);

    if (imagen) {
      const nombreImagen = await subirImagen(imagen, 'clientes');
      const resultadoImagen = await repositorio.crearImagenCliente(
        nombreComercial,
        nombreImagen.split('/')[1]
      );
      const resultado = await repositorio.vincularImagenCliente(
        resultadoImagen.insertId,
        resultadoCliente.insertId
      );

      if (
        resultadoCliente.insertId
        && resultadoVincular.affectedRows
        && resultadoImagen.insertId
        && resultado.affectedRows === 1
      ) {
        return res.status(201).json({ mensaje: MENSAJES.CLIENTE_CREADO.mensaje });
      } else {
        return res.status(500).json({ mensaje: MENSAJES.ERROR_CREACION.mensaje });
      }
    }
  } catch {
    return res.status(500).json({ mensaje: MENSAJES.ERROR_CREACION.mensaje });
  }
};
