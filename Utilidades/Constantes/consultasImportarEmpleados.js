module.exports = {

    VALIDAR_CORREOS_DUPLICADOS: `
        SELECT correoElectronico FROM usuario WHERE correoElectronico IN (?)
    `,
    VALIDAR_TELEFONO_DUPLICADO: `
        SELECT numeroTelefono FROM usuario WHERE numeroTelefono IN (?)
    `,
    BULK_INSERT_USUARIOS:`
        INSERT INTO usuario
         (nombreCompleto, correoElectronico, contrasenia, numeroTelefono, direccion, fechaNacimiento, genero, estatus)
        VALUES ?
    `,
    OBTENER_ID_GENERADOS: `
        SELECT idUsuario, correoElectronico FROM usuario WHERE correoElectronico IN (?)
    `,
    BULK_INSERET_ROLES:`
       INSERT INTO usuario_rol (idUsuario, idRol) VALUES ?
    `,
    BULK_INSERT_USUARIO_CLIENTE:`
        INSERT INTO usuario_cliente (idUsuario, idCliente) VALUES ?
    `,
    BULK_INSERT_EMPLEADOS:`
        INSERT INTO empleado
         (idUsuario, idCliente, numeroEmergencia, areaTrabajo, posicion, cantidadPuntos, antiguedad)
        VALUES ?
    `,
}