// RF21 - Crear Grupo de Empleados
// Documentación del requerimiento funcional:
// https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF21

/**
 * @file crearGrupoEmpleados.repositorio.js
 * @description
 * Contiene las funciones de acceso a datos para crear un grupo de empleados
 * y asignar una lista de empleados al mismo, ejecutando múltiples consultas
 * SQL dentro de una transacción.
 */

// Importación de la conexión a la base de datos.
const conexion = require('@altertex/util/bd/db');

// Importación de las consultas SQL relacionadas con la creación de grupos de empleados.
const CONSULTAS = require('@altertex/util/const/consultasGrupoEmpleados');

/**
 * Crea un grupo de empleados y asigna una lista de empleados al grupo creado.
 *
 * @function crearGrupoYAsignarEmpleados
 * @param {string} nombreGrupo - Nombre del grupo de empleados.
 * @param {string} descripcion - Descripción del grupo de empleados.
 * @param {number} idCliente - ID del cliente que crea el grupo.
 * @param {Array<number>} listaEmpleados - Lista de IDs de empleados que se asignarán al grupo.
 * @returns {Promise<{idGrupo: number}>} Promesa que resuelve con el ID del grupo creado o se rechaza con un error.
 *
 * @description
 * Esta función ejecuta una transacción SQL que incluye:
 * 1. Crear un nuevo grupo de empleados para un cliente.
 * 2. Asignar a cada empleado de la lista al grupo creado.
 * Si ocurre un error en cualquier paso, se realiza rollback para mantener la integridad de los datos.
 */
exports.crearGrupoYAsignarEmpleados = (nombreGrupo, descripcion, idCliente, listaEmpleados) => {
  return new Promise((resolve, reject) => {
    // Inicia la transacción
    conexion.beginTransaction((err) => {
      if (err) return reject(err);

      // Inserta el grupo en la base de datos
      conexion.query(
        CONSULTAS.CREAR_GRUPO,
        [idCliente, nombreGrupo, descripcion],
        (err1, resultadoGrupo) => {
          if (err1) return conexion.rollback(() => reject(err1));

          // ID generado del nuevo grupo
          const idGrupo = resultadoGrupo.insertId;

          // eslint-disable-next-line jsdoc/require-jsdoc
          const insertarEmpleado = (indiceEmpleado) => {
            if (indiceEmpleado >= listaEmpleados.length) {
              return conexion.commit((errCommit) => {
                if (errCommit) return conexion.rollback(() => reject(errCommit));
                resolve({ idGrupo });
              });
            }

            const idEmpleado = listaEmpleados[indiceEmpleado];

            conexion.query(
              CONSULTAS.ASIGNAR_EMPLEADO_A_GRUPO,
              [idEmpleado, idGrupo],
              (err2) => {
                if (err2) return conexion.rollback(() => reject(err2));
                insertarEmpleado(indiceEmpleado + 1);
              },
            );
          };

          // Comienza la asignación de empleados
          insertarEmpleado(0);
        },
      );
    });
  });
};

/**
 * Verifica si ya existe un grupo con el mismo nombre para el cliente dado.
 *
 * @function existeGrupoConNombre
 * @param {string} nombreGrupo - Nombre del grupo a verificar.
 * @param {number} idCliente - ID del cliente propietario del grupo.
 * @returns {Promise<boolean>} Retorna true si ya existe un grupo con el mismo nombre, false si no.
 *
 * @description
 * Ejecuta una consulta SQL para determinar si existe un grupo de empleados con
 * el mismo nombre bajo el mismo cliente. Sirve como validación para evitar duplicados.
 */
exports.existeGrupoConNombre = (nombreGrupo, idCliente) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      CONSULTAS.VALIDAR_NOMBRE_REPETIDO,
      [idCliente, nombreGrupo.trim()],
      (error, resultados) => {
        if (error) return reject(error);
        resolve(resultados.length > 0);
      },
    );
  });
};