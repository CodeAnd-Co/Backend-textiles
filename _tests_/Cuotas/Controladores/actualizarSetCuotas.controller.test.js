/**
 * Mocks antes de importar el controlador
 */
jest.mock('@altertex/cuota/repos/actualizarSetCuotasRepositorio', () => ({
  actualizarSetCuotas: jest.fn(),
}));

const controladorActualizarSetCuotas = require('@altertex/cuota/ctrl/actualizarSetCuotas.controller');
const repositorio = require('@altertex/cuota/repos/actualizarSetCuotasRepositorio');

describe('Controlador de Actualizar Set de Cuotas', () => {
  let req;
  let res;

  const dataMockCompleto = {
    idCuotaSet: 123,
    cambios: {
      nombre: 'Plan Premium Actualizado',
      descripcion: 'Plan premium con nuevas características',
      periodoRenovacion: 12,
      renovacionHabilitada: true,
      productos: [
        { idProducto: 1, limite: 200, limiteActual: 150 },
        { idProducto: 2, limite: 100, limiteActual: 75 },
        { idProducto: 3, limite: 50, limiteActual: 25 }
      ]
    }
  };

  const dataMockSinProductos = {
    idCuotaSet: 456,
    cambios: {
      nombre: 'Plan Básico Actualizado',
      descripcion: 'Plan básico sin productos',
      periodoRenovacion: 1,
      renovacionHabilitada: false,
      productos: []
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test('Debe actualizar un set de cuotas exitosamente con productos', async () => {
    req.body = dataMockCompleto;
    repositorio.actualizarSetCuotas.mockResolvedValue();

    await controladorActualizarSetCuotas.actualizarSetCuotas(req, res);

    expect(repositorio.actualizarSetCuotas).toHaveBeenCalledWith(
      123,
      dataMockCompleto.cambios
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Set de cuotas actualizado correctamente'
    });
  });

  test('Debe actualizar un set de cuotas exitosamente sin productos', async () => {
    req.body = dataMockSinProductos;
    repositorio.actualizarSetCuotas.mockResolvedValue();

    await controladorActualizarSetCuotas.actualizarSetCuotas(req, res);

    expect(repositorio.actualizarSetCuotas).toHaveBeenCalledWith(
      456,
      dataMockSinProductos.cambios
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Set de cuotas actualizado correctamente'
    });
  });

  test('Debe retornar error 400 cuando falta idCuotaSet', async () => {
    req.body = {
      cambios: dataMockCompleto.cambios
    };

    await controladorActualizarSetCuotas.actualizarSetCuotas(req, res);

    expect(repositorio.actualizarSetCuotas).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Datos incompletos'
    });
  });

  test('Debe retornar error 400 cuando faltan cambios', async () => {
    req.body = {
      idCuotaSet: 123
    };

    await controladorActualizarSetCuotas.actualizarSetCuotas(req, res);

    expect(repositorio.actualizarSetCuotas).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Datos incompletos'
    });
  });

  test('Debe retornar error 400 cuando idCuotaSet es null', async () => {
    req.body = {
      idCuotaSet: null,
      cambios: dataMockCompleto.cambios
    };

    await controladorActualizarSetCuotas.actualizarSetCuotas(req, res);

    expect(repositorio.actualizarSetCuotas).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Datos incompletos'
    });
  });

  test('Debe retornar error 400 cuando cambios es null', async () => {
    req.body = {
      idCuotaSet: 123,
      cambios: null
    };

    await controladorActualizarSetCuotas.actualizarSetCuotas(req, res);

    expect(repositorio.actualizarSetCuotas).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Datos incompletos'
    });
  });

  test('Debe retornar error 400 cuando el body está vacío', async () => {
    req.body = {};

    await controladorActualizarSetCuotas.actualizarSetCuotas(req, res);

    expect(repositorio.actualizarSetCuotas).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Datos incompletos'
    });
  });

  test('Debe manejar errores del repositorio y retornar error 500', async () => {
    req.body = dataMockCompleto;
    const errorMensaje = 'Error de conexión a la base de datos';
    repositorio.actualizarSetCuotas.mockRejectedValue(new Error(errorMensaje));

    await controladorActualizarSetCuotas.actualizarSetCuotas(req, res);

    expect(repositorio.actualizarSetCuotas).toHaveBeenCalledWith(
      123,
      dataMockCompleto.cambios
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: errorMensaje
    });
  });

  test('Debe manejar errores de validación SQL y retornar error 500', async () => {
    req.body = dataMockCompleto;
    const errorSQL = 'Constraint violation: Foreign key constraint fails';
    repositorio.actualizarSetCuotas.mockRejectedValue(new Error(errorSQL));

    await controladorActualizarSetCuotas.actualizarSetCuotas(req, res);

    expect(repositorio.actualizarSetCuotas).toHaveBeenCalledWith(
      123,
      dataMockCompleto.cambios
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: errorSQL
    });
  });

  test('Debe actualizar correctamente con idCuotaSet como string numérico', async () => {
    req.body = {
      idCuotaSet: '789', 
      cambios: dataMockCompleto.cambios
    };
    repositorio.actualizarSetCuotas.mockResolvedValue();

    await controladorActualizarSetCuotas.actualizarSetCuotas(req, res);

    expect(repositorio.actualizarSetCuotas).toHaveBeenCalledWith(
      '789',
      dataMockCompleto.cambios
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Set de cuotas actualizado correctamente'
    });
  });

  test('Debe manejar productos con idProducto en 0 o negativos', async () => {
    req.body = {
      idCuotaSet: 123,
      cambios: {
        nombre: 'Test',
        descripcion: 'Test desc',
        periodoRenovacion: 1,
        renovacionHabilitada: true,
        productos: [
          { idProducto: 0, limite: 100, limiteActual: 50 },
          { idProducto: -1, limite: 200, limiteActual: 100 },
          { idProducto: 1, limite: 300, limiteActual: 150 }
        ]
      }
    };
    repositorio.actualizarSetCuotas.mockResolvedValue();

    await controladorActualizarSetCuotas.actualizarSetCuotas(req, res);

    expect(repositorio.actualizarSetCuotas).toHaveBeenCalledWith(
      123,
      req.body.cambios
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Set de cuotas actualizado correctamente'
    });
  });
});