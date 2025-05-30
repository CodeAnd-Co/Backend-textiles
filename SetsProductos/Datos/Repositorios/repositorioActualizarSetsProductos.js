const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesSetsProductos');
const CONSULTAS_SETS_PRODUCTOS = require('@altertex/util/const/consultasSetsProductos');

//RF[44] Actualizar set de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF44]

/**
 *Repositorio para ...
 *
 */
exports.actualizarSetProducto = async (datos) => {
  if (!Array.isArray(datos) || datos.length === 0) {
    throw new Error('Sin datos para actualizar.');
  }
  try {
    await Promise.all(
      datos.map(({ idSetProducto, idCliente, nombre, nombreVisible, descripcion, activo }) => {
        return correrQuery(CONSULTAS_SETS_PRODUCTOS.ACTUALIZAR, [
          idCliente,
          nombre,
          nombreVisible,
          descripcion,
          activo,
          idSetProducto,
        ]);
      })
    );
  } catch {
    throw new Error(MENSAJES.ERROR_ACTUALIZAR_SET_PRODUCTOS.mensaje);
  }
};
