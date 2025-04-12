const { MENSAJES_AUTENTICACION } = require("@altertex/util/const/mensajes");

module.exports = (nombreHeader = "x-api-key") => {
  return (req, res, next) => {
    const valorHeader = req.get(nombreHeader);

    if (!valorHeader || valorHeader !== process.env.API_KEY) {
      return res
        .status(MENSAJES_AUTENTICACION.API_KEY_INVALIDA.codigo)
        .json({ mensaje: MENSAJES_AUTENTICACION.API_KEY_INVALIDA.mensaje });
    }

    next();
  };
};
