const repositorio = require('@altertex/usu/repos/repositorioEliminarUsuario');
const MENSAJES_USUARIOS = require('@altertex/util/const/mensajesUsuarios');
const db = require('@altertex/util/bd/db');
const { verificarCodigo2FA } = require('@altertex/util/ser/verificarCodigo2FA.servicio');

/**
 * Controlador para eliminar uno o varios usuarios, con validación adicional si hay Superadmins involucrados.
 *
 * RF5 - Eliminar Usuario
 * Documentación: https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf5/
 *
 * @async
 * @function eliminarUsuario
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Retorna una respuesta JSON con el resultado de la operación.
 *
 * @description
 * Este controlador:
 * 1. Recibe IDs de usuarios a eliminar.
 * 2. Valida si hay Superadmins entre ellos.
 * 3. Si los hay, valida que el usuario solicitante tenga permiso y pase la verificación 2FA.
 * 4. Luego delega la eliminación al repositorio.
 */
exports.eliminarUsuario = async (req, res) => {
  try {

    let idsUsuarios = req.body.ids;
    const codigo2FA = req.body.codigo2FA;
    const idSolicitante = req.user?.idUsuario;

    // Validación: Se requiere al menos un ID
    if (!idsUsuarios || (Array.isArray(idsUsuarios) && idsUsuarios.length === 0)) {
      return res.status(MENSAJES_USUARIOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: MENSAJES_USUARIOS.PARAMETROS_INVALIDOS.mensaje,
      });
    }

    if (!Array.isArray(idsUsuarios)) {
      idsUsuarios = [idsUsuarios];
    }

    const idsNumericos = idsUsuarios.map(Number);

    const [usuariosObjetivo] = await db.query(`
      SELECT u.idUsuario, r.nombre AS rol
      FROM usuario u
      JOIN usuario_rol ur ON u.idUsuario = ur.idUsuario
      JOIN rol r ON ur.idRol = r.idRol
      WHERE u.idUsuario IN (?)
    `, [idsNumericos]);

    const contieneSuperadmins = usuariosObjetivo.some(usuar => usuar.rol === 'Super Administrador');

    if (contieneSuperadmins) {
      const [resultadoPermiso] = await db.query(
        'SELECT puedeEliminarSuperadmins FROM usuarios_2fa WHERE idUsuario = ? AND tiene2FA = true',
        [idSolicitante]
      );

      const tienePermiso = resultadoPermiso?.[0]?.puedeEliminarSuperadmins;

      if (!tienePermiso) {
        return res.status(403).json({
          mensaje: 'No tienes permiso para eliminar Superadmins.',
        });
      }

      const esCodigoValido = await verificarCodigo2FA(idSolicitante, codigo2FA);
      if (!esCodigoValido) {
        return res.status(401).json({
          mensaje: 'Código 2FA inválido o expirado.',
        });
      }
    }

    await repositorio.eliminarUsuarios(idsNumericos);

    return res.status(200).json({ mensaje: 'Usuarios eliminados correctamente' });
  } catch (error) {
    return res.status(MENSAJES_USUARIOS.ERROR_ELIMINAR_USUARIO.codigo).json({
      mensaje: MENSAJES_USUARIOS.ERROR_ELIMINAR_USUARIO.mensaje,
    });
  }
};