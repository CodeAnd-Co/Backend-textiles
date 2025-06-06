const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesSetsProductos');
const CONSULTAS = require('@altertex/util/const/consultasSetsProductos');

// RF[44] Actualizar set de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF44]

/**
 * Actualiza un set de productos con su información general y productos asociados.
 *
 * @param {object} datos - Datos para actualizar el set.
 * @param {number} datos.idSetProducto - ID del set de productos.
 * @param {number} datos.idCliente - ID del cliente.
 * @param {string} datos.nombre - Nombre interno.
 * @param {string} datos.descripcion - Descripción.
 * @param {boolean} datos.activo - Estado activo/inactivo.
 * @param {number[]} datos.productos - Lista de IDs de productos a asociar. Array vacío elimina todas las asociaciones.
 */
exports.actualizarSetProductos = async (idCliente, datos) => {
  const { idSetProducto, nombre, descripcion, activo, productos } = datos;

  try {

    const duplicados = await correrQuery(CONSULTAS.CONSULTAR_NOMBRE_DUPLICADO, [
          idCliente,
          nombre,
        ]);
    
        if (duplicados.length > 0) {
          throw new Error(MENSAJES.ERROR_NOMBRE_NORMAL_DUPLICADO.mensaje);
        }
    // 1. Actualizar info básica del set
    await correrQuery(CONSULTAS.ACTUALIZAR_SET_INFO, [nombre, descripcion, activo, idSetProducto]);

    // 2. Manejar productos asociados al set
    if (Array.isArray(productos)) {
      if (productos.length > 0) {
        // Verificar que los productos pertenezcan al cliente
        const productosSTR = productos.join(', ');
        const valores = productos
          .map((idProducto) => `(${idSetProducto}, ${idProducto})`)
          .join(', ');

        // Eliminar asociaciones actuales que no estén en la nueva lista
        await correrQuery(
          CONSULTAS.ELIMINAR_PRODUCTOS_DEL_SET.replace('__ID__', idSetProducto).replace(
            '__PRODUCTOS__',
            productosSTR
          )
        );

        // Agregar nuevos productos al set
        await correrQuery(CONSULTAS.AGREGAR_PRODUCTOS_AL_SET.replace('__VALORES__', valores));
      } else {
        // Eliminar todas las asociaciones si el array está vacío
        await correrQuery(CONSULTAS.ELIMINAR_TODOS_PRODUCTOS_DEL_SET, [idSetProducto]);
      }
    }
  } catch (error) {
    throw new Error(error.message || MENSAJES.ERROR_ACTUALIZAR_SET_PRODUCTOS.mensaje);
  }
};
