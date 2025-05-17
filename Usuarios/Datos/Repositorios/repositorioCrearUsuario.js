const conexion = require('@altertex/util/bd/db');
const CONSULTAS_USUARIOS = require('@altertex/util/const/consultasUsuarios');

/**
 * Crea un usuario y lo asocia a un rol y a uno o varios clientes en una transacción.
 * 
 * @param {string} nombreCompleto 
 * @param {string} correoElectronico 
 * @param {string} contrasenia 
 * @param {string} numeroTelefono 
 * @param {string} direccion 
 * @param {string} fechaNacimiento 
 * @param {string} genero 
 * @param {boolean} estatus 
 * @param {number} idRol 
 * @param {number[]|number} idCliente 
 * @returns {Promise<object>} Resultado con idUsuario
 */
exports.crearUsuarioConAsociaciones = (
  nombreCompleto,
  correoElectronico,
  contrasenia,
  numeroTelefono,
  direccion,
  fechaNacimiento,
  genero,
  estatus,
  idRol,
  idCliente
) => {
  return new Promise((resolve, reject) => {
    conexion.beginTransaction((err) => {
      if (err) return reject(err);

      const valoresUsuario = [
        nombreCompleto,
        correoElectronico,
        contrasenia,
        numeroTelefono,
        direccion,
        fechaNacimiento,
        genero,
        estatus
      ];

      // 1. Insertar usuario
      conexion.query(CONSULTAS_USUARIOS.CREAR_USUARIO, valoresUsuario, (err1, resultadoUsuario) => {
        if (err1) return conexion.rollback(() => reject(err1));

        const idUsuario = resultadoUsuario.insertId;

        // 2. Asociar rol
        conexion.query(CONSULTAS_USUARIOS.ASIGNAR_ROL_A_USUARIO, [idUsuario, idRol], (err2) => {
          if (err2) return conexion.rollback(() => reject(err2));

          const clientes = Array.isArray(idCliente) ? idCliente : [idCliente];

          
          /**
           * Inserta una asociación de cliente para el usuario de forma recursiva.
           * 
           * @param {number} indice - El índice actual del cliente en el arreglo que se está procesando.
           * @returns {void} Esta función no retorna un valor.
           */
          const insertarCliente = (indice) => {
            if (indice >= clientes.length) {
              return conexion.commit((errCommit) => {
                if (errCommit) return conexion.rollback(() => reject(errCommit));
                resolve({ success: true, idUsuario });
              });
            }

            const idCliente = clientes[indice];
            conexion.query(CONSULTAS_USUARIOS.ASOCIAR_USUARIO_A_CLIENTE, [idUsuario, idCliente], (err3) => {
              if (err3) return conexion.rollback(() => reject(err3));
              insertarCliente(indice + 1);
            });
          };

          insertarCliente(0); // Inicia inserción de clientes
        });
      });
    });
  });
};
