const repositorio = require('@altertex/cli/repos/repositorioCrearCliente');
const MENSAJES = require('@altertex/util/const/mensajesClientes');

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
 *   @param {string} req.body.nombreComercial - Nombre comercial del cliente.
 *   @param {string} req.body.nombreFiscal - Nombre fiscal del cliente.
 *   @param {number[]} req.body.imagen - Imagen del cliente.
 * @param {Express.Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Respuesta JSON con el estado de la creación del rol.
 */
exports.crearCliente = async (req, res) => {
  const { nombreComercial, nombreFiscal, imagen } = req.body;

  console.log("Body: ", req.body)
  console.log(nombreComercial, nombreFiscal, imagen)
  
  const ubiImagen = "/";

  // Validación del nombre comercial del cliente
  if (!nombreComercial || typeof nombreComercial !== 'string') {
    console.log("nombre comercial faltante")
    return res.status(400).json({ mensaje: MENSAJES.CAMPO_OBLIGATORIO });
  }

  // Validación del nombre fiscal del cliente
  if (!nombreFiscal || typeof nombreFiscal !== 'string') {
    return res.status(400).json({ mensaje: MENSAJES.CAMPO_OBLIGATORIO });
  }

  try {
    // Verificar si ya existe un cliente con ese nombre comercial
    const existeComercial = await repositorio.verificarNombreComercial(nombreComercial);
    console.log("Existe comercial: ", existeComercial);
    if (existeComercial) {
      return res.status(400).json({ mensaje: MENSAJES.CLIENTE_COMERCIAL_EXISTENTE });
    }

    // Verificar si ya existe un cliente con ese nombre comercial
    const existeFiscal = await repositorio.verificarNombreFiscal(nombreFiscal);
    console.log("Existe fiscal: ", existeFiscal);
    if (existeFiscal) {
      return res.status(400).json({ mensaje: MENSAJES.CLIENTE_FISCAL_EXISTENTE });
    }

    // Crear el cliente
    const resultado = await repositorio.crearCliente(nombreComercial, nombreFiscal, imagen);
    console.log("resultado: ", resultado)
    if (resultado.insertId) {
      return res.status(201).json({ mensaje: MENSAJES.CLIENTE_CREADO });
    } else {
      return res.status(500).json({ mensaje: MENSAJES.ERROR_CREACION });
    }
  } catch (error) {
    console.error('Error en crearCliente:', error);
    return res.status(500).json({ mensaje: MENSAJES.ERROR_CREACION });
  }
};
