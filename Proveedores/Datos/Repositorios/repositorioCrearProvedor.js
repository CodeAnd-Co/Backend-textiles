//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultas = require('@altertex/util/const/consultasProveedores');

exports.crearProveedor = async (proveedor) => {
  const query = consultas.CREAR;
  const parametros = [
    proveedor.nombre,
    proveedor.nombreCompania,
    proveedor.telefonoContacto,
    proveedor.direccion,
    proveedor.codigoPostal,
    proveedor.pais,
    proveedor.estado,
  ];

  try {
    const resultados = await correrQuery(query, parametros);

    const idProveedor = resultados.insertId;
    return idProveedor;
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    return [];
  }
};
