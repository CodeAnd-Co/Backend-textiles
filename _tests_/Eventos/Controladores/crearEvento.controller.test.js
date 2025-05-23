// Mock del repositorio
jest.mock('@altertex/eve/repos/repositorioCrearEvento', () => ({
  crearEvento: jest.fn(),
}));

// Función a probar
const { crearEvento } = require('@altertex/eve/ctrl/crearEvento.controller');
const repositorio = require('@altertex/eve/repos/repositorioCrearEvento'); // Mock del repositorio
const MENSAJES_EVENTOS = require('@altertex/util/const/mensajesEventos');

// Pruebas
describe('Controlador de Crear Evento', () => {
  let req;
  let res;

  beforeEach(() => {
    // Reset de los mocks
    jest.clearAllMocks();

    // Mock de req y res
    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
  });

  test('Campos vacíos', async () => {
    // Arrange
    req.body = {
      idCliente: '',
      nombre: '',
      descripcion: '',
      puntos: '',
      multiplicador: '',
      periodoRenovacion: '',
      renovacion: '',
    };

    // Act
    await crearEvento(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      codigo: MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.codigo,
      mensaje: MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.mensaje,
    });
  });

  test('Campos inválidos', async () => {
    // Arrange
    req.body = {
      idCliente: 'abc',
      nombre: 'Evento de prueba',
      descripcion: 'Descripción del evento',
      puntos: 'cien',
      multiplicador: 'uno punto cinco',
      periodoRenovacion: 'mensual',
      renovacion: 'sí',
    };

    // Act
    await crearEvento(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      codigo: MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.codigo,
      mensaje: MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.mensaje,
    });
  });
  
  test('Evento creado exitosamente', async () => {
    // Arrange
    req.body = {
      idCliente: '1',
      nombre: 'Evento de prueba',
      descripcion: 'Descripción del evento',
      puntos: '100',
      multiplicador: '1.5',
      periodoRenovacion: 'mensual',
      renovacion: true,
    };
    
    const eventoCreado = { 
      id: 1, 
      nombre: 'Evento de prueba' 
    };
    
    repositorio.crearEvento.mockResolvedValue({ evento: eventoCreado });

    // Act
    await crearEvento(req, res);

    // Assert
    expect(repositorio.crearEvento).toHaveBeenCalledWith({
      idCliente: 1,
      nombre: 'Evento de prueba',
      descripcion: 'Descripción del evento',
      puntos: 100,
      multiplicador: 1.5,
      periodoRenovacion: 'mensual',
      renovacion: 1,
    });
    
    expect(res.status).toHaveBeenCalledWith(MENSAJES_EVENTOS.EVENTO_CREADO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      codigo: MENSAJES_EVENTOS.EVENTO_CREADO.codigo,
      mensaje: MENSAJES_EVENTOS.EVENTO_CREADO.mensaje,
      evento: eventoCreado,
    });
  });
});
