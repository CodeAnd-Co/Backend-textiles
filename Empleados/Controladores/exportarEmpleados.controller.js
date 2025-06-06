const repositorio = require('@altertex/emp/repos/repositorioExportarEmpleado');
const { Parser } = require('json2csv');
const { format } = require('date-fns');
const MENSAJES_EMPLEADOS = require('@altertex/util/const/mensajesEmpleados');

/**
 * Controlador para exportar empleados seleccionados de un cliente y retornar CSV como string en JSON.
 *
 * @async
 * @function exportarEmpleados
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} JSON con mensaje + contenido CSV en texto plano
 * @see [RF59 - Exportar Empleados](https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF59)
 */
exports.exportarEmpleados = async (req, res) => {
  try {
    const idCliente = parseInt(req.user.clienteSeleccionado);
    const idsEmpleado = req.body.idsEmpleado;

    if (!Array.isArray(idsEmpleado) || idsEmpleado.length === 0) {
      return res.status(MENSAJES_EMPLEADOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: 'Debes seleccionar al menos un empleado para exportar.'
      });
    }

    const idsSeleccionados = idsEmpleado.map(id => parseInt(id));
    const empleados = await repositorio.obtenerEmpleadosExportacion(idCliente, idsSeleccionados);

    if (!empleados || empleados.length === 0) {
      return res.status(MENSAJES_EMPLEADOS.EMPLEADOS_NO_ENCONTRADOS.codigo).json({
        mensaje: MENSAJES_EMPLEADOS.EMPLEADOS_NO_ENCONTRADOS.mensaje,
        csv: ''
      });
    }

    empleados.forEach(emp => {
      emp.fechaNacimiento = format(new Date(emp.fechaNacimiento), 'dd/MM/yyyy');
      emp.antiguedad = format(new Date(emp.antiguedad), 'dd/MM/yyyy');
    });

    const campos = [
      { label: 'ID', value: 'idEmpleado' },
      { label: 'Nombre completo', value: 'nombreCompleto' },
      { label: 'Correo electrónico', value: 'correoElectronico' },
      { label: 'Número de teléfono', value: 'numeroTelefono' },
      { label: 'Dirección', value: 'direccion' },
      { label: 'Fecha de nacimiento', value: 'fechaNacimiento' },
      { label: 'Género', value: 'genero' },
      { label: 'Estatus', value: 'estatus' },
      { label: 'Número de emergencia', value: 'numeroEmergencia' },
      { label: 'Área de trabajo', value: 'areaTrabajo' },
      { label: 'Posición', value: 'posicion' },
      { label: 'Cantidad de puntos', value: 'cantidadPuntos' },
      { label: 'Antigüedad', value: 'antiguedad' }
    ];

    const parser = new Parser({ fields: campos });
    const csv = parser.parse(empleados);
    const csvConBOM = `\uFEFF${csv}`;

    return res.status(MENSAJES_EMPLEADOS.LISTA_EMPLEADOS_EXPORTADA.codigo).json({
      mensaje: MENSAJES_EMPLEADOS.LISTA_EMPLEADOS_EXPORTADA.mensaje,
      csv: csvConBOM
    });
  } catch (error) {
    console.error('Error al exportar empleados:', error);
    return res.status(MENSAJES_EMPLEADOS.ERROR_EXPORTAR_EMPLEADOS.codigo).json({
      mensaje: MENSAJES_EMPLEADOS.ERROR_EXPORTAR_EMPLEADOS.mensaje,
      csv: ''
    });
  }
};