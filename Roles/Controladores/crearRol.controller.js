const repositorio = require('@altertex/rol/repos/repositorioCrearRol');
const MENSAJES = require("@altertex/util/const/mensajesRoles");

exports.crearRol = async (req, res) => {
  const { nombre, descripcion, permisos } = req.body;

  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ mensaje: MENSAJES.NOMBRE_OBLIGATORIO });
  }

  if (!Array.isArray(permisos) || permisos.length === 0) {
    return res.status(400).json({ mensaje: MENSAJES.PERMISOS_OBLIGATORIOS });
  }

  try {
    const existe = await repositorio.verificarNombreRol(nombre);
    if (existe) {
      return res.status(400).json({ mensaje: MENSAJES.ROL_EXISTENTE });
    }

    for (const idPermiso of permisos) {
      const valido = await repositorio.verificarPermiso(idPermiso);
      if (!valido) {
        return res
          .status(400)
          .json({ mensaje: MENSAJES.PERMISO_INVALIDO(idPermiso) });
      }
    }

    const resultado = await repositorio.crearRol(nombre, descripcion);
    if (resultado.insertId) {
      await repositorio.asociarPermisosARol(resultado.insertId, permisos);
      return res.status(201).json({ mensaje: MENSAJES.ROL_CREADO });
    } else {
      return res.status(400).json({ mensaje: MENSAJES.ERROR_CREACION });
    }
  } catch (error) {
    console.error("Error en crearRol:", error);
    return res.status(500).json({ mensaje: MENSAJES.ERROR_CREACION });
  }
};
