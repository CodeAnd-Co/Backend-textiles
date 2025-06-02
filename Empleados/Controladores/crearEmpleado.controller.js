const bcrypt = require('bcryptjs');
const MENSAJES = require('@altertex/util/const/mensajesEmpleados');
const repositorio = require('@altertex/emp/repos/repositorioCrearEmpleado');
//RF[16] Crear empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16]

/**
 * Controlador para crear un nuevo empleado.
 * Este endpoint recibe un objeto con la información del nuevo empleado
 * y usa su repositorio para insertar el nuevo registro en la base de datos.
 *
 * @function crearEmpleado
 * @async
 * @param {Array} req - Objeto de solicitud HTTP de Express.
 * @param {Array<object>} req.body - Cuerpo de la solicitud con los datos del nuevo empleado.
 * @param {string} req.body[].nombreCompleto - Nombre completo del usuario.
 * @param {string} req.body[].correoElectronico - Correo electrónico único del usuario.
 * @param {string} req.body[].contrasena - Contraseña en texto plano.
 * @param {string} req.body[].numeroTelefono - Número de teléfono (10 dígitos).
 * @param {string} req.body[].direccion - Dirección del usuario.
 * @param {string} req.body[].fechaNacimiento - Fecha de nacimiento en formato YYYY-MM-DD.
 * @param {string} req.body[].genero - Género del usuario.
 * @param {boolean} req.body[].estatus - Estatus activo/inactivo del usuario.
 * @param {number} req.body[].idRol - ID del rol asignado al usuario.
 * @param {number|Array<number>} req.body[].idCliente - ID(s) de cliente asociados.
 * @param {string} req.body[].numeroEmergencia - Teléfono de emergencia del empleado.
 * @param {string} req.body[].areaTrabajo - Área donde trabaja el empleado.
 * @param {string} req.body[].posicion - Puesto del empleado.
 * @param {number} req.body[].cantidadPuntos - Puntos iniciales del empleado.
 * @param {string} req.body[].antiguedad - Fecha de ingreso (YYYY-MM-DD).
 * @param {response} res - Objeto de respuesta HTTP.
 * @returns {Promise}
 *
 * - 200 si el empleado se creó correctamente.
 * - 400 si el cuerpo está vacío o no es un arreglo.
 * - 500 si ocurre un error al crear el empleado.
 */
exports.crearEmpleado = async (req, res) => {
  const [
    nombreCompleto,
    correoElectronico,
    contrasenia,
    numberoTelefono,
    direccion,
    fechaNacimiento,
    genero,
    estatus,
    idRol,
    idCliente,
    numeroEmergencia,
    areaTrabajo,
    posicion,
    cantidadPuntos,
    antiguedad,
  ] = req.body;

  if (
    !Array.isArray(req.body) ||
    req.body.length === 0 ||
    !nombreCompleto ||
    !correoElectronico ||
    !contrasenia ||
    !numberoTelefono ||
    !direccion ||
    !fechaNacimiento ||
    !genero ||
    estatus === undefined ||
    !idRol ||
    idCliente === undefined ||
    (Array.isArray(idCliente) && idCliente.length === 0) ||
    !numeroEmergencia ||
    !areaTrabajo ||
    !posicion ||
    cantidadPuntos === undefined ||
    !antiguedad
  ) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoValido.test(correoElectronico)) {
    return res
      .status(MENSAJES.CORREO_INVALIDO.codigo)
      .json({ mensaje: MENSAJES.CORREO_INVALIDO.mensaje });
  }
  const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
  const tieneMayuscula = /[A-Z]/;
  if (contrasenia.length < 8) {
    return res
      .status(MENSAJES.CONTRASENA_DEBIL.codigo)
      .json({ mensaje: MENSAJES.CONTRASENA_DEBIL.mensaje });
  }
  if (!tieneCaracterEspecial.test(contrasenia)) {
    return res
      .status(MENSAJES.CONTRASENA_DEBIL.codigo)
      .json({ mensaje: MENSAJES.CONTRASENA_DEBIL.mensaje });
  }
  if (!tieneMayuscula.test(contrasenia)) {
    return res
      .status(MENSAJES.CONTRASENA_DEBIL.codigo)
      .json({ mensaje: MENSAJES.CONTRASENA_DEBIL.mensaje });
  }

  const telefonoValido = /^\d{10}$/;
  if (!telefonoValido.test(numberoTelefono)) {
    return res
      .status(MENSAJES.TELEFONO_INVALIDO.codigo)
      .json({ mensaje: MENSAJES.TELEFONO_INVALIDO.mensaje });
  }

  try {
    const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);
    const resultado = await repositorio.crearEmpleado(
      nombreCompleto,
      correoElectronico,
      contraseniaEncriptada,
      numberoTelefono,
      direccion,
      fechaNacimiento,
      genero,
      estatus,
      idRol,
      idCliente,
      numeroEmergencia,
      areaTrabajo,
      posicion,
      cantidadPuntos,
      antiguedad
    );
    return res.status(MENSAJES_EMPLEADOS.CREACION_EXITOSA.codigo).json({
      mensaje: MENSAJES.CREACION_EXITOSA.mensaje,
      datos: resultado,
    });
  } catch (error) {
    console.error('Error al crear empleado:', error);
    return res.status(MENSAJES.ERROR_CREACION.codigo).json({
      mensaje: MENSAJES.ERROR_CREACION.mensaje,
      error: error.message,
    });
  }
};
