const patronProhibido = /['";`]|(--)/; // caracteres típicos en inyecciones

function validarYSanitizar(req, res, next) {
  const { body } = req;

  // Verifica que el cuerpo sea un objeto plano
  if (typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ message: "Formato del cuerpo inválido." });
  }

  for (const [llave, valor] of Object.entries(body)) {
    // Solo aceptamos strings, números o booleanos simples
    if (
      typeof valor !== "string"
      && typeof valor !== "number"
      && typeof valor !== "boolean"
    ) {
      return res
        .status(400)
        .json({ message: `Valor inválido para el campo "${llave}".` });
    }

    if (typeof valor === "string") {
      if (patronProhibido.test(valor)) {
        return res
          .status(400)
          .json({ message: `Entrada sospechosa en el campo "${llave}".` });
      }

      // Limpieza básica: quitar espacios al inicio/final
      req.body[llave] = valor.trim();
    }
  }

  next();
}

module.exports = validarYSanitizar;
