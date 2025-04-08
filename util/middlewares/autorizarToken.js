const jwt = require("jsonwebtoken");

const verifyToken = (rolesRequeridos = []) => {
  return async (req, res, next) => {
    const token = req.cookies.token;

    console.log(req.cookies);
    console.log(token);

    if (!token) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    try {
      const verificado = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verificado;

      if (!rolesRequeridos.length) {
        console.log("Verificado - no necesita check de roles");
        return next();
      }

      if (verificado.rol && rolesRequeridos.includes(verificado.rol)) {
        console.log("Verificado con rol:", verificado.rol);
        return next();
      }

      return res
        .status(403)
        .json({ message: "No tienes permisos suficientes" });
    } catch (error) {
      console.log("no Verificado");
      res.status(401).json({ message: "Token inválido", error });
    }
  };
};

module.exports = verifyToken;
