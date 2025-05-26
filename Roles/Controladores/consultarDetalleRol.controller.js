const repositorio = require('@altertex/rol/repos/repositorioDetalleRol');
const MENSAJES_ROLES = require('@altertex/util/const/mensajesRoles');

/**
 * RF8 - Leer rol
 * Documentación del requisito funcional:
 * https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF8
 *
 * @function consultarDetalle
 * @async
 * @param {object} req - Objeto de solicitud HTTP (Request).
 * @param {object} res - Objeto de respuesta HTTP (Response).
 * @returns {Response} Respuesta HTTP con los detalles del rol solicitado.
 *
 * @description
 * Este controlador obtiene el detalle de un rol: nombre, descripción,
 * número de usuarios asociados y permisos relacionados.
 */
exports.consultarDetalle = async (req, res) => {
  try {
        const { idRol } = req.query;
    
    // Validación: verificar que se proporcione un ID válido
    if (!idRol || isNaN(Number(idRol))) {
      return res
        .status(MENSAJES_ROLES.PARAMETROS_INVALIDOS.codigo)
        .json({ mensaje: MENSAJES_ROLES.PARAMETROS_INVALIDOS.mensaje });
    }

    // Se consulta al repositorio de roles para obtener el detalle por ID.
    const resultado = await repositorio.obtenerDetalleRol(Number(idRol));

    // Validación: si no se encontró el rol, se responde con mensaje de "sin resultados".
    if (!resultado || resultado.length === 0) {
      return res
        .status(MENSAJES_ROLES.SIN_RESULTADOS.codigo)
        .json({ mensaje: MENSAJES_ROLES.SIN_RESULTADOS.mensaje });
    }

    // Extrae los datos generales del rol desde la primera fila
    const { nombreRol, descripcionRol, totalUsuarios } = resultado[0];

    // Construye arreglo de permisos (omite si no tiene permisos)
    const permisos = resultado
      .filter(permiso => permiso.idPermiso !== null)
      .map(permiso => ({
        id: permiso.idPermiso,
        nombre: permiso.nombrePermiso,
        descripcion: permiso.descripcionPermiso,
      }));

    // Respuesta exitosa con datos
    return res.status(MENSAJES_ROLES.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_ROLES.CONSULTA_EXITOSA.mensaje,
      rol: {
        idRol: Number(idRol),
        nombre: nombreRol,
        descripcion: descripcionRol,
        totalUsuarios,
        permisos,
      },
    });
  } catch {
    // Error inesperado en el servidor
    return res
      .status(MENSAJES_ROLES.ERROR_CONSULTAR_ROLES.codigo)
      .json({ mensaje: MENSAJES_ROLES.ERROR_CONSULTAR_ROLES.mensaje });
  }
};