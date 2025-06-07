const dotenv = require("dotenv");
const camino = require("path");

const archivoEnv = `.env.${process.env.NODE_ENV || "staging"}`;
dotenv.config({ path: camino.resolve(process.cwd(), archivoEnv) });
