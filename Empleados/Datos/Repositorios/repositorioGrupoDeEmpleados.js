/**
 * @file grupoEmpleados.repositorio.js
 * @description
 * Contiene funciones para consultar y validar grupos de empleados asociados a un cliente.
 * Incluye lógica para obtener todos los grupos de un cliente y verificar duplicados por nombre.
 *
 * RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
 */

// Importación de utilidades para consultas a base de datos.
const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_GRUPO_EMPLEADOS = require('@altertex/util/const/consultasGrupoEmpleados');
const conexion = require('@altertex/util/bd/db');

/**
 * Obtiene la lista de grupos de empleados asociados a un cliente específico.
 *
 * @async
 * @function obtenerGrupoDeEmpleados
 * @param {number} idCliente - ID del cliente cuyo grupo de empleados se desea consultar.
 * @returns {Promise<Array<object>>} Retorna un arreglo con los grupos encontrados, o vacío si no hay resultados.
 *
 * @description
 * Ejecuta una consulta SQL que retorna los grupos de empleados de un cliente.
 * Si ocurre un error durante la ejecución, se captura y se retorna un arreglo vacío.
 */
exports.obtenerGrupoDeEmpleados = async (idCliente) => {
  const query = CONSULTAS_GRUPO_EMPLEADOS.OBTENER_LISTA;

  try {
    const gruposDeEmpleados = await correrQuery(query, [idCliente]);

    return gruposDeEmpleados;
  } catch {
    return [];
  }
};

/**
 * Verifica si ya existe un grupo de empleados con el mismo nombre para un cliente determinado.
 *
 * @function existeGrupoConNombre
 * @param {string} nombreGrupo - Nombre del grupo a verificar.
 * @param {number} idCliente - ID del cliente propietario del grupo.
 * @returns {Promise<boolean>} Retorna true si el grupo ya existe, false si no.
 *
 * @description
 * Ejecuta una consulta SQL para validar si el nombre del grupo ya está registrado para ese cliente,
 * útil para evitar duplicados al momento de crear nuevos grupos.
 */
exports.existeGrupoConNombre = (nombreGrupo, idCliente) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      CONSULTAS_GRUPO_EMPLEADOS.VALIDAR_NOMBRE_REPETIDO,
      [nombreGrupo.trim(), idCliente],
      (err, resultados) => {
        if (err) return reject(err);
        resolve(resultados.length > 0);
      }
    );
  });
};
