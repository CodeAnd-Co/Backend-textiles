const express = require("express");
const ruteador = express.Router();
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.get(
  RUTAS.AUTENTICACION.USUARIO_AUTENTICADO,
  revisarApiKey(),
  autorizarToken,
  (req, res) => {
    res.json({ user: req.user });
  }
);

module.exports = ruteador;
