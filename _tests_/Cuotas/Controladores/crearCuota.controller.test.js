/**
 * Mocks antes de importar el controlador
 */
jest.mock('@altertex/cuota/ctrl/validarCuotaSet', () => ({
  validarCuotaSet: jest.fn(),
}));
jest.mock('@altertex/cuota/repos/crearCuotaRepositorio', () => ({
  crearCuota: jest.fn(),
}));

// Importar después de los mocks
const controladorCrearCuota = require('@altertex/cuota/ctrl/crearCuota.controller');
const { validarCuotaSet } = require('@altertex/cuota/ctrl/validarCuotaSet');
const { crearCuota } = require('@altertex/cuota/repos/crearCuotaRepositorio');

describe('Controlador de Crear Cuota', () => {
  let req;
  let res;
  let originalDate;

  const dataMock = {
    nombre: 'Plan Básico',
    descripcion: 'Plan básico para clientes nuevos',
    periodoRenovacion: 'mensual',
    renovacionHabilitada: true,
    productosYLimite: [
      { idProducto: 1, limite: 100, limiteActual: 100 },
      { idProducto: 2, limite: 50, limiteActual: 50 },
    ],
    idCliente: 102,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Guardar la Date original
    originalDate = global.Date;

    // Mock de fecha
    const mockDate = new Date('2023-05-15T00:00:00Z');
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    };

    // Mock de req y res
    req = {
      body: dataMock,
      user: {
        clienteSeleccionado: 102, // o el valor necesario para el controlador
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    // Restaurar Date original
    global.Date = originalDate;
  });

  test('Debe crear un cuota set exitosamente', async () => {
    const cuotaSetIdMock = 123;
    crearCuota.mockResolvedValue(cuotaSetIdMock);

    await controladorCrearCuota.crearCuota(req, res);

    expect(validarCuotaSet).toHaveBeenCalledWith(dataMock.nombre, dataMock.productosYLimite, res);

    expect(crearCuota).toHaveBeenCalledWith({
      ...dataMock,
      ultimaActualizacion: '2023-05-15',
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      exito: 'Cuota set creado exitosamente',
    });
  });

  test('Debe manejar errores de validación', async () => {
    // Simula que validarCuotaSet lanza un error
    validarCuotaSet.mockImplementation(() => {
      throw new Error('Error de validación');
    });

    await controladorCrearCuota.crearCuota(req, res);

    expect(validarCuotaSet).toHaveBeenCalled();
    expect(crearCuota).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Error creando cuota set',
        detalle: expect.stringContaining('Error de validación'),
      })
    );
  });
});
