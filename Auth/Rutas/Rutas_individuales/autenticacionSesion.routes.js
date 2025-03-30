const express = require("express");
const revisarApiKey = require("../../../util/middlewares/revisarApiKey");
const ruteador = express.Router();
const autorizarToken = require("../../../util/middlewares/autorizarToken");

ruteador.get(
  "/auth/me",
  revisarApiKey("x-api-key", "Api key invalida"),
  autorizarToken,
  (req, res) => {
    res.json({ user: req.user });
  }
);

module.exports = ruteador;
