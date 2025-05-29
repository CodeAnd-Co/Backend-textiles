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
  const idCliente = parseInt(req.user.clienteSeleccionado);
  const empleado = req.body;

  if (!empleado || typeof empleado !== 'object' || Array.isArray(empleado)) {
    return res.status(400).json({ mensaje: MENSAJES.DATOS_INCOMPLETOS.mensaje });
  }

  const errores = [];
  const {
    nombreCompleto,
    correoElectronico,
    contrasena,
    numeroTelefono,
    direccion,
    fechaNacimiento,
    genero,
    estatus,
    idRol,
    idCliente: clienteId,
    numeroEmergencia,
    areaTrabajo,
    posicion,
    cantidadPuntos,
    antiguedad,
  } = empleado;

  // Validaciones de campos requeridos
  if (
    !nombreCompleto ||
    !correoElectronico ||
    !contrasena ||
    !numeroTelefono ||
    !direccion ||
    !fechaNacimiento ||
    !genero ||
    estatus === undefined ||
    idRol === undefined ||
    !numeroEmergencia ||
    !areaTrabajo ||
    !posicion ||
    cantidadPuntos === undefined ||
    !antiguedad
  ) {
    return res.status(400).json({ mensaje: MENSAJES.DATOS_INCOMPLETOS.mensaje });
  }

  // Validaciones de longitud y formato
  if (nombreCompleto.length > 75) {
    errores.push({ campo: 'nombreCompleto', error: 'El nombre es demasiado largo' });
  }
  if (correoElectronico.length > 75) {
    errores.push({ campo: 'correoElectronico', error: 'El correo es demasiado largo' });
  }
  if (contrasena.length > 75) {
    errores.push({ campo: 'contrasena', error: 'La contraseña es demasiado larga' });
  }
  if (direccion.length > 150) {
    errores.push({ campo: 'direccion', error: 'La dirección es demasiado larga' });
  }
  if (posicion.length > 75) {
    errores.push({ campo: 'posicion', error: 'La posición es demasiado larga' });
  }
  if (areaTrabajo.length > 75) {
    errores.push({ campo: 'areaTrabajo', error: 'El área de trabajo es demasiado larga' });
  }
  if (genero.length > 20) {
    errores.push({ campo: 'genero', error: 'El género es demasiado largo' });
  }

  // Validación de estatus nulo
  if (estatus == null) {
    errores.push({ campo: 'estatus', error: 'Estatus inválido: debe ser 0 o 1' });
  }

  // Validación de idCliente (no debe venir en el body)
  if (typeof clienteId !== 'undefined' && clienteId !== '' && clienteId !== null) {
    errores.push({ campo: 'idCliente', error: 'El cliente no debe ser incluido en el archivo' });
  }

  // Validación de número de emergencia (numérico)
  if (isNaN(numeroEmergencia)) {
    errores.push({ campo: 'numeroEmergencia', error: 'El número de emergencia no es válido' });
  }

  // Validación de correo electrónico válido
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoValido.test(correoElectronico)) {
    errores.push({ campo: 'correoElectronico', error: 'El correo electrónico no es válido' });
  }

  // Validación de contraseña fuerte
  const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
  const tieneMayuscula = /[A-Z]/;
  if (
    contrasena.length < 8 ||
    !tieneCaracterEspecial.test(contrasena) ||
    !tieneMayuscula.test(contrasena)
  ) {
    errores.push({
      campo: 'contrasena',
      error:
        'La contraseña es débil. Debe tener al menos 8 caracteres, una mayúscula y un caracter especial.',
    });
  }

  // Validación de teléfono válido
  const telefonoValido = /^\d{10}$/;
  if (!telefonoValido.test(numeroTelefono)) {
    errores.push({
      campo: 'numeroTelefono',
      error: 'El número de teléfono debe tener 10 dígitos numéricos',
    });
  }

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  try {
    // Encriptar la contraseña antes de guardarla
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
    empleado.contrasena = contrasenaEncriptada;

    // Crear el empleado usando el repositorio
    const nuevoEmpleado = await repositorio.crearEmpleado(empleado, idCliente);
    return res.status(201).json(nuevoEmpleado);
  } catch (error) {
    console.error('Error al crear el empleado:', error);
    return res.status(500).json({ mensaje: MENSAJES.ERROR_CREAR.mensaje });
  }
};
