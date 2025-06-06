/**
 * RF[15] Eliminar Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF15
 * Mocks antes de importar el controlador
 */
jest.mock('@altertex/cli/repos/repositorioEliminarCliente', () => ({
  eliminarClientePorId: jest.fn(),
}));
jest.mock('@altertex/util/ser/eliminarImagenS3', () => jest.fn());
jest.mock('@altertex/util/ser/extraerNombreArchivoS3', () => jest.fn());
jest.mock('@altertex/util/ser/correrQuery', () => jest.fn());

const controlador = require('@altertex/cli/ctrl/eliminarCliente.controller');
const repositorio = require('@altertex/cli/repos/repositorioEliminarCliente');
const eliminarImagenS3 = require('@altertex/util/ser/eliminarImagenS3');
const extraerNombreArchivoS3 = require('@altertex/util/ser/extraerNombreArchivoS3');
const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES_CLIENTES = require('@altertex/util/const/mensajesClientes');

describe('Controlador eliminarCliente', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: { idCliente: '3' },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Escenario 1: ID inválido
  test('Debe retornar error si el ID de cliente es inválido', async () => {
    req.body.idCliente = ' ';

    await controlador.eliminarCliente(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_CLIENTES.CLIENTE_INVALIDO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_CLIENTES.CLIENTE_INVALIDO.mensaje,
    });
  });

  // Escenario 2: Cliente no encontrado
  test('Debe retornar error si el cliente no existe', async () => {
    correrQuery.mockResolvedValue([]);
    repositorio.eliminarClientePorId.mockResolvedValue({ affectedRows: 0 });

    await controlador.eliminarCliente(req, res);

    expect(repositorio.eliminarClientePorId).toHaveBeenCalledWith(3);
    expect(res.status).toHaveBeenCalledWith(MENSAJES_CLIENTES.CLIENTE_NO_ENCONTRADO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_CLIENTES.CLIENTE_NO_ENCONTRADO.mensaje,
    });
  });

  // Escenario 3: Cliente eliminado correctamente con imagen
  test('Debe eliminar al cliente y su imagen si existe', async () => {
    correrQuery.mockResolvedValue([{ urlImagen: 'https://bucket.s3/cliente123.jpg' }]);
    extraerNombreArchivoS3.mockReturnValue('cliente123.jpg');
    repositorio.eliminarClientePorId.mockResolvedValue({ affectedRows: 1 });

    await controlador.eliminarCliente(req, res);

    expect(correrQuery).toHaveBeenCalled();
    expect(extraerNombreArchivoS3).toHaveBeenCalledWith('https://bucket.s3/cliente123.jpg');
    expect(eliminarImagenS3).toHaveBeenCalledWith('clientes/', 'cliente123.jpg');
    expect(res.status).toHaveBeenCalledWith(MENSAJES_CLIENTES.CLIENTE_ELIMINADO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_CLIENTES.CLIENTE_ELIMINADO.mensaje,
    });
  });

  // Escenario 4: Error inesperado
  test('Debe manejar errores inesperados en el try/catch', async () => {
    correrQuery.mockRejectedValue(new Error('DB error'));

    await controlador.eliminarCliente(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_CLIENTES.ERROR_ELIMINAR_CLIENTE.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_CLIENTES.ERROR_ELIMINAR_CLIENTE.mensaje,
    });
  });
});
