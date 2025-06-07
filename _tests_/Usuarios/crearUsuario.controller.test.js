jest.mock('@altertex/usu/repos/repositorioCrearUsuario', () => ({
  crearUsuarioConAsociaciones: jest.fn(),
}));

const repositorio = require('@altertex/usu/repos/repositorioCrearUsuario');
const controlador = require('@altertex/usu/ctrl/crearUsuario.controller');
const MENSAJES_USUARIOS = require('@altertex/util/const/mensajesUsuarios');

describe('Controlador de Crear Usuario', () => {
  let req;
  let res;

  const datosMock = {
    nombreCompleto: 'María López',
    correoElectronico: 'maria@correo.com',
    contrasenia: 'Contrasenia1.',
    numeroTelefono: '5512345678',
    direccion: 'Calle Falsa 123',
    fechaNacimiento: '1990-01-01',
    genero: 'Femenino',
    estatus: true,
    idRol: 2,
    idCliente: [1],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    req = { body: { ...datosMock } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test('Debe crear un usuario exitosamente', async () => {
    repositorio.crearUsuarioConAsociaciones.mockResolvedValue({ idUsuario: 101 });

    await controlador.crearUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_USUARIOS.USUARIO_CREADO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_USUARIOS.USUARIO_CREADO.mensaje,
      idUsuario: 101,
    });
    expect(repositorio.crearUsuarioConAsociaciones).toHaveBeenCalled();
  });

  test('Debe rechazar si faltan campos requeridos', async () => {
    req.body = { ...datosMock, nombreCompleto: undefined };

    await controlador.crearUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Faltan campos requeridos' });
  });

  test('Debe rechazar correo inválido', async () => {
    req.body.correoElectronico = 'correo-no-valido';

    await controlador.crearUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_USUARIOS.CORREO_INVALIDO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_USUARIOS.CORREO_INVALIDO.mensaje,
    });
  });

  test('Debe rechazar contraseña débil (sin mayúscula)', async () => {
    req.body.contrasenia = 'contrasenia$1';

    await controlador.crearUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_USUARIOS.CONTRASENA_DEBIL.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'La contraseña debe contener al menos una letra mayúscula.',
    });
  });

  test('Debe rechazar número telefónico inválido', async () => {
    req.body.numeroTelefono = 'abc123';

    await controlador.crearUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_USUARIOS.TELEFONO_INVALIDO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_USUARIOS.TELEFONO_INVALIDO.mensaje,
    });
  });

  test('Debe manejar error del repositorio', async () => {
    repositorio.crearUsuarioConAsociaciones.mockRejectedValue(new Error('Fallo'));

    await controlador.crearUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(MENSAJES_USUARIOS.ERROR_CREAR_USUARIO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_USUARIOS.ERROR_CREAR_USUARIO.mensaje,
    });
  });
});
