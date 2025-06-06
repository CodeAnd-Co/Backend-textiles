/**
 * RF[13] Leer Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf13/
 * Mocks antes de importar el controlador
 */
jest.mock('@altertex/cli/repos/repositorioLeerCliente', () => ({
  obtenerClientePorId: jest.fn(),
}));
jest.mock('@altertex/util/ser/obtenerImagenCliente', () => jest.fn());

const controlador = require('@altertex/cli/ctrl/leerCliente.controller');
const repositorio = require('@altertex/cli/repos/repositorioLeerCliente');
const obtenerImagenCliente = require('@altertex/util/ser/obtenerImagenCliente');
const MENSAJES_CLIENTES = require('@altertex/util/const/mensajesClientes');

describe('Controlador leerCliente', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: { idCliente: '7' },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Escenario 1: ID inválido
  test('Debe retornar error si el ID es inválido', async () => {
    req.body.idCliente = ' ';

    await controlador.leerCliente(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_CLIENTES.PARAMETROS_INVALIDOS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_CLIENTES.PARAMETROS_INVALIDOS.mensaje,
    });
  });

  // Escenario 2: Cliente no encontrado
  test('Debe retornar error si el cliente no existe', async () => {
    repositorio.obtenerClientePorId.mockResolvedValue(null);

    await controlador.leerCliente(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_CLIENTES.CLIENTE_NO_ENCONTRADO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_CLIENTES.CLIENTE_NO_ENCONTRADO.mensaje,
    });
  });

  // Escenario 3: Cliente encontrado con imagen exitosa
  test('Debe retornar cliente completo con imagen si todo funciona bien', async () => {
    const mockCliente = {
      idCliente: 7,
      nombreLegal: 'Tech S.A.',
      nombreVisible: 'Tech Store',
      empleados: [],
      usuariosAsignados: [],
      numeroEmpleados: 10,
      urlImagen: 'https://bucket.s3/cliente.jpg',
    };

    repositorio.obtenerClientePorId.mockResolvedValue(mockCliente);
    obtenerImagenCliente.mockResolvedValue('https://signed-url.com/cliente.jpg');

    await controlador.leerCliente(req, res);

    expect(obtenerImagenCliente).toHaveBeenCalledWith(mockCliente.urlImagen);
    expect(res.status).toHaveBeenCalledWith(MENSAJES_CLIENTES.CONSULTA_EXITOSA.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_CLIENTES.CONSULTA_EXITOSA.mensaje,
      cliente: {
        ...mockCliente,
        imagenCliente: 'https://signed-url.com/cliente.jpg',
      },
    });
  });

  // Escenario 4: Cliente encontrado, pero falla obtenerImagenCliente
  test('Debe retornar imagen placeholder si obtenerImagenCliente falla', async () => {
    const mockCliente = {
      idCliente: 7,
      nombreLegal: 'Tech S.A.',
      nombreVisible: 'Tech Store',
      empleados: [],
      usuariosAsignados: [],
      numeroEmpleados: 10,
      urlImagen: 'https://bucket.s3/cliente.jpg',
    };

    repositorio.obtenerClientePorId.mockResolvedValue(mockCliente);
    obtenerImagenCliente.mockRejectedValue(new Error('Fallo S3'));

    await controlador.leerCliente(req, res);

    expect(obtenerImagenCliente).toHaveBeenCalledWith(mockCliente.urlImagen);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_CLIENTES.CONSULTA_EXITOSA.mensaje,
      cliente: {
        ...mockCliente,
        imagenCliente: '/placeholder.png',
      },
    });
  });

  // Escenario 5: Error inesperado
  test('Debe manejar error inesperado del repositorio', async () => {
    repositorio.obtenerClientePorId.mockRejectedValue(new Error('DB error'));

    await controlador.leerCliente(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_CLIENTES.ERROR_CONSULTAR_CLIENTE.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_CLIENTES.ERROR_CONSULTAR_CLIENTE.mensaje,
    });
  });
});