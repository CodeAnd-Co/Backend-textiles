const bcrypt = require('bcryptjs');
const repositorio = require('@altertex/emp/repos/repositorioImportarEmpleado');
const MENSAJES_USUARIOS = require('@altertex/util/const/mensajesUsuarios');

/**
 * Controlador para importar múltiples empleados con su usuario asociado.
 * 
 * Esta función valida y procesa un arreglo de objetos con la información completa
 * de usuario y empleado. Aplica validaciones de formato, unicidad de correo,
 * fortaleza de contraseña, y formato telefónico antes de delegar al repositorio.
 * 
 * Cada objeto debe incluir los datos necesarios tanto para crear el usuario como
 * para insertar al empleado en la base de datos.
 * 
 * Si alguna fila falla, se continúa con las demás y se devuelve un resumen de errores.
 *
 * @async
 * @function importarEmpleados
 * @param {Array} req - Objeto de solicitud HTTP. Espera `req.body` como un arreglo de objetos empleados.
 * @param {Array<object>} req.body - Arreglo de objetos con datos de usuario y empleado.
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
 * - 200 si todos los empleados se importaron correctamente.
 * - 207 si hubo errores parciales en una o más filas (respuesta incluye `errores`).
 * - 400 si el cuerpo está vacío o no es un arreglo.
 *
 */
exports.importarEmpleados = async (req, res) => {
  const idCliente = parseInt(req.user.clienteSeleccionado);
  const empleados = req.body;
  
  if (!Array.isArray(empleados) || empleados.length === 0 || !req.body) {
    return res.status(400).json({ mensaje: 'No se recibieron empleados.' });
  }

  const errores = [];
  const listaParaImportar = [];

  for (const [index, datos] of empleados.entries()) {
    const fila = `Fila ${index + 1}`;
    const {
      nombreCompleto,
      correoElectronico,
      contrasena,
      numeroTelefono
    } = datos;
    
    if (
      !numeroTelefono
      || !datos.direccion
      || !datos.fechaNacimiento
      || !datos.genero 
      || !datos.numeroEmergencia
      || !datos.areaTrabajo
      || !datos.posicion
      || !datos.antiguedad
    ) {
      errores.push({ fila, error: 'Faltan campos requeridos' });
      continue;
    }

    if (!nombreCompleto){
      errores.push({ fila, error: 'El nombre es requerido' });
      continue;
    } if (nombreCompleto.length > 75) {
      errores.push({ fila, error: 'El nombre es demasiado largo' });
      continue;
    } if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombreCompleto)) {
      errores.push({ fila, error: 'El nombre solo puede contener letras y espacios' });
      continue;
    }

    if (!correoElectronico) {
      errores.push({ fila, error: 'El correo es requerido' });
      continue;
    } if (correoElectronico && correoElectronico.length > 75) {
      errores.push({ fila, error: 'El correo es demasiado largo' });
      continue;
    }

    if (!contrasena) {
      errores.push({ fila, error: 'La contraseña es requerida' });
      continue;
    } if (contrasena.length > 75) {
      errores.push({ fila, error: 'La contraseña es demasiado larga' });
      continue;
    }

    if (typeof datos.idCliente !== 'undefined' && datos.idCliente !== '' && datos.idCliente !== null) {
      errores.push({ fila, error: 'El cliente no debe ser incluido en el archivo' });
      continue;
    }

    if (datos.direccion.length > 150) {
      errores.push({ fila, error: 'La dirección es demasiado larga' });
      continue;
    }

    if (datos.estatus == null) {
      errores.push({ fila, error: 'Estatus inválido: debe ser 0 o 1' });
      continue;
    }

    if (datos.posicion.length > 75) {
      errores.push({ fila, error: 'La posición es demasiado larga' });
      continue;
    }

    if(datos.areaTrabajo.length > 75) {
      errores.push({ fila, error: 'El área de trabajo es demasiado larga' });
      continue;
    }

    if (datos.genero.length > 20) {
      errores.push({ fila, error: 'El género es demasiado largo' });
      continue;
    }

    if (isNaN(datos.numeroEmergencia)) {
      errores.push({ fila, error: 'El número de emergencia no es valido' });
      continue;
    }

    if (
    !/^\d+$/.test(String(datos.cantidadPuntos)) 
    || Number(datos.cantidadPuntos) < 0) {
      errores.push({ fila, error: 'Los puntos deben ser un número entero mayor o igual a 0' });
      continue;
    }

    // Correo válido
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(correoElectronico)) {
      errores.push({ fila, error: MENSAJES_USUARIOS.CORREO_INVALIDO.mensaje });
      continue;
    }

    // Contraseña fuerte
    const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
    const tieneMayuscula = /[A-Z]/;
    if (
      contrasena.length < 8 
      || !tieneCaracterEspecial.test(contrasena)
      || !tieneMayuscula.test(contrasena)
    ) {
      errores.push({ fila, error: MENSAJES_USUARIOS.CONTRASENA_DEBIL.mensaje });
      continue;
    }

    // Teléfono válido
    const telefonoValido = /^\d{10}$/;
    if (!telefonoValido.test(numeroTelefono)) {
      errores.push({ fila, error: MENSAJES_USUARIOS.TELEFONO_INVALIDO.mensaje });
      continue;
    }
  
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(datos.fechaNacimiento) || isNaN(Date.parse(datos.fechaNacimiento))) {
      errores.push({ fila, error: 'La fecha de nacimiento no tiene un formato válido (DD-MM-YYYY)' });
      continue;
    }
    if (!fechaRegex.test(datos.antiguedad) || isNaN(Date.parse(datos.antiguedad))) {
      errores.push({ fila, error: 'La antigüedad no tiene un formato válido (DD-MM-YYYY)' });
      continue;
    }
  
      try {
        const hash = await bcrypt.hash(contrasena, 10);
        listaParaImportar.push({
          ...datos,
          contrasena: hash
        });
      } catch (err) {
        errores.push({ fila, error: `Error al procesar contraseña: ${err.message}` });
      }
    }
  
    if (errores.length > 0) {
      return res.status(207).json({
        mensaje: 'Importación parcial con errores.',
        errores
      });
    }
  
    for (const empleado of listaParaImportar) {
      empleado.idCliente = idCliente;
    }

    try {
      await repositorio.importarEmpleadosMasivo(listaParaImportar);
    } catch (error) {
      errores.push({
        fila: "",
        error: error.message
      });
    }

  return res.status(200).json({
    mensaje: 'Todos los empleados importados correctamente.'
  });
};
