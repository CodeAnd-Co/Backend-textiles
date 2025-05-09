const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");

// Configurar AWS SDK
AWS.config.update({
  signatureVersion: "v4",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

// Configurar Multer
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./bucket/");
  },

  filename: function (request, file, callback) {
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${file.originalname}`;
    callback(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

// Middleware para subir imagenes al S3
const uploadToS3 = (folder) => (request, res, next) => {
  if (!request.file) {
    console.error("No file uploaded");
    return next();
  }

  // Leemos el archivo desde el sistema local
  fs.readFile(
    path.join(__dirname, ".././bucket", request.file.filename),
    (err, data) => {
      if (err) throw err;
      // Convertimos el archivo a base64
      var base64data = new Buffer.from(data, "binary");
      
      // Configurar parametros para subir el archivo al S3
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME, //Nombre del bucket en S3
        Key: folder + request.file.filename, // Ruta y nombre del archivo
        Body: base64data, // Datos del archivo
      };
      
      // Subir el archivo al S3
      s3.upload(params, function (s3Err) {
        if (s3Err) throw s3Err;

        // Eliminar el archivo del sistema local
        fs.unlink(
          path.join(__dirname, ".././bucket", request.file.filename),
          (err) => {
            if (err) {
              console.error("Error deleting local file:", err);
            }
            next();
          }
        );
      });
    }
  );
};

module.exports = {
  upload,
  uploadToS3,
};
