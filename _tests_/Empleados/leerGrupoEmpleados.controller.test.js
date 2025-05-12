/**
 * RF[23] Lee grupo de empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF23
 * Mocks antes de importar el controlador
 */
jest.mock('@altertex/emp/repos/repositorioLeerGrupoDeEmpleados', () => ({
  obtenerGrupoEmpleadosPorId: jest.fn(),
}));

// Importar después de los mocks
const controladorLeerGrupoEmpleados = require('@altertex/emp/ctrl/leerGrupoEmpleados.controller');
const repositorio = require('@altertex/emp/repos/repositorioLeerGrupoDeEmpleados');
const MENSAJES_GRUPO_EMPLEADOS = require('@altertex/util/const/mensajesGrupoEmpleados');

describe('Controlador de Leer Grupo de Empleados', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock de req y res
    req = {
      body: {
        idGrupo: 5,
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Evitar mostrar errores en consola durante las pruebas
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Escenario 1: ID de grupo inválido
  test('Debe retornar error cuando el ID de grupo es inválido', async () => {
    req.body.idGrupo = 'invalido';

    await controladorLeerGrupoEmpleados.leerGrupoEmpleados(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_GRUPO_EMPLEADOS.PARAMETROS_INVALIDOS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_GRUPO_EMPLEADOS.PARAMETROS_INVALIDOS.mensaje,
    });
  });

  // Escenario 2: Grupo no encontrado en la base de datos
  test('Debe retornar error cuando el grupo no es encontrado', async () => {
    repositorio.obtenerGrupoEmpleadosPorId.mockResolvedValue(null);

    await controladorLeerGrupoEmpleados.leerGrupoEmpleados(req, res);

    expect(repositorio.obtenerGrupoEmpleadosPorId).toHaveBeenCalledWith(5);
    expect(res.status).toHaveBeenCalledWith(MENSAJES_GRUPO_EMPLEADOS.GRUPO_NO_ENCONTRADO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_GRUPO_EMPLEADOS.GRUPO_NO_ENCONTRADO.mensaje,
    });
  });

  // Escenario 3: Grupo encontrado exitosamente
  test('Debe retornar el grupo cuando es encontrado exitosamente', async () => {
    const mockGrupo = {
      idGrupo: 5,
      nombre: 'Grupo de Ventas',
      descripcion: 'Equipo de ventas regional',
      setsProductos: ['Producto A', 'Producto B'],
      empleados: ['Juan Pérez', 'Ana García'],
    };

    repositorio.obtenerGrupoEmpleadosPorId.mockResolvedValue(mockGrupo);

    await controladorLeerGrupoEmpleados.leerGrupoEmpleados(req, res);

    expect(repositorio.obtenerGrupoEmpleadosPorId).toHaveBeenCalledWith(5);
    expect(res.status).toHaveBeenCalledWith(MENSAJES_GRUPO_EMPLEADOS.GRUPO_OBTENIDO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_GRUPO_EMPLEADOS.GRUPO_OBTENIDO.mensaje,
      grupoEmpleados: mockGrupo,
    });
  });

  // Escenario 4: Error al obtener el grupo (excepción en el repositorio)
  test('Debe manejar errores en la consulta al repositorio', async () => {
    repositorio.obtenerGrupoEmpleadosPorId.mockRejectedValue(
      new Error('Error en la base de datos')
    );

    await controladorLeerGrupoEmpleados.leerGrupoEmpleados(req, res);

    expect(repositorio.obtenerGrupoEmpleadosPorId).toHaveBeenCalledWith(5);
    expect(res.status).toHaveBeenCalledWith(MENSAJES_GRUPO_EMPLEADOS.ERROR_OBTENER_GRUPO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_GRUPO_EMPLEADOS.ERROR_OBTENER_GRUPO.mensaje,
    });
  });
});
