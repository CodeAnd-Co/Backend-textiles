const repositorio = require('@altertex/rol/repos/repositorioCrearRol');
const MENSAJES = require('@altertex/util/const/mensajesRoles');

/**
 * Controlador para crear un nuevo rol.
 *
 * Este controlador realiza las siguientes validaciones y operaciones:
 * - Verifica que el nombre del rol sea válido.
 * - Verifica que los permisos sean un arreglo no vacío.
 * - Valida que el nombre del rol no esté duplicado en la base de datos.
 * - Valida que todos los IDs de permisos proporcionados existan en la base de datos.
 * - Inserta el rol y asocia los permisos si todas las validaciones son exitosas.
 *
 * @async
 * @function crearRol
 * @param {Express.Request} req - Objeto de solicitud HTTP. Se espera que el cuerpo (`req.body`) contenga:
 *   @param {string} req.body.nombre - Nombre del rol a crear.
 *   @param {string} [req.body.descripcion] - Descripción opcional del rol.
 *   @param {number[]} req.body.permisos - Lista de IDs de permisos a asociar.
 * @param {Express.Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Respuesta JSON con el estado de la creación del rol.
 */
exports.crearRol = async (req, res) => {
  const { nombre, descripcion, permisos } = req.body;

  // Validación del nombre del rol
  if (!nombre || typeof nombre !== 'string') {
    return res.status(400).json({ mensaje: MENSAJES.NOMBRE_OBLIGATORIO });
  }

  // Validación de los permisos
  if (!Array.isArray(permisos) || permisos.length === 0) {
    return res.status(400).json({ mensaje: MENSAJES.PERMISOS_OBLIGATORIOS });
  }

  try {
    // Verificar si el nombre del rol ya existe
    const existe = await repositorio.verificarNombreRol(nombre);
    if (existe) {
      return res.status(400).json({ mensaje: MENSAJES.ROL_EXISTENTE });
    }

    // Verificar que todos los permisos sean válidos
    for (const idPermiso of permisos) {
      const valido = await repositorio.verificarPermiso(idPermiso);
      if (!valido) {
        return res.status(400).json({ mensaje: MENSAJES.PERMISO_INVALIDO(idPermiso) });
      }
    }

    // Crear el rol y asociar los permisos
    const resultado = await repositorio.crearRol(nombre, descripcion);
    if (resultado.insertId) {
      await repositorio.asociarPermisosARol(resultado.insertId, permisos);
      return res.status(201).json({ mensaje: MENSAJES.ROL_CREADO });
    } else {
      return res.status(400).json({ mensaje: MENSAJES.ERROR_CREACION });
    }
  } catch {
    return res.status(500).json({ mensaje: MENSAJES.ERROR_CREACION });
  }
};
