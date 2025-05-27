const MENSAJES_SETS_PRODUCTOS = require('@altertex/util/const/mensajesSetsProductos');
const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS = require('@altertex/util/const/consultasSetsProductos');

exports.crearSetsProductos = async (idCliente, datosSetsProducto) => {
  try {

    const duplicados = await correrQuery(CONSULTAS.CONSULTAR_DUPLICADOS, [
      idCliente,
      datosSetsProducto.nombre,
      datosSetsProducto.nombreVisible,
    ]);

    if (duplicados.length > 0) {
      throw new Error(MENSAJES_SETS_PRODUCTOS.ERROR_NOMBRE_DUPLICADO.mensaje);
    }
    

    const resultado = await correrQuery(CONSULTAS.CREAR_SET_PRODUCTO, [idCliente, datosSetsProducto.nombre, datosSetsProducto.nombreVisible, datosSetsProducto.descripcion, datosSetsProducto.activo]);
    const idSetProducto = resultado.insertId;


    for (const producto of datosSetsProducto.idProductos) {
      await correrQuery(CONSULTAS.ASIGNAR_PRODUCTO_SET_PRODUCTO, [producto, idSetProducto]);
    }
  } catch (error) {
    throw new Error(error.message);
  }

};