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
    throw new Error(MENSAJES.ERROR_OBTENER_USUARIO.mensaje);
  }

  try {
    for (const usuario of datos) {
      const {
        idUsuario,
        correoElectronico,
        nombreCompleto,
        contrasenia,
        numeroTelefono,
        direccion,
        fechaNacimiento,
        idRol,
        genero,
        estatus,
        cliente,
      } = usuario;

      const resultadoCorreo = await correrQuery(
        CONSULTAS_USUARIOS.VALIDAR_CORREO_DUPLICADO_ACTUALIZACION,
        [correoElectronico, idUsuario]
      );

      if (resultadoCorreo.length > 0) {
        throw new Error(MENSAJES.USUARIO_YA_EXISTE.mensaje);
      }

      const conContrasena = contrasenia && contrasenia.trim() !== '';

      if (conContrasena) {
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

      // Asociar cliente(s)
      if (cliente) {
        const clientes = Array.isArray(cliente) ? cliente : [cliente];

        // Eliminar asociaciones anteriores
        await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_USUARIO_CLIENTE, [idUsuario]);

        for (const idCliente of clientes) {
          if (idCliente) {
            await correrQuery(CONSULTAS_USUARIOS.ASOCIAR_USUARIO_A_CLIENTE, [
              idUsuario,
              idCliente,
            ]);
          }
        }
      }
      await correrQuery(CONSULTAS_USUARIOS.ACTUALIZAR_ROL_USUARIO, [idRol, idUsuario]);
    }
  } catch (error) {
    if (error.code === 'ER_TRUNCATED_WRONG_VALUE') {
      throw new Error(MENSAJES.ERROR_FECHA_NO_VALIDA.mensaje);
    }
    throw new Error(error.message || MENSAJES.ERROR_ACTUALIZAR_USUARIO.mensaje);
  }
};
