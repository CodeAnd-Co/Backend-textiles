const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: "us-east-1",
});

module.exports = async (parametros) => {
  await s3.send(new PutObjectCommand(parametros));
  const nombreArchivo = parametros.Key;
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${nombreArchivo}`;
};
