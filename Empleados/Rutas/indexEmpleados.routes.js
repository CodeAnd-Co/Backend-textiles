const express = require('express');
const ruteador = express.Router();
const rutasConsultarListaGrupos = require('@altertex/emp/rutasInd/consultarListaGrupos.routes');
const rutasCrearEmpleado = require('@altertex/emp/rutasInd/crearEmpleado.routes');
const rutasConsultarLista = require('@altertex/emp/rutasInd/consultarLista.routes');
const rutasEliminarGrupo = require('@altertex/emp/rutasInd/eliminarGrupoEmpleados.routes');
const rutasEliminarEmpleado = require('@altertex/emp/rutasInd/eliminarEmpleado.routes');
const rutasImportarEmpleados = require('@altertex/emp/rutasInd/importarEmpleados.routes');
const rutasExportarEmpleados = require('@altertex/emp/rutasInd/exportarEmpleados.routes');
const rutasLeerGrupoEmpleados = require('@altertex/emp/rutasInd/leerGrupoEmpleados.routes');
const rutasCrearGrupo = require('@altertex/emp/rutasInd/crearGrupoEmpleados.routes');
const rutasActualizarEmpleado = require('@altertex/emp/rutasInd/actualizarEmpleado.routes');
const rutasActualizarGrupo = require('@altertex/emp/rutasInd/actualizarGrupoEmpleados.routes');

const RUTAS = require('@altertex/util/const/rutas');

//RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasConsultarListaGrupos);
//RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasConsultarLista);
//RF25 - Eliminar Grupo de Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF25
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasEliminarGrupo);
//RF20 - Eliminar Empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF20
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasEliminarEmpleado);
//RF57 - Importar Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF57
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasImportarEmpleados);
//RF23 Lee grupo de empleados -https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF23
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasLeerGrupoEmpleados);
//RF21 - Crear Grupo de Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF21
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasCrearGrupo);
//RF19 - Actualizar Empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF19
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasActualizarEmpleado);
//RF24 - Actualizar Grupo de Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF24
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasActualizarGrupo);
//RF59 - Exportar Empleados- https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF59
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasExportarEmpleados);
//RF16 - Crear Empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasCrearEmpleado);
module.exports = ruteador;
