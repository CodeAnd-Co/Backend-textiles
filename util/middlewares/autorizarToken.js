const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies

  console.log(req.cookies);
  console.log(token);

  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verificado;
    console.log("Verificado");
    next();
  } catch (error) {
    console.log("no Verificado");
    res.status(401).json({ message: "Token inválido", error: error });
  }
};
