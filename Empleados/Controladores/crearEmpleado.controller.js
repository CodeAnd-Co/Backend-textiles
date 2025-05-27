const MENSAJES = require('@altertex/util/const/mensajesEmpleados');
const repositorio = require('@altertex/emp/repos/repositorioCrearEmpleado');
//RF[16] Crear empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16]

/**
 * Controlador para crear un nuevo empleado.
 * Este endpoint recibe un objeto con la información del nuevo empleado
 * y usa su repositorio para insertar el nuevo registro en la base de datos.
 *
 * @function crearEmpleado
 * @async
 * @param {Express.Request} req - Objeto de solicitud HTTP de Express.
 * @param {object} req.body - Cuerpo de la solicitud.
 * @param {object} req.body.empleado - Información del nuevo empleado a crear.
 * @param {Express.Response} res - Objeto de respuesta HTTP de Express.
 * @returns {Promise<void>} Retorna una respuesta JSON indicando éxito o un error.
 */
