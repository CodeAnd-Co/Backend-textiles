//RF21 - Crear Grupo de Empleados
// https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF21
/**
 * @file crearGrupoEmpleados.repositorio.js
 * @description
 * Contiene la lógica para crear un grupo de empleados y asignar una lista de empleados al mismo,
 * ejecutando múltiples consultas SQL dentro de una transacción.
 */

// Importación de la conexión a la base de datos MySQL.
const conexion = require('@altertex/util/bd/db');

// Importación de las consultas SQL relacionadas con empleados.
const CONSULTAS = require('@altertex/util/const/consultasGrupoEmpleados');


/**
 * Crea un grupo de empleados y asigna una lista de empleados al grupo creado.
 *
 * @function crearGrupoYAsignarEmpleados
 * @param {string} nombreGrupo - Nombre del grupo de empleados.
 * @param {string} descripcion - Descripción del grupo de empleados.
 * @param {number} idCliente - ID del cliente que crea el grupo.
 * @param {Array<number>} listaEmpleados - Lista de IDs de empleados que se asignarán al grupo.
 * @returns {Promise<object>} Promesa que resuelve con el ID del grupo creado o se rechaza con un error.
 *
 * @description
 * Esta función ejecuta una transacción para garantizar que tanto la creación del grupo como
 * la asignación de empleados ocurran de manera atómica. Si ocurre un error en cualquier parte
 * del proceso, se realiza un rollback para deshacer los cambios.
 */
exports.crearGrupoYAsignarEmpleados = (nombreGrupo, descripcion, idCliente, listaEmpleados) => {
  return new Promise((resolve, reject) => {
    // Inicia la transacción
    conexion.beginTransaction(err => {
      if (err) return reject(err);

      // Ejecuta la consulta para crear el grupo
      conexion.query(
        CONSULTAS.CREAR_GRUPO,
        [idCliente, nombreGrupo, descripcion],
        (err1, resultadoGrupo) => {
          if (err1) return conexion.rollback(() => reject(err1));

          // Obtiene el ID del grupo recién creado
          const idGrupo = resultadoGrupo.insertId;

          /**
           * Función recursiva para asignar empleados uno a uno al grupo creado.
           * Si ocurre un error en alguna asignación, se revierte toda la transacción.
           */
          const insertarEmpleado = (i) => {
            if (i >= listaEmpleados.length) {
              // Si todos los empleados fueron asignados correctamente, se confirma la transacción
              return conexion.commit(errCommit => {
                if (errCommit) return conexion.rollback(() => reject(errCommit));
                resolve({ idGrupo });
              });
            }

            const idEmpleado = listaEmpleados[i];

            // Asigna el empleado actual al grupo
            conexion.query(
              CONSULTAS.ASIGNAR_EMPLEADO_A_GRUPO,
              [idEmpleado, idGrupo],
              (err2) => {
                if (err2) return conexion.rollback(() => reject(err2));
                insertarEmpleado(i + 1); // Procede al siguiente empleado
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
 * Verifica si ya existe un grupo con el mismo nombre para el cliente.
 *
 * @function existeGrupoConNombre
 * @param {string} nombreGrupo - Nombre del grupo a verificar.
 * @param {number} idCliente - ID del cliente.
 * @returns {Promise<boolean>} Verdadero si existe, falso si no.
 */
exports.existeGrupoConNombre = (nombreGrupo, idCliente) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      CONSULTAS.VALIDAR_NOMBRE_REPETIDO,
      [idCliente, nombreGrupo.trim()],
      (error, resultados) => {
        if (error) return reject(error);
        resolve(resultados.length > 0);
      }
    );
  });
};