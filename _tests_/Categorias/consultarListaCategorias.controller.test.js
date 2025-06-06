/**
 * RF[47] Consulta Lista de Categorías - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47
 * Mocks antes de importar el controlador
 */
jest.mock('@altertex/cat/repos/repositorioConsultarListaCategorias', () => ({
  consultarListaCategorias: jest.fn(),
}));

// Importar después del mock
const controlador = require('@altertex/cat/ctrl/consultarListaCategorias.controller');
const repositorio = require('@altertex/cat/repos/repositorioConsultarListaCategorias');
const MENSAJES_CATEGORIAS = require('@altertex/util/const/mensajesCategorias');

describe('Controlador consultarListaCategorias', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      user: {
        clienteSeleccionado: '3',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(console, 'error').mockImplementation(() => {}); // Evita logs
  });

  // Escenario 1: No se encuentran categorías
  test('Debe retornar mensaje cuando no hay categorías encontradas', async () => {
    repositorio.consultarListaCategorias.mockResolvedValue([]);

    await controlador.consultarListaCategorias(req, res);

    expect(repositorio.consultarListaCategorias).toHaveBeenCalledWith(3);
    expect(res.status).toHaveBeenCalledWith(MENSAJES_CATEGORIAS.CATEGORIAS_NO_ENCONTRADAS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_CATEGORIAS.CATEGORIAS_NO_ENCONTRADAS.mensaje,
    });
  });

  // Escenario 2: Lista de categorías obtenida correctamente
  test('Debe retornar la lista de categorías cuando se obtienen con éxito', async () => {
    const mockCategorias = [
      {
        idCategoria: 1,
        nombre: 'Camisas',
        productos: ['Camisa A', 'Camisa B'],
      },
      {
        idCategoria: 2,
        nombre: 'Pantalones',
        productos: ['Pantalón X'],
      },
    ];

    repositorio.consultarListaCategorias.mockResolvedValue(mockCategorias);

    await controlador.consultarListaCategorias(req, res);

    expect(repositorio.consultarListaCategorias).toHaveBeenCalledWith(3);
    expect(res.status).toHaveBeenCalledWith(MENSAJES_CATEGORIAS.LISTA_CATEGORIAS_OBTENIDA.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_CATEGORIAS.LISTA_CATEGORIAS_OBTENIDA.mensaje,
      listaCategoria: mockCategorias,
    });
  });

  // Escenario 3: Error inesperado en el repositorio
  test('Debe manejar errores si falla el repositorio', async () => {
    repositorio.consultarListaCategorias.mockRejectedValue(
      new Error('Error de base de datos')
    );

    await controlador.consultarListaCategorias(req, res);

    expect(repositorio.consultarListaCategorias).toHaveBeenCalledWith(3);
    expect(res.status).toHaveBeenCalledWith(MENSAJES_CATEGORIAS.ERROR_OBTENER_CATEGORIAS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_CATEGORIAS.ERROR_OBTENER_CATEGORIAS.mensaje,
    });
  });
});