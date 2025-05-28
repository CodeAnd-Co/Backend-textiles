const validarProducto = require('@altertex/util/vali/validarProducto');
const validarVariante = require('@altertex/util/vali/validarVariante');
const validarOpciones = require('@altertex/util/vali/validarOpciones');
const repositorioCrearProducto = require('@altertex/pro/repos/repositorioCrearProducto');
const repositorioCrearVariante = require('@altertex/pro/repos/repositorioCrearVariante');
const repositorioCrearOpcion = require('@altertex/pro/repos/repositorioCrearOpcion');
const db = require('@altertex/util/bd/db');


/**
 * Importa productos y sus variantes/opciones para un cliente.
 * 
 * Espera en req.body un array de objetos con la forma:
 * [
 *   {
 *     producto: { ... },
 *     variantes: [
 *       {
 *         ...,
 *         opciones: { ... }
 *       }
 *     ]
 *   }
 * ]
 * 
 * Valida cada producto, variante y opciones antes de insertar en la base de datos.
 * Si hay errores en alguna fila, los acumula y los devuelve al finalizar.
 * 
 * @async
 * @function importarProductos
 * @param {Express.Request} req - Request de Express, requiere req.user.clienteSeleccionado y req.body.
 * @param { Express.Response} res - Response de Express.
 * @returns {Promise<void>} Devuelve un JSON con el resultado de la importación y los errores encontrados.
 */
exports.importarProductos = async (req, res) => {
  const idCliente = parseInt(req.user.clienteSeleccionado);
  const productos = req.body; // Espera array de { producto, variantes }

  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ mensaje: 'No se recibieron productos válidos.' });
  }

  const errores = [];
  let conexion = null;

  try {
    conexion = await db.getConnection();
    await conexion.beginTransaction();

    for (let im = 0; im < productos.length; im = im + 1) {
      const { producto, variantes } = productos[im];
      const fila = im + 1;

      const errorProducto = validarProducto(producto);
      if (errorProducto) {
        errores.push({ fila, error: errorProducto.error });
        continue;
      }

      if (!Array.isArray(variantes) || variantes.length === 0) {
        errores.push({ fila, error: 'Producto sin variantes válidas.' });
        continue;
      }

      const idProducto = await repositorioCrearProducto.crearProducto(idCliente, producto);
      if (!idProducto) {
        errores.push({ fila, error: 'Error al crear producto.' });
        continue;
      }

      for (const variante of variantes) {
        const errorVariante = validarVariante(variante);
        if (errorVariante) {
          errores.push({ fila, error: errorVariante.error });
          continue;
        }

        const idVariante = await repositorioCrearVariante.crearVariante(idProducto, variante);
        if (!idVariante) {
          errores.push({ fila, error: 'Error al crear variante.' });
          continue;
        }

        const errorOpciones = validarOpciones(variante.opciones);
        if (errorOpciones) {
          errores.push({ fila, error: errorOpciones.error });
          continue;
        }

        await repositorioCrearOpcion.crearOpcion(idVariante, variante.opciones);
      }
    }

    await conexion.commit();

    return res.status(200).json({
      mensaje: 'Importación completada.',
      errores: errores.length ? errores : null,
    });
  } catch (err) {
    if (conexion) await conexion.rollback();
    return res.status(500).json({
      mensaje: 'Error al importar productos.',
      error: err.message,
    });
  } finally {
    if (conexion) conexion.release();
  }
};
