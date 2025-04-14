function validarYSanitizar(req, res, next) {
  const { body: cuerpo } = req;

  if (typeof cuerpo !== "object" || Array.isArray(cuerpo)) {
    return res.status(400).json({ mensaje: "Formato del cuerpo inválido." });
  }

  for (const [llave, valor] of Object.entries(cuerpo)) {
    if (
      typeof valor !== "string" &&
      typeof valor !== "number" &&
      typeof valor !== "boolean"
    ) {
      return res
        .status(400)
        .json({ mensaje: `Valor inválido para el campo "${llave}".` });
    }

    if (typeof valor === "string") {
      if (patronProhibido.test(valor)) {
        const campo = llave === "contrasenia" ? "contraseña" : llave;
        return res
          .status(400)
          .json({ mensaje: `Entrada sospechosa en el campo "${campo}".` });
      }

      req.body[llave] = valor.trim();
    }
  }

  next();
}
