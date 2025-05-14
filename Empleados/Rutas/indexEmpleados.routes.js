const express = require('express');
const ruteador = express.Router();
const rutasConsultarListaGrupos = require('@altertex/emp/rutasInd/consultarListaGrupos.routes');
const rutasConsultarLista = require('@altertex/emp/rutasInd/consultarLista.routes');
const rutasEliminarGrupo = require('@altertex/emp/rutasInd/eliminarGrupoEmpleados.routes');
const rutasEliminarEmpleado = require('@altertex/emp/rutasInd/eliminarEmpleado.routes');
const rutasImportarEmpleados = require('@altertex/emp/rutasInd/importarEmpleados.routes');
const rutasLeerGrupoEmpleados = require('@altertex/emp/rutasInd/leerGrupoEmpleados.routes');
const rutasCrearGrupo = require('@altertex/emp/rutasInd/crearGrupoEmpleados.routes');


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


module.exports = ruteador;
