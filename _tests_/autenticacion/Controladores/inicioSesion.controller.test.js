/**
 *
 * RF78 - Iniciar Sesion - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF78
 *
 * Primero configuramos los mocks antes de importar el controlador
 */
jest.mock('@altertex/aut/repos/repositorioInicioSesion', () => ({
  obtenerUsuario: jest.fn(),
}));
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

// Mock del módulo de mensajes con los valores reales
jest.mock('@altertex/util/const/mensajesAutenticacion', () => ({
  INICIO_SESION_EXITOSO: {
    codigo: 200,
    mensaje: 'Inicio de sesión exitoso.',
  },
  CAMPOS_OBLIGATORIOS: {
    codigo: 400,
    mensaje: 'Se necesita ingresar correo y contraseña.',
  },
  FORMATO_CORREO_INVALIDO: {
    codigo: 400,
    mensaje: 'El formato del correo electrónico no es válido.',
  },
  CREDENCIALES_INVALIDAS: {
    codigo: 401,
    mensaje: 'Usuario o contraseña incorrectos.',
  },
  ERROR_SERVIDOR: {
    codigo: 500,
    mensaje: 'Ocurrió un error inesperado. Intente de nuevo más tarde.',
  },
}));

// Importamos los módulos después de configurar los mocks
const controladorInicioSesion = require('@altertex/aut/ctrl/inicioSesion.controller');
const repositorio = require('@altertex/aut/repos/repositorioInicioSesion');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const MENSAJES_AUTENTICACION = require('@altertex/util/const/mensajesAutenticacion');

// Mock para process.env
process.env.JWT_SECRET = 'secret_test_key';

describe('Controlador de Inicio de Sesión', () => {
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

  test('Debe retornar error 400 cuando faltan campos requeridos', async () => {
    // Arrange
    req.body = { correo: '', contrasenia: '' };

    // Act
    await controladorInicioSesion.inicioSesion(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(MENSAJES_AUTENTICACION.CAMPOS_OBLIGATORIOS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_AUTENTICACION.CAMPOS_OBLIGATORIOS.mensaje,
    });
  });

  test('Debe retornar error 400 cuando el formato de correo es inválido', async () => {
    // Arrange
    req.body = { correo: 'correo-invalido', contrasenia: 'password123' };

    // Act
    await controladorInicioSesion.inicioSesion(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(MENSAJES_AUTENTICACION.FORMATO_CORREO_INVALIDO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_AUTENTICACION.FORMATO_CORREO_INVALIDO.mensaje,
    });
  });

  test('Debe retornar error 401 cuando el usuario no existe', async () => {
    // Arrange
    req.body = { correo: 'usuario@ejemplo.com', contrasenia: 'password123' };

    repositorio.obtenerUsuario.mockResolvedValue({
      infoUsuario: [],
      permisos: [],
      clientesAsociados: [],
    });

    // Act
    await controladorInicioSesion.inicioSesion(req, res);

    // Assert
    expect(repositorio.obtenerUsuario).toHaveBeenCalledWith('usuario@ejemplo.com');
    expect(res.status).toHaveBeenCalledWith(MENSAJES_AUTENTICACION.CREDENCIALES_INVALIDAS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_AUTENTICACION.CREDENCIALES_INVALIDAS.mensaje,
    });
  });

  test('Debe retornar error 401 cuando la contraseña es incorrecta', async () => {
    // Arrange
    req.body = { correo: 'usuario@ejemplo.com', contrasenia: 'password123' };

    repositorio.obtenerUsuario.mockResolvedValue({
      infoUsuario: [
        {
          correoElectronico: 'usuario@ejemplo.com',
          contrasenia: 'hashed_password',
        },
      ],
      permisos: [],
      clientesAsociados: [],
    });

    bcrypt.compare.mockResolvedValue(false);

    // Act
    await controladorInicioSesion.inicioSesion(req, res);

    // Assert
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
    expect(res.status).toHaveBeenCalledWith(MENSAJES_AUTENTICACION.CREDENCIALES_INVALIDAS.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_AUTENTICACION.CREDENCIALES_INVALIDAS.mensaje,
    });
  });

  test('Debe retornar status 200 y generar token cuando las credenciales son correctas', async () => {
    // Arrange
    req.body = { correo: 'usuario@ejemplo.com', contrasenia: 'password123' };
    const mockUsuario = {
      correoElectronico: 'usuario@ejemplo.com',
      contrasenia: 'hashed_password',
    };
    const mockPermisos = ['permiso1', 'permiso2'];
    const mockClientesAsociados = [1, 2, 3];

    repositorio.obtenerUsuario.mockResolvedValue({
      infoUsuario: [mockUsuario],
      permisos: mockPermisos,
      clientesAsociados: mockClientesAsociados,
    });

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token_jwt_generado');

    // Act
    await controladorInicioSesion.inicioSesion(req, res);

    // Assert
    expect(jwt.sign).toHaveBeenCalledWith(
      {
        correo: 'usuario@ejemplo.com',
        permisos: mockPermisos,
        clientesAsociados: mockClientesAsociados,
      },
      'secret_test_key',
      { expiresIn: '8h' }
    );

    expect(res.cookie).toHaveBeenCalledWith('token', 'token_jwt_generado', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    expect(res.status).toHaveBeenCalledWith(MENSAJES_AUTENTICACION.INICIO_SESION_EXITOSO.codigo);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: MENSAJES_AUTENTICACION.INICIO_SESION_EXITOSO.mensaje,
    });
  });
});
