/**
 * @function logout
 * @description Cierra la sesión del usuario eliminando la cookie que contiene el token JWT.
 * @param {Object} req - El objeto de la solicitud HTTP. Se utiliza para obtener los datos de la solicitud.
 * @param {Object} res - El objeto de la respuesta HTTP. Se utiliza para enviar una respuesta al cliente.
 * @returns {void} - No retorna nada, pero envía una respuesta con un mensaje de éxito.
 *
 * @example
 * // Ejemplo de uso
 * app.post('/logout', logout);
 * // Respuesta esperada: { "mensaje": "Logout exitoso" }
 */
exports.logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.json({ mensaje: "Logout exitoso" });
};
