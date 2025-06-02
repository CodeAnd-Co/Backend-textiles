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

  test('Campos requeridos vacíos', async () => {
    // Arrange - Solo faltan los campos requeridos
    req.body = {
      idCliente: '',
      nombre: '',
      descripcion: '', // Opcional - está bien que esté vacío
      puntos: '',
      multiplicador: '',
      periodoRenovacion: '', // Opcional - está bien que esté vacío
      renovacion: false,
    };

    // Act
    await crearEvento(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      codigo: MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo,
      mensaje: MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.mensaje,
    });
  });

  test('Evento con campos opcionales vacíos', async () => {
    // Arrange - Campos requeridos llenos, opcionales vacíos
    req.body = {
      idCliente: '1',
      nombre: 'Evento de prueba',
      descripcion: '', // Campo opcional vacío
      puntos: '100',
      multiplicador: '1.5',
      periodoRenovacion: '', // Campo opcional vacío
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
      descripcion: null, // Se convierte a null cuando está vacío
      puntos: 100,
      multiplicador: 1.5,
      periodoRenovacion: null, // Se convierte a null cuando está vacío
      renovacion: 1,
    });
    
    expect(res.status).toHaveBeenCalledWith(MENSAJES_EVENTOS.EVENTO_CREADO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      codigo: MENSAJES_EVENTOS.EVENTO_CREADO.codigo,
      mensaje: MENSAJES_EVENTOS.EVENTO_CREADO.mensaje,
      evento: eventoCreado,
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
    expect(res.status).toHaveBeenCalledWith(MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      codigo: MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo,
      mensaje: 'El ID del cliente debe ser un número válido mayor a 0.',
    });
  });
  
  test('Cliente inexistente (error del repositorio)', async () => {
    // Arrange
    req.body = {
      idCliente: '999',
      nombre: 'Evento de prueba',
      descripcion: 'Descripción del evento',
      puntos: '100',
      multiplicador: '1.5',
      periodoRenovacion: 'mensual',
      renovacion: true,
    };
    
    // Simulamos un error específico del repositorio
    repositorio.crearEvento.mockRejectedValue(new Error(MENSAJES_EVENTOS.ERROR_CLIENTE_NO_EXISTE.mensaje));

    // Act
    await crearEvento(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      codigo: MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.codigo,
      mensaje: MENSAJES_EVENTOS.ERROR_CLIENTE_NO_EXISTE.mensaje,
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
