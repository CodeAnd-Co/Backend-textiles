const subirArchivo = require('@altertex/util/ser/enviarS3')
const generarNombreUnico = require('./generarNombreUnico');



//Subir Imagen

module.exports = async (file, route) => {
    if(file){
        const fileName = `${route}/${generarNombreUnico(file.originalname)}`;  
        console.log('subiendo imagen: ', file)
        try{
            return await subirArchivo({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
            })

        } catch (error) {
            console.error('Error al subir imagen: ', error);
            throw new Error('Error al subir imagen');
        };
    };
};
