//RF21 - Crear Grupo de Empleados
// https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF21
/**
 * @file crearGrupoEmpleados.controller.js
 * @description
 * Controlador encargado de crear un nuevo grupo de empleados y asignarles una lista de empleados.
 * Este controlador valida los datos de entrada y delega la operación al repositorio correspondiente.
 */

// Importación del repositorio que contiene la lógica de negocio para crear y asignar grupos.
const repositorio = require('@altertex/emp/repos/repositorioCrearGrupo');

// Importación de los mensajes de respuesta utilizados en el módulo de empleados.
const MENSAJES = require('@altertex/util/const/mensajesEmpleados');

/**
 * Controlador para crear un grupo de empleados.
 *
 * @async
 * @function crearGrupoEmpleados
 * @param {object} req - Objeto de solicitud HTTP (Request).
 * @param {object} req.body - Cuerpo de la solicitud con los datos requeridos.
 * @param {string} req.body.nombreGrupo - Nombre del nuevo grupo.
 * @param {string} req.body.descripcion - Descripción del grupo.
 * @param {number} req.user.clienteSeleccionado - ID del cliente que crea el grupo.
 * @param {Array<number>} req.body.listaEmpleados - IDs de los empleados a asignar al grupo.
 * @param {object} res - Objeto de respuesta HTTP (Response).
 * @returns {Promise<void>} Envía la respuesta HTTP con el resultado de la operación.
 *
 * @description
 * Valida los campos necesarios en el cuerpo de la petición. Si son válidos, invoca el repositorio para crear
 * el grupo y asignar los empleados. Si ocurre un error, responde con el mensaje correspondiente.
 */
exports.crearGrupoEmpleados = async (req, res) => {
  const {
    nombreGrupo,
    descripcion,
    idCliente = parseInt(req.user.clienteSeleccionado),
    listaEmpleados,
  } = req.body;

  // Validación de entrada: todos los campos son obligatorios y listaEmpleados debe ser un arreglo no vacío.
  if (
    !nombreGrupo ||
    !descripcion ||
    !idCliente ||
    !Array.isArray(listaEmpleados) ||
    listaEmpleados.length === 0
  ) {
    return res
      .status(400)
      .json({ mensaje: MENSAJES.DATOS_INCOMPLETOS.mensaje });
  }

  try {
    // Llama al repositorio para crear el grupo y asignar empleados.
    const resultado = await repositorio.crearGrupoYAsignarEmpleados(
      nombreGrupo,
      descripcion,
      idCliente,
      listaEmpleados,
    );

    // Respuesta exitosa con el ID del grupo creado.
    return res.status(201).json({
      mensaje: MENSAJES.GRUPO_CREADO.mensaje,
      idGrupo: resultado.idGrupo,
    });
  } catch (error) {
    // Manejo de errores inesperados con log para depuración.
    console.error('Error al crear grupo de empleados:', error);
    return res
      .status(500)
      .json({ mensaje: MENSAJES.ERROR_CREAR_GRUPO.mensaje });
  }
};