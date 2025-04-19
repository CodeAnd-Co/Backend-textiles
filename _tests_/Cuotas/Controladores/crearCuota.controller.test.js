/**
 *
 * Primero configuramos los mocks antes de importar el controlador
 */

jest.mock("@altertex/cuota/ctrl/validarCuotaSet", () => ({
  validarCuotaSet: jest.fn(),
}));
jest.mock("@altertex/cuota/repos/crearCuotaRepositorio", () => ({
  crearCuota: jest.fn(),
}));

// Importamos los módulos después de configurar los mocks
const controladorCrearCuota = require("@altertex/cuota/ctrl/crearCuota.controller");
const { validarCuotaSet } = require("@altertex/cuota/ctrl/validarCuotaSet");
const repositorio = require("@altertex/cuota/repos/crearCuotaRepositorio");

describe("Controlador de Crear Cuota", () => {
  let req;
  let res;
  let dataMock;

  beforeEach(() => {
    // Reset de los mocks
    jest.clearAllMocks();

    // Fecha mock para pruebas
    const mockDate = new Date("2023-05-15");
    global.Date = jest.fn(() => mockDate);
    global.Date.toISOString = mockDate.toISOString.bind(mockDate);

    // Mock de req y res
    dataMock = {
      nombre: "Plan Básico",
      descripcion: "Plan básico para clientes nuevos",
      periodoRenovacion: "mensual",
      renovacionHabilitada: true,
      idCliente: 102,
      productosYLimite: [
        { idProducto: 1, limite: 100, limiteActual: 100 },
        { idProducto: 2, limite: 50, limiteActual: 50 },
      ],
    };

    req = {
      body: dataMock,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    // Restaurar la implementación original de Date
    global.Date = Date;
  });

  test("Debe crear un cuota set exitosamente", async () => {
    // Arrange
    const cuotaSetIdMock = 123;
    repositorio.crearCuota.mockResolvedValue(cuotaSetIdMock);

    // Act
    await controladorCrearCuota.crearCuota(req, res);

    // Assert
    // Verificar que se llamó a validarCuotaSet con los parámetros correctos
    expect(validarCuotaSet).toHaveBeenCalledWith(
      dataMock.nombre,
      dataMock.productosYLimite
    );

    // Verificar que se llamó a crearCuota con el modelo que incluye la fecha de actualización
    const expectedModel = {
      ...dataMock,
      ultimaActualizacion: "2023-05-15",
    };
    expect(repositorio.crearCuota).toHaveBeenCalledWith(expectedModel);

    // Verificar respuesta
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: "Cuota set creado exitosamente",
      resultado: cuotaSetIdMock,
    });
  });

  test("Debe manejar errores de validación", async () => {
    // Arrange
    validarCuotaSet.mockImplementation(() => {
      throw new Error("Error de validación");
    });

    // Act
    await controladorCrearCuota.crearCuota(req, res);

    // Assert
    expect(validarCuotaSet).toHaveBeenCalled();
    expect(repositorio.crearCuota).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: "Error creando cuota set",
    });
  });
});
