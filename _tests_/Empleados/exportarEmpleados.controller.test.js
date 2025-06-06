/**
 * RF[59] Exportar Empleados - https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF59
 * Mocks antes de importar el controlador
 */
jest.mock('@altertex/emp/repos/repositorioExportarEmpleado', () => ({
  obtenerEmpleadosExportacion: jest.fn(),
}));

const controlador = require('@altertex/emp/ctrl/exportarEmpleados.controller');
const repositorio = require('@altertex/emp/repos/repositorioExportarEmpleado');
const MENSAJES_EMPLEADOS = require('@altertex/util/const/mensajesEmpleados');

describe('Controlador exportarEmpleados', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      user: { clienteSeleccionado: '5' },
      body: { idsEmpleado: [1, 2] },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Escenario 1: No se envían IDs
  test('Debe retornar error si no se envían empleados a exportar', async () => {
    req.body.idsEmpleado = [];

    await controlador.exportarEmpleados(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_EMPLEADOS.PARAMETROS_INVALIDOS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Debes seleccionar al menos un empleado para exportar.',
    });
  });

  // Escenario 2: No se encuentran empleados en la base
  test('Debe retornar mensaje si no hay empleados encontrados', async () => {
    repositorio.obtenerEmpleadosExportacion.mockResolvedValue([]);

    await controlador.exportarEmpleados(req, res);

    expect(repositorio.obtenerEmpleadosExportacion).toHaveBeenCalledWith(5, [1, 2]);
    expect(res.status).toHaveBeenCalledWith(MENSAJES_EMPLEADOS.EMPLEADOS_NO_ENCONTRADOS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_EMPLEADOS.EMPLEADOS_NO_ENCONTRADOS.mensaje,
      csv: '',
    });
  });

  // Escenario 3: Exportación exitosa
  test('Debe retornar CSV con empleados exportados correctamente', async () => {
    const empleadosMock = [
      {
        idEmpleado: 1,
        nombreCompleto: 'Juan Pérez',
        correoElectronico: 'juan@example.com',
        numeroTelefono: '1234567890',
        direccion: 'Calle Falsa 123',
        fechaNacimiento: '1990-01-01',
        genero: 'M',
        estatus: 'Activo',
        numeroEmergencia: '0987654321',
        areaTrabajo: 'Ventas',
        posicion: 'Ejecutivo',
        cantidadPuntos: 200,
        antiguedad: '2020-01-01',
      },
    ];

    repositorio.obtenerEmpleadosExportacion.mockResolvedValue(empleadosMock);

    await controlador.exportarEmpleados(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_EMPLEADOS.LISTA_EMPLEADOS_EXPORTADA.codigo);
    const csvLlamado = res.json.mock.calls[0][0].csv;

    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_EMPLEADOS.LISTA_EMPLEADOS_EXPORTADA.mensaje,
      csv: expect.stringContaining('Juan Pérez'), // Verifica contenido parcial
    });

    expect(csvLlamado.startsWith('\uFEFF')).toBe(true); // CSV debe tener BOM
  });

  // Escenario 4: Error inesperado
  test('Debe manejar errores del repositorio', async () => {
    repositorio.obtenerEmpleadosExportacion.mockRejectedValue(new Error('Error de DB'));

    await controlador.exportarEmpleados(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_EMPLEADOS.ERROR_EXPORTAR_EMPLEADOS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_EMPLEADOS.ERROR_EXPORTAR_EMPLEADOS.mensaje,
      csv: '',
    });
  });
});