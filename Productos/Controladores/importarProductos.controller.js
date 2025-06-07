const validarVariante = require('@altertex/util/vali/validarVarianteImportar');
const validarOpcionesImportar = require('@altertex/util/vali/validarOpcionesImportar');
const repositorioCrearProducto = require('@altertex/pro/repos/repositorioCrearProducto');
const repositorioCrearVariante = require('@altertex/pro/repos/repositorioCrearVariante');
const repositorioCrearOpcion = require('@altertex/pro/repos/repositorioCrearOpcion');
const db = require('@altertex/util/bd/db');
const validarProductoImportado = require('@altertex/util/vali/validarProductoImportado');
const { crearGeneradorSKUConsecutivo } = require('@altertex/util/inter/generarSKUAuto');
const { proveedorExiste } = require('@altertex/pro/repos/repositorioValidarProveedor');


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
 * 
 * @see RF[56] Leer producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF56]
 */
exports.importarProductos = async (req, res) => {
  const idCliente = parseInt(req.user.clienteSeleccionado);
  const productos = req.body;

  const MENSAJE_PRODUCTOS_INVALIDOS = 'No se recibieron productos válidos.'
  const MENSAJE_VARIANTES_INVALIDAS = 'No se recibieron productos válidos.'
  const MENSAJE_ERRORES_ARCHIVO = 'Se encontraron errores en el archivo.'
  const IMPORTACION_EXITOSA = 'Importación completada exitosamente.';
  const ERROR_AL_IMPORTAR = 'Error al importar productos.';

  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ mensaje:  MENSAJE_PRODUCTOS_INVALIDOS});
  }

  const errores = [];
  let conexion = null;

  try {
    conexion = await db.getConnection();
    await conexion.beginTransaction();

    for (let im = 0; im < productos.length; im += 1) {
      const { producto, variantes } = productos[im];
      const fila = im + 1;

      const errorProducto = validarProductoImportado(producto);
      if (errorProducto) {
        errores.push({ fila, error: errorProducto.error });
        continue;
      }
      if (producto.idProveedor !== null) {
        const existe = await proveedorExiste(conexion, producto.idProveedor);
        if (!existe) {
          errores.push({ fila, error: `idProveedor ${producto.idProveedor} no existe en la base de datos.` });
          continue;
        }
      }

      if (!Array.isArray(variantes) || variantes.length === 0) {
        errores.push({ fila, error: MENSAJE_VARIANTES_INVALIDAS });
        continue;
      }

      for (const variante of variantes) {
        const errorVariante = validarVariante(variante);
        if (errorVariante) {
          errores.push({ fila, error: errorVariante.error });
          continue;
        }

        const errorOpciones = validarOpcionesImportar(variante.opciones);
        if (errorOpciones) {
          errores.push({ fila, error: errorOpciones.error });
          continue;
        }
      }
    }

    if (errores.length > 0) {
      await conexion.rollback();
      return res.status(200).json({
        mensaje: MENSAJE_ERRORES_ARCHIVO,
        errores,
      });
    }
    const generarSKUConsecutivo = crearGeneradorSKUConsecutivo();
    for (let indice = 0; indice < productos.length; indice += 1) {
      const { producto, variantes } = productos[indice];
      const idProducto = await repositorioCrearProducto.crearProducto(idCliente, producto);
      
        for (const variante of variantes) {
        const idVariante = await repositorioCrearVariante.crearVariante(idProducto, variante);

        const opcionesConSKU = variante.opciones.map(opcion => ({
          ...opcion,
          SKUautomatico: generarSKUConsecutivo(
            producto.nombreComun,
            variante.nombreVariante,
            opcion.valorOpcion || 'SINVALOR'
          )
        }));

        await repositorioCrearOpcion.crearOpcion(idVariante, opcionesConSKU);
        }
    }
    
    await conexion.commit();

    return res.status(200).json({
      mensaje: IMPORTACION_EXITOSA,
      errores: null,
    });

  } catch (err) {
    if (conexion) await conexion.rollback();
    return res.status(500).json({
      mensaje: ERROR_AL_IMPORTAR,
      error: err.message,
    });
  } finally {
    if (conexion) conexion.release();
  }
};
