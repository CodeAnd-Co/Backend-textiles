/**
 * RF78 - Iniciar Sesion - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF78
 *
 * Primero configuramos los mocks
 */
jest.mock("@altertex/util/ser/correrQuery", () => jest.fn());

jest.mock("@altertex/util/const/consultasUsuarios", () => ({
  OBTENER_USUARIO: "SELECT * FROM usuarios WHERE correoElectronico = ?",
  OBTENER_PERMISOS: "SELECT nombre FROM permisos WHERE correoElectronico = ?",
  OBTENER_CLIENTES_ASOCIADOS:
    "SELECT idCliente FROM clientes_usuarios WHERE correoElectronico = ?",
}));

// Importamos después de configurar los mocks
const repositorio = require("@altertex/aut/repos/repositorioInicioSesion");
const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_USUARIOS = require("@altertex/util/const/consultasUsuarios");

describe("Repositorio de Inicio de Sesión", () => {
  beforeEach(() => {
    // Limpiar los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  test("obtenerUsuario debe retornar información del usuario, permisos y clientes asociados", async () => {
    // Arrange
    const correoElectronico = "usuario@ejemplo.com";
    const mockUsuario = [
      {
        id: 1,
        nombre: "Usuario Test",
        correoElectronico,
        contrasenia: "hashed_password",
      },
    ];
    const mockPermisos = [{ nombre: "admin" }, { nombre: "usuario" }];
    const mockClientesAsociados = [{ idCliente: 1 }, { idCliente: 2 }];

    // Configuramos el comportamiento del mock para cada llamada
    correrQuery
      .mockResolvedValueOnce(mockUsuario)
      .mockResolvedValueOnce(mockPermisos)
      .mockResolvedValueOnce(mockClientesAsociados);

    // Act
    const resultado = await repositorio.obtenerUsuario(correoElectronico);

    // Assert
    expect(correrQuery).toHaveBeenCalledTimes(3);
    expect(correrQuery).toHaveBeenNthCalledWith(
      1,
      CONSULTAS_USUARIOS.OBTENER_USUARIO,
      [correoElectronico]
    );
    expect(correrQuery).toHaveBeenNthCalledWith(
      2,
      CONSULTAS_USUARIOS.OBTENER_PERMISOS,
      [correoElectronico]
    );
    expect(correrQuery).toHaveBeenNthCalledWith(
      3,
      CONSULTAS_USUARIOS.OBTENER_CLIENTES_ASOCIADOS,
      [correoElectronico]
    );

    expect(resultado).toEqual({
      infoUsuario: mockUsuario,
      permisos: ["admin", "usuario"],
      clientesAsociados: [1, 2],
    });
  });

  test("obtenerUsuario debe manejar errores correctamente", async () => {
    // Arrange
    const correoElectronico = "usuario@ejemplo.com";
    const errorMessage = "Error en la base de datos";

    correrQuery.mockRejectedValue(new Error(errorMessage));

    // Act
    const resultado = await repositorio.obtenerUsuario(correoElectronico);

    // Assert
    expect(correrQuery).toHaveBeenCalledWith(
      CONSULTAS_USUARIOS.OBTENER_USUARIO,
      [correoElectronico]
    );
    expect(resultado).toBe(`Error obteniendo usuario`);
  });
});
