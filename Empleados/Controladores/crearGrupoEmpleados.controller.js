//RF21 - Crear Grupo de Empleados
// https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF21

/**
 * @file crearGrupoEmpleados.controller.js
 * @description
 * Controlador encargado de crear un nuevo grupo de empleados y asignarles una lista de empleados.
 */

// Importación del repositorio con la lógica de negocio.
const repositorio = require('@altertex/emp/repos/repositorioCrearGrupo');
const MENSAJES = require('@altertex/util/const/mensajesEmpleados');

/**
 * Controlador para crear un grupo de empleados.
 *
 * @async
 * @function crearGrupoEmpleados
 * @param {object} req - Request HTTP
 * @param {object} res - Response HTTP
 * @returns {Promise<void>}
 */
exports.crearGrupoEmpleados = async (req, res) => {
  const {
    nombreGrupo,
    descripcion,
    idCliente = parseInt(req.user.clienteSeleccionado),
    listaEmpleados,
  } = req.body;

  // Validación de campos requeridos
  if (
    !nombreGrupo
    || !descripcion
    || !idCliente
    || !Array.isArray(listaEmpleados)
    || listaEmpleados.length === 0
  ) {
    return res.status(400).json({
      mensaje: MENSAJES.DATOS_INCOMPLETOS.mensaje,
    });
  }

  try {
    // Validación de nombre duplicado
    const yaExiste = await repositorio.existeGrupoConNombre(nombreGrupo.trim(), idCliente);
    if (yaExiste) {
      return res.status(400).json({
        mensaje: MENSAJES.GRUPO_NOMBRE_REPETIDO.mensaje,
      });
    }

    // Crear grupo y asignar empleados
    const resultado = await repositorio.crearGrupoYAsignarEmpleados(
      nombreGrupo,
      descripcion,
      idCliente,
      listaEmpleados,
    );

    return res.status(201).json({
      mensaje: MENSAJES.GRUPO_CREADO.mensaje,
      idGrupo: resultado.idGrupo,
    });
  } catch (error) {
    console.error('Error al crear grupo de empleados:', error);
    return res.status(500).json({
      mensaje: MENSAJES.ERROR_CREAR_GRUPO.mensaje,
    });
  }
};