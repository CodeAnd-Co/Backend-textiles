exports.validarCuotaSet = (nombre, productosYLimite) => {
  // Validaciones principales
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({ error: 'El campo "nombre" es obligatorio.' });
  }

  if (!Array.isArray(productosYLimite) || productosYLimite.length === 0) {
    return res
      .status(400)
      .json({ error: "Debes enviar al menos un producto con su límite." });
  }

  // Validar cada producto
  for (let i = 0; i < productosYLimite.length; i++) {
    const producto = productosYLimite[i];
    const { idProducto, limite, limiteActual } = producto;

    if (
      !idProducto ||
      typeof idProducto !== "string" ||
      idProducto.trim() === ""
    ) {
      return res.status(400).json({
        error: `El producto en la posición ${i} no tiene un idProducto válido.`,
      });
    }

    if (typeof limite !== "number" || isNaN(limite)) {
      return res.status(400).json({
        error: `El producto "${idProducto}" tiene un "limite" inválido.`,
      });
    }

    if (typeof limiteActual !== "number" || isNaN(limiteActual)) {
      return res.status(400).json({
        error: `El producto "${idProducto}" tiene un "limiteActual" inválido.`,
      });
    }
  }
};
