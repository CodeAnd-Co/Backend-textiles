/**
 *
 * RF31 - Crear Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31
 *
 * @file Cron job que se ejecuta cada 5 minutos para obtener información de los cuota sets.
 *
 * @module cron/actualizarCuotaSets
 *
 * @requires node-cron
 * @requires @altertex/CRON/repos/actualizarCuotaSetsRepositorio
 *
 * @description
 * Este cron job se ejecuta automáticamente cada 5 minutos.
 * Llama al repositorio `obtenerCuota` para realizar operaciones sobre los cuota sets.
 * Si ocurre un error durante la ejecución, se captura y se muestra en consola.
 */

const cron = require("node-cron");
const repositorio = require("@altertex/CRON/repos/actualizarCuotaSetsRepositorio");

/**
 * Tarea programada que se ejecuta a las 00:00.
 * Ejecuta `repositorio.obtenerCuota` para actualizar información relacionada con los cuota sets.
 */
module.exports = cron.schedule("0 0 * * *", async () => {
  try {
    const resultado = await repositorio.obtenerCuota();
    console.log("Resultado del cron:", resultado);
  } catch (error) {
    console.error("Error en el cron:", error);
  }
});
