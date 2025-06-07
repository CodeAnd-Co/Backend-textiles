const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const MENSAJES = require('@altertex/util/const/mensajesSetsProductos');

jest.mock('@altertex/setspro/repos/repositorioActualizarSetsProductos', () => ({
  actualizarSetProductos: jest.fn()
}));

const repositorio = require('@altertex/setspro/repos/repositorioActualizarSetsProductos');
const controller = require('@altertex/setspro/ctrl/actualizarSetsProductos.controller');

const app = express();
app.use(bodyParser.json());

// 👇 Middleware para simular usuario con cliente seleccionado
app.use((req, res, next) => {
  req.user = { clienteSeleccionado: 1 };
  next();
});

app.put('/sets-productos', controller.actualizarSetProductos);

describe('Controlador actualizarSetProductos', () => {
  // Silenciar console.error durante las pruebas para evitar ruido en la salida
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Restaurar el comportamiento original de console.error
  afterAll(() => {
    console.error.mockRestore();
  });

  // Limpia los mocks después de cada test
  afterEach(() => jest.clearAllMocks());

  it('debe devolver 400 si faltan campos requeridos', async () => {
    const res = await request(app).put('/sets-productos').send({
      nombre: 'Set incompleto'
    });

    expect(res.statusCode).toBe(MENSAJES.FORMATO_INVALIDO_DATOS.codigo);
    expect(res.body.mensaje).toBe(MENSAJES.FORMATO_INVALIDO_DATOS.mensaje);
    expect(res.body.detalles).toMatch(/nombre y lista de productos/i);
  });

  it('debe devolver 200 si la actualización es exitosa', async () => {
    repositorio.actualizarSetProductos.mockResolvedValue();

    const datos = {
      idSetProducto: 1,
      nombre: 'Set Actualizado',
      descripcion: 'Nueva descripción',
      activo: true,
      productos: [101, 102]
    };

    const res = await request(app).put('/sets-productos').send(datos);

    expect(res.statusCode).toBe(MENSAJES.SET_ACTUALIZADO.codigo);
    expect(res.body.mensaje).toBe(MENSAJES.SET_ACTUALIZADO.mensaje);
    expect(res.body.datos).toEqual(datos);
    expect(repositorio.actualizarSetProductos).toHaveBeenCalledWith(1, datos);
  });

  it('debe devolver 500 si el repositorio lanza un error', async () => {
    repositorio.actualizarSetProductos.mockRejectedValue(new Error('Fallo DB'));

    const datos = {
      idSetProducto: 2,
      nombre: 'Set con error',
      descripcion: 'desc',
      activo: false,
      productos: []
    };

    const res = await request(app).put('/sets-productos').send(datos);

    expect(res.statusCode).toBe(MENSAJES.ERROR_ACTUALIZAR_SET.codigo);
    expect(res.body.mensaje).toBe('Fallo DB');
  });
});
