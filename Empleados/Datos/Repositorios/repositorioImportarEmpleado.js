const conexion = require('@altertex/util/bd/db');
const crearUsuario = require('@altertex/usu/repos/repositorioCrearUsuario');
const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_EMPLEADOS = require('@altertex/util/const/consultasEmpleados');
const CONSULTAS_USUARIOS = require('@altertex/util/const/consultasUsuarios');

/**
 * Inserta un nuevo usuario con asociaciones y luego su registro de empleado.
 *
 * @async
 * @function importarEmpleadoConUsuario
 * @param {object} datos - Objeto con datos del usuario y empleado.
 * @param {string} datos.nombreCompleto - Nombre completo del usuario.
 * @param {string} datos.correoElectronico - Correo electrónico único del usuario.
 * @param {string} datos.contrasena - Contraseña ya validada.
 * @param {string} datos.numeroTelefono - Número de teléfono.
 * @param {string} datos.direccion - Dirección del usuario.
 * @param {string} datos.fechaNacimiento - Fecha de nacimiento (YYYY-MM-DD).
 * @param {string} datos.genero - Género del usuario.
 * @param {boolean} datos.estatus - Estatus del usuario (true = activo).
 * @param {number} datos.idRol - ID del rol asignado al usuario.
 * @param {number|number[]} datos.idCliente - Cliente(s) asociados al usuario.
 * @param {string} datos.numeroEmergencia - Teléfono de emergencia.
 * @param {string} datos.areaTrabajo - Área de trabajo del empleado.
 * @param {string} datos.posicion - Posición del empleado.
 * @param {number} datos.cantidadPuntos - Puntaje inicial.
 * @param {string} datos.antiguedad - Fecha de ingreso (YYYY-MM-DD).
 * @returns {Promise<void>} Lanza error si ocurre algún fallo en la inserción.
 *
 * @throws {Error} Si la inserción del usuario o del empleado falla.
 */
exports.importarEmpleadoConUsuario = async (datos) => {
  try {
    const resultadoCorreo = await correrQuery(
      CONSULTAS_USUARIOS.VALIDAR_CORREO,
      [datos.correoElectronico]
    );
    
    if (resultadoCorreo.length > 0) {
      throw new Error(`El correo ${datos.correoElectronico} ya está registrado`);
    }
    
    // 2. Validar número de teléfono duplicado
    const resultadoTelefono = await correrQuery(
      CONSULTAS_USUARIOS.VALIDAR_TELEFONO,
      [datos.numeroTelefono]
    );
    
    if (resultadoTelefono.length > 0) {
      throw new Error(`El número de teléfono ${datos.numeroTelefono} ya está registrado`);
    }
    
    // 1. Crear usuario con el repositorio de crearUsuario
    const { idUsuario } = await crearUsuario.crearUsuarioConAsociaciones(
      datos.nombreCompleto,
      datos.correoElectronico,
      datos.contrasena,
      datos.numeroTelefono,
      datos.direccion,
      datos.fechaNacimiento,
      datos.genero,
      datos.estatus,
      datos.idRol,
      datos.idCliente
    );

    // 2. Insertar empleado
    await new Promise((resolve, reject) => {
      conexion.query(
        CONSULTAS_EMPLEADOS.INSERTAR_EMPLEADO,
        [
          idUsuario,
          datos.idCliente,
          datos.numeroEmergencia,
          datos.areaTrabajo,
          datos.posicion,
          parseFloat(datos.cantidadPuntos),
          datos.antiguedad
        ],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });

  } catch (error) {
    throw new Error(`Error al importar empleado: ${error.message}`);
  }
};
