/**
 * Mocks antes de importar el controlador
 */
jest.mock('@altertex/emp/repos/repositorioCrearGrupo', () => ({
    crearGrupoYAsignarEmpleados: jest.fn(),
  }));
  const repositorio = require('@altertex/emp/repos/repositorioCrearGrupo');
  
  const controlador = require('@altertex/emp/ctrl/crearGrupoEmpleados.controller');
  const MENSAJES = require('@altertex/util/const/mensajesEmpleados');
  
  describe("Controlador de Crear Grupo de Empleados", () => {
    let req;
    let res;
  
    const datosMock = {
      nombreGrupo: "Grupo A",
      descripcion: "Descripción de prueba",
      idCliente: 1,
      listaEmpleados: [10, 20, 30],
    };
  
    beforeEach(() => {
      jest.clearAllMocks();
      req = {
        body: { ...datosMock },
        user: {
          clienteSeleccionado: datosMock.idCliente,
        },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
  
    test("Debe crear un grupo exitosamente", async () => {
      const idGrupoMock = 999;
      repositorio.crearGrupoYAsignarEmpleados.mockResolvedValue({ idGrupo: idGrupoMock });
  
      await controlador.crearGrupoEmpleados(req, res);
  
      expect(repositorio.crearGrupoYAsignarEmpleados).toHaveBeenCalledWith(
        datosMock.nombreGrupo,
        datosMock.descripcion,
        datosMock.idCliente,
        datosMock.listaEmpleados
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        mensaje: MENSAJES.GRUPO_CREADO.mensaje,
        idGrupo: idGrupoMock,
      });
    });
  
    test("Debe manejar error por datos incompletos", async () => {
      req.body = {}; // Datos faltantes
      req.user = { clienteSeleccionado: 1 }; // Aseguramos que el user exista
  
      await controlador.crearGrupoEmpleados(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        mensaje: MENSAJES.DATOS_INCOMPLETOS.mensaje,
      });
      expect(repositorio.crearGrupoYAsignarEmpleados).not.toHaveBeenCalled();
    });
  
    test("Debe manejar error interno del servidor", async () => {
      repositorio.crearGrupoYAsignarEmpleados.mockRejectedValue(new Error("Fallo en DB"));
  
      await controlador.crearGrupoEmpleados(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        mensaje: MENSAJES.ERROR_CREAR_GRUPO.mensaje,
      });
    });
  });