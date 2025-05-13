const generarNombreUnico = require('./generarNombreUnico');

// import {
//   PutObjectCommand,
//   S3Client,
//   S3ServiceException,
// } from "@aws-sdk/client-s3";

const {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} = require("@aws-sdk/client-s3");

/**
 * Upload a file to an S3 bucket.
 * @param {{ bucketName: string, key: string, filePath: string }}
 */
exports.subirImagen = async ({ body }) => {
  
  const client = new S3Client({});
  const fileName = generarNombreUnico(body.originalname);

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: body,
  });


  try {
    const response = await client.send(command);
    console.log(response);
  } catch (error) {
    if (
      error instanceof S3ServiceException &&
      error.name === "EntityTooLarge"
    ) {
      console.error(
        `Archivo demasiado grande.`,
      );
    } else if (error instanceof S3ServiceException) {
      console.error(
        `Error from S3 while uploading object to ${bucketName}.  ${error.name}: ${error.message}`,
      );
    } else {
      throw error;
    }
  }
};
