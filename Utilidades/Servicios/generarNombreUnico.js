const crypto = require("crypto");
const path = require("path");

module.exports = (nombreOriginal = "") => {
  const ext = path.extname(nombreOriginal);
  const randomBytes = crypto.randomBytes(16).toString("hex");
  return `${Date.now()}-${randomBytes}${ext}`;
};
