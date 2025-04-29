const db = require("@altertex/util/bd/db");
const QUERY = require("@altertex/util/const/consultasRoles");

exports.verificarNombreRol = async (nombre) => {
  const conexion = db.promise();
  const [rows] = await conexion.execute(QUERY.VERIFICAR_NOMBRE_ROL, [nombre]);
  return rows.length > 0;
};

exports.verificarPermiso = async (idPermiso) => {
  const conexion = db.promise();
  const [rows] = await conexion.execute(QUERY.VERIFICAR_PERMISO, [idPermiso]);
  return rows.length > 0;
};

exports.crearRol = async (nombre) => {
  const conexion = db.promise();
  const [resultado] = await conexion.execute(QUERY.INSERTAR_ROL, [nombre]);
  return resultado;
};

exports.asociarPermisosARol = async (idRol, permisos) => {
  const conexion = db.promise();

  try {
    await conexion.beginTransaction();

    for (const idPermiso of permisos) {
      await conexion.execute(QUERY.INSERTAR_ROL_PERMISO, [idRol, idPermiso]);
    }

    await conexion.commit();
  } catch (error) {
    await conexion.rollback();
    throw new Error("Error asociando permisos al rol");
  }
};
