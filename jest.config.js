module.exports = {
  // La raíz del directorio que Jest usará para buscar los archivos
  rootDir: '.',

  // Rutas a directorios que Jest debe ignorar durante las pruebas
  testPathIgnorePatterns: ['/node_modules/'],

  // Patrón para encontrar archivos de prueba
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],

  // Entorno de prueba
  testEnvironment: 'node',

  // Cobertura de código
  collectCoverage: true,
  coverageDirectory: 'coverage',

  // Módulos que deben ser transformados
  // (Si usas babel o typescript necesitarías configurar esto)
  transform: {},
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '^@altertex/root(.*)$': '<rootDir>$1',

    // Autenticacion module mappings
    '^@altertex/aut/ctrl/(.*)$': '<rootDir>/Autenticacion/Controladores/$1',
    '^@altertex/aut/repos/(.*)$': '<rootDir>/Autenticacion/Datos/Repositorios/$1',
    '^@altertex/aut/rutasInd/(.*)$': '<rootDir>/Autenticacion/Rutas/RutasIndividuales/$1',
    '^@altertex/aut/rutas/(.*)$': '<rootDir>/Autenticacion/Rutas/$1',
    '^@altertex/aut/datos/(.*)$': '<rootDir>/Autenticacion/Datos/$1',
    '^@altertex/aut/(.*)$': '<rootDir>/Autenticacion/$1',

    // Cuotas module mappings (added)
    '^@altertex/cuota/ctrl/(.*)$': '<rootDir>/Cuotas/Controladores/$1',
    '^@altertex/cuota/repos/(.*)$': '<rootDir>/Cuotas/Datos/Repositorios/$1',
    '^@altertex/cuota/rutasInd/(.*)$': '<rootDir>/Cuotas/Rutas/RutasIndividuales/$1',
    '^@altertex/cuota/rutas/(.*)$': '<rootDir>/Cuotas/Rutas/$1',
    '^@altertex/cuota/datos/(.*)$': '<rootDir>/Cuotas/Datos/$1',
    '^@altertex/cuota/(.*)$': '<rootDir>/Cuotas/$1',

    // Empleados module mappings (added)
    '^@altertex/emp/ctrl/(.*)$': '<rootDir>/Empleados/Controladores/$1',
    '^@altertex/emp/repos/(.*)$': '<rootDir>/Empleados/Datos/Repositorios/$1',
    '^@altertex/emp/rutasInd/(.*)$': '<rootDir>/Empleados/Rutas/RutasIndividuales/$1',

    // CRON jobs module mappings (added)
    '^@altertex/CRON/ctrl/(.*)$': '<rootDir>/CRON_JOBS/Controladores/$1',
    '^@altertex/CRON/datos/(.*)$': '<rootDir>/CRON_JOBS/Datos/$1',
    '^@altertex/CRON/repos/(.*)$': '<rootDir>/CRON_JOBS/Datos/Repositorios/$1',
    '^@altertex/CRON/(.*)$': '<rootDir>/CRON_JOBS/$1',

    // Configuration and utilities mappings
    '^@altertex/config/(.*)$': '<rootDir>/Configuracion/$1',
    '^@altertex/util/ser/(.*)$': '<rootDir>/Utilidades/Servicios/$1',
    '^@altertex/util/inter/(.*)$': '<rootDir>/Utilidades/Intermediarios/$1',
    '^@altertex/util/const/(.*)$': '<rootDir>/Utilidades/Constantes/$1',
    '^@altertex/util/bd/(.*)$': '<rootDir>/Utilidades/BaseDeDatos/$1',
    '^@altertex/util/(.*)$': '<rootDir>/Utilidades/$1',

    // Generic mapping as fallback
    '^@altertex/(.*)$': '<rootDir>/$1',
  },
};
