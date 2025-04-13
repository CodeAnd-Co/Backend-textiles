module.exports = {
  // La raíz del directorio que Jest usará para buscar los archivos
  rootDir: ".",

  // Rutas a directorios que Jest debe ignorar durante las pruebas
  testPathIgnorePatterns: ["/node_modules/"],

  // Patrón para encontrar archivos de prueba
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],

  // Entorno de prueba
  testEnvironment: "node",

  // Cobertura de código
  collectCoverage: true,
  coverageDirectory: "coverage",

  // Módulos que deben ser transformados
  // (Si usas babel o typescript necesitarías configurar esto)
  transform: {},
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json"],
  moduleNameMapper: {
    "^@altertex/root(.*)$": "<rootDir>$1",
    "^@altertex/aut/ctrl/(.*)$": "<rootDir>/Autenticacion/Controladores/$1",
    "^@altertex/aut/repos/(.*)$":
      "<rootDir>/Autenticacion/Datos/Repositorios/$1",
    "^@altertex/aut/rutasInd/(.*)$":
      "<rootDir>/Autenticacion/Rutas/RutasIndividuales/$1",
    "^@altertex/aut/rutas/(.*)$": "<rootDir>/Autenticacion/Rutas/$1",
    "^@altertex/aut/datos/(.*)$": "<rootDir>/Autenticacion/Datos/$1",
    "^@altertex/aut/(.*)$": "<rootDir>/Autenticacion/$1",
    "^@altertex/config/(.*)$": "<rootDir>/Configuracion/$1",
    "^@altertex/util/ser/(.*)$": "<rootDir>/Utilidades/Servicios/$1",
    "^@altertex/util/inter/(.*)$": "<rootDir>/Utilidades/Intermediarios/$1",
    "^@altertex/util/const/(.*)$": "<rootDir>/Utilidades/Constantes/$1",
    "^@altertex/util/bd/(.*)$": "<rootDir>/Utilidades/BaseDeDatos/$1",
    "^@altertex/util/(.*)$": "<rootDir>/Utilidades/$1",
    "^@altertex/(.*)$": "<rootDir>/$1",
  },
};
