module.exports = (nombreHeader, mensajeError = "Api key invalida") => {
  return (req, res, next) => {
    const valorHeader = req.get(nombreHeader);
    if (valorHeader !== process.env.API_KEY) {
      return res.status(400).json({ message: mensajeError });
    }
    next();
  };
};
