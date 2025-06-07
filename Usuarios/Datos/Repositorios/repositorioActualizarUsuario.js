const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesUsuarios');
const CONSULTAS_USUARIOS = require('@altertex/util/const/consultasUsuarios');

//RF[4] Actualizar Usuario - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF4

/**
 * Repositorio para actualizar los datos de un usuario en la BD.
 *
 * Recorre un arreglo de objetos que contienen la información de cada usuario para
 * actualizar su información.
 *
 * Utiliza un array de objetos con la información del usuario, y hace la
 * consulta correspondiente a la base de datos.
 *
 * @function actualizarUsuario
 * @async
 * @param {Array<{ idUsuario: number, nombreCompleto: string, correoElectronico: string, telefono: string }>} datos - Lista de
 * información del usuario a actualizar.
 * @throws {Error} Si el arreglo está vacío o si ocurre un error en la base de datos.
 * @returns {Promise<void>} Promesa que se resuelve cuando todas las actualizaciones han sido ejecutadas.
 */
exports.actualizarUsuario = async (datos) => {
  if (!Array.isArray(datos) || datos.length === 0) {
    throw new Error('Sin datos para actualizar.');
  }
  try {
    await Promise.all(
      datos.map(
        /**
         * Actualiza la información de un usuario individualmente.
         * @param {object} usuario - Objeto con los datos del usuario a actualizar.
         * @returns {Promise<void>}
         */
        async (usuario) => {
          const {
            idUsuario,
            nombreCompleto,
            correoElectronico,
            contrasenia,
            numeroTelefono,
            direccion,
            fechaNacimiento,
            genero,
            estatus,
          } = usuario;

          const conContrasena = () => (usuario.contrasenia == '' ? false : true);

          // Actualiza datos del usuario
          if (conContrasena()) {
            await correrQuery(CONSULTAS_USUARIOS.ACTUALIZAR_DATOS_USUARIO, [
              nombreCompleto,
              correoElectronico,
              contrasenia,
              numeroTelefono,
              direccion,
              fechaNacimiento,
              genero,
              estatus,
              idUsuario,
            ]);
          } else {
            await correrQuery(CONSULTAS_USUARIOS.ACTUALIZAR_DATOS_USUARIO_SIN_CONTRASENA, [
              nombreCompleto,
              correoElectronico,
              numeroTelefono,
              direccion,
              fechaNacimiento,
              genero,
              estatus,
              idUsuario,
            ]);
          }

          if (usuario.cliente) {
            // Pasar el cliente/clientes a un array
            const clientes = Array.isArray(usuario.cliente) ? usuario.cliente : [usuario.cliente];

            await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_USUARIO_CLIENTE, [idUsuario]).then(
              /**
               * Función que reasocia los clientes al usuario después de eliminarlos.
               * @returns {Promise<void>}
               */
              async () => {
                try {
                  for (const cliente of clientes) {
                    // Asociar cada cliente seleccionado al usuario
                    if (cliente) {
                      // Evitar errores si el cliente es undefined o null
                      await correrQuery(CONSULTAS_USUARIOS.ASOCIAR_USUARIO_A_CLIENTE, [
                        idUsuario,
                        cliente,
                      ]);
                    }
                  }
                } catch (error) {
                  return error;
                }
              }
            );
          }
        }
      )
    );
  } catch {
    throw new Error(MENSAJES.ERROR_ACTUALIZAR_USUARIO.mensaje);
  }
};
