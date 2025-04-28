require('module-alias/register');
require('@altertex/config/dotenv');

//Importaciones de librerias
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerJSDoc = require('swagger-jsdoc');

//Importaciones de configuracion
const corsOptions = require('@altertex/config/corsOptions');
const opcionesSwagger = require('@altertex/config/swagger');
const swaggerUI = require('swagger-ui-express');

//Importaciones de rutas
const rutasAutenticacion = require('@altertex/aut/rutas/indexAutenticacion.routes');
const rutasUsuarios = require('@altertex/usu/rutas/indexUsuarios.routes');
const rutasProductos = require('@altertex/pro/rutas/indexProductos.routes');
const rutasSetsProductos = require('@altertex/setspro/rutas/indexSetsProductos.routes');
const rutasEmpleados = require('@altertex/emp/rutas/indexEmpleados.routes');
const rutasClientes = require('@altertex/cli/rutas/indexClientes.routes');
const rutasRoles = require('@altertex/rol/rutas/indexRoles.routes');
const rutasCuotas = require('@altertex/cuota/rutas/indexCuotas.routes');
const rutasCategorias = require('@altertex/cat/rutas/indexCategorias.routes');
const RUTAS = require('@altertex/util/const/rutas');

//Importaciones de CRON jobs
const cronCuotas = require('@altertex/CRON/ctrl/actualizarCuotaSet.controller');

const puerto = process.env.PORT || 5000;

//Configuracion de aplicacion express
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

cronCuotas.start();

//Usar las rutas para que esten disponibles en la aplicacion
app.use(RUTAS.API, rutasAutenticacion);
app.use(RUTAS.API, rutasUsuarios);
app.use(RUTAS.API, rutasProductos);
app.use(RUTAS.API, rutasSetsProductos);
app.use(RUTAS.API, rutasEmpleados);
app.use(RUTAS.API, rutasClientes);
app.use(RUTAS.API, rutasRoles);
app.use(RUTAS.API, rutasCuotas);
app.use(RUTAS.API, rutasCategorias);

//Configuracion de swaggerUI
const swaggerSpec = swaggerJSDoc(opcionesSwagger);
app.use(RUTAS.API_DOCS, swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.listen(puerto, () =>
  console.log(`Servidor corriendo en puerto ${puerto} [${process.env.NODE_ENV}]`)
);
