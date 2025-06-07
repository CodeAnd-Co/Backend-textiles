// Mocks antes de importar el controlador
jest.mock('@altertex/setspro/repos/repositorioConsultarSetsProductos', () => ({
  obtenerSetsProductos: jest.fn(),
}));

// Importaciones
const controlador = require('@altertex/setspro/ctrl/consultarSetsProductos.controller');
const repositorio = require('@altertex/setspro/repos/repositorioConsultarSetsProductos');
const MENSAJES = require('@altertex/util/const/mensajesSetsProductos');

describe('Controlador consultarLista (sets de productos)', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      user: {
        clienteSeleccionado: '101',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(console, 'error').mockImplementation(() => {}); // Silenciar errores
  });

  // Escenario 1: ID de cliente inválido
  test('Debe retornar error si el ID del cliente no es válido', async () => {
    req.user.clienteSeleccionado = undefined;

    await controlador.consultarLista(req, res);
    expect(res.status).toHaveBeenCalledWith(MENSAJES.PARAMETROS_INVALIDOS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES.PARAMETROS_INVALIDOS.mensaje,
    });
  });

  // Escenario 2: Lista de sets obtenida exitosamente
  test('Debe retornar la lista de sets si la consulta es exitosa', async () => {
    const mockSets = [
      {
        idSet: 1,
        nombre: 'Set A',
        productos: ['Producto 1', 'Producto 2'],
      },
      {
        idSet: 2,
        nombre: 'Set B',
        productos: ['Producto 3'],
      },
    ];

    repositorio.obtenerSetsProductos.mockResolvedValue(mockSets);

    await controlador.consultarLista(req, res);

    expect(repositorio.obtenerSetsProductos).toHaveBeenCalledWith(101);
    expect(res.status).toHaveBeenCalledWith(MENSAJES.CONSULTA_EXITOSA.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES.CONSULTA_EXITOSA.mensaje,
      setsProductos: mockSets,
    });
  });

  // Escenario 3: Error inesperado en el repositorio
  test('Debe manejar errores inesperados del repositorio', async () => {
    repositorio.obtenerSetsProductos.mockRejectedValue(new Error('Error'));

    await controlador.consultarLista(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES.ERROR_CONSULTAR_SETS_PRODUCTOS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES.ERROR_CONSULTAR_SETS_PRODUCTOS.mensaje,
    });
  });
});
