const cron = require("node-cron");
const repositorio = require("@altertex/CRON/repos/actualizarCuotaSetsRepositorio");

module.exports = cron.schedule("*/5 * * * *", async () => {
  try {
    const resultado = await repositorio.obtenerCuota();
    console.log("Resultado del cron:", resultado);
  } catch (error) {
    console.error("Error en el cron:", error);
  }
});
