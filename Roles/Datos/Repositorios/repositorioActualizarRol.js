const MENSAJES = require('@altertex/util/const/mensajesRoles');
const conexion = require('@altertex/util/bd/db');

/**
 * Actualiza un rol existente, incluyendo su nombre, descripción y permisos asociados.
 *
 * @param {object} datosActualizarRol - Datos necesarios para actualizar el rol.
 * @param {object} datosActualizarRol.datosRol - Contiene el nombre, descripción y permisos del rol.
 * @param {number} datosActualizarRol.idRol - ID del rol a actualizar.
 * @throws {Error} Si hay parámetros inválidos o errores en la base de datos.
 */
exports.actualizarRol = async (datosActualizarRol) => {
  const datosRol = datosActualizarRol.datosRol;
  const idRol = datosActualizarRol.idRol;
  const permisos = datosRol.permisos || [];

  if (!datosActualizarRol || !idRol) {
    throw new Error(MENSAJES.PARAMETROS_INVALIDOS.mensaje);
  }

  const conexionBD = await conexion.getConnection();

  try {
    await conexionBD.beginTransaction();

    // Check for duplicate name only if name is being updated
    if (datosRol.nombre !== null && datosRol.nombre !== undefined) {
      const resultadoNombreDuplicado = await conexionBD.query(
        'SELECT idRol FROM rol WHERE nombre = ? AND idRol != ?',
        [datosRol.nombre, idRol],
      );

      if (resultadoNombreDuplicado[0].length > 0) {
        throw new Error(MENSAJES.ROL_EXISTENTE);
      }
    }

    // Build dynamic UPDATE query based on which fields are provided
    const camposActualizar = [];
    const valoresActualizar = [];

    if (datosRol.nombre !== null && datosRol.nombre !== undefined) {
      camposActualizar.push('nombre = ?');
      valoresActualizar.push(datosRol.nombre);
    }

    if (datosRol.descripcion !== null && datosRol.descripcion !== undefined) {
      camposActualizar.push('descripcion = ?');
      valoresActualizar.push(datosRol.descripcion);
    }

    // Only run UPDATE if there are fields to update
    if (camposActualizar.length > 0) {
      const consultaActualizar = `UPDATE rol
                                  SET ${camposActualizar.join(', ')}
                                  WHERE idRol = ?`;
      valoresActualizar.push(idRol);

      await conexionBD.query(consultaActualizar, valoresActualizar);
    }

    // Always handle permissions (delete old ones)
    await conexionBD.query(
      'DELETE FROM rol_permiso WHERE idRol = ?',
      [idRol],
    );

    // Insert new permissions if any
    if (permisos.length > 0) {
      const valores = permisos.map(idPermiso => [idRol, idPermiso]);
      const marcadores = permisos.map(() => '(?, ?)').join(', ');
      const consultaInsertar = `INSERT INTO rol_permiso (idRol, idPermiso)
                                VALUES ${marcadores}`;
      const valoresAplanados = valores.flat();

      await conexionBD.query(consultaInsertar, valoresAplanados);
    }

    await conexionBD.commit();

  } catch (error) {
    await conexionBD.rollback();
    console.error('Error actualizando rol:', error);

    if (error.message === MENSAJES.ROL_EXISTENTE
      || error.message === MENSAJES.PARAMETROS_INVALIDOS.mensaje) {
      throw new Error(error.message);
    } else {
      throw new Error('Ocurrio un error al actualizar rol.');
    }
  } finally {
    conexionBD.release();
  }
};