const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/cuota/ctrl/eliminarSetCuotas.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

ruteador.post(
    RUTAS.CUOTAS.ELIMINAR_SET_CUOTAS,
    revisarApiKey(),
    autorizarToken,
    verificarPermisos(PERMISOS.ELIMINAR_SET_CUOTAS),
    controlador.eliminarSetCuotas
);

console.log('Ruta /eliminar-set-cuotas cargada correctamente');

module.exports = ruteador;
