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
  const empleados = req.body;

  if (!Array.isArray(empleados) || empleados.length === 0) {
    return res.status(400).json({ mensaje: 'No se recibieron empleados.' });
  }

  const errores = [];

  for (const [index, datos] of empleados.entries()) {
    try {
      const {
        nombreCompleto,
        correoElectronico,
        contrasena,
        numeroTelefono
      } = datos;

      if (
        !nombreCompleto || !correoElectronico || !contrasena 
        || !numeroTelefono || !datos.idRol || datos.idCliente === undefined
      ) {
        errores.push({ fila: index + 1, error: 'Faltan campos requeridos' });
        continue;
      }

      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!correoValido.test(correoElectronico)) {
        errores.push({ fila: index + 1, error: MENSAJES_USUARIOS.CORREO_INVALIDO.mensaje });
        continue;
      }

      const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
      const tieneMayuscula = /[A-Z]/;
      if (contrasena.length < 8 
          || !tieneCaracterEspecial.test(contrasena) 
          || !tieneMayuscula.test(contrasena)) {
        errores.push({ fila: index + 1, error: MENSAJES_USUARIOS.CONTRASENA_DEBIL.mensaje });
        continue;
      }

      const telefonoValido = /^\d{10}$/;
      if (!telefonoValido.test(numeroTelefono)) {
        errores.push({ fila: index + 1, error: MENSAJES_USUARIOS.TELEFONO_INVALIDO.mensaje });
        continue;
      }

      datos.contrasena = await bcrypt.hash(contrasena, 10);

      await repositorio.importarEmpleadoConUsuario(datos);
    } catch (error) {
      errores.push({ fila: index + 1, error: error.message });
    }
  }

  if (errores.length > 0) {
    return res.status(207).json({
      mensaje: 'Importación con errores.',
      errores
    });
  }

  return res.status(200).json({ mensaje: 'Todos los empleados importados correctamente.' });
};
