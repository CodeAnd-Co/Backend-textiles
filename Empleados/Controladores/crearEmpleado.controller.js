const bcrypt = require('bcryptjs');
const repositorio = require('@altertex/emp/repos/repositorioCrearEmpleado');

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
 * @param {string} req.body[].contrasenia - Contraseña en texto plano.
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
  const {
    nombreCompleto,
    correoElectronico,
    contrasenia,
    numeroTelefono,
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
  } = req.body;

  // Validaciones críticas
  if (!idCliente) {
    return res.status(400).json({ mensaje: 'Cliente no seleccionado' });
  }
  if (
    !nombreCompleto ||
    !correoElectronico ||
    !contrasenia ||
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
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  // Validaciones de formato y longitud
  if (nombreCompleto.length > 75) {
    return res.status(400).json({ mensaje: 'El nombre es demasiado largo' });
  }
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombreCompleto)) {
    return res.status(400).json({ mensaje: 'El nombre solo puede contener letras y espacios' });
  }
  if (correoElectronico.length > 75) {
    return res.status(400).json({ mensaje: 'El correo es demasiado largo' });
  }
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoValido.test(correoElectronico)) {
    return res.status(400).json({ mensaje: 'El correo electrónico no es válido' });
  }
  if (contrasenia.length > 75) {
    return res.status(400).json({ mensaje: 'La contraseña es demasiado larga' });
  }
  const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
  const tieneMayuscula = /[A-Z]/;
  if (
    contrasenia.length < 8 ||
    !tieneCaracterEspecial.test(contrasenia) ||
    !tieneMayuscula.test(contrasenia)
  ) {
    return res
      .status(400)
      .json({
        mensaje:
          'La contraseña es débil. Debe tener al menos 8 caracteres, una mayúscula y un caracter especial.',
      });
  }
  if (direccion.length > 150) {
    return res.status(400).json({ mensaje: 'La dirección es demasiado larga' });
  }
  if (posicion.length > 75) {
    return res.status(400).json({ mensaje: 'La posición es demasiado larga' });
  }
  if (areaTrabajo.length > 75) {
    return res.status(400).json({ mensaje: 'El área de trabajo es demasiado larga' });
  }
  if (genero.length > 20) {
    return res.status(400).json({ mensaje: 'El género es demasiado largo' });
  }
  if (isNaN(numeroEmergencia)) {
    return res.status(400).json({ mensaje: 'El número de emergencia no es válido' });
  }
  if (!/^\d+$/.test(String(cantidadPuntos)) || Number(cantidadPuntos) < 0) {
    return res
      .status(400)
      .json({ mensaje: 'Los puntos deben ser un número entero mayor o igual a 0' });
  }
  const telefonoValido = /^\d{10}$/;
  if (!telefonoValido.test(numeroTelefono)) {
    return res
      .status(400)
      .json({ mensaje: 'El número de teléfono debe tener 10 dígitos numéricos' });
  }
  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!fechaRegex.test(fechaNacimiento) || isNaN(Date.parse(fechaNacimiento))) {
    return res
      .status(400)
      .json({ mensaje: 'La fecha de nacimiento no tiene un formato válido (YYYY-MM-DD)' });
  }
  if (!fechaRegex.test(antiguedad) || isNaN(Date.parse(antiguedad))) {
    return res
      .status(400)
      .json({ mensaje: 'La antigüedad no tiene un formato válido (YYYY-MM-DD)' });
  }

  try {
    const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);
    const resultado = await repositorio.crearEmpleado({
      nombreCompleto,
      correoElectronico,
      contrasenia: contraseniaEncriptada,
      numeroTelefono,
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
    });
    return res.status(201).json({
      mensaje: 'Empleado creado exitosamente',
      datos: resultado,
    });
  } catch (error) {
    console.error('Error al crear empleado:', error);
    return res.status(400).json({ mensaje: error.message });
  }
};
