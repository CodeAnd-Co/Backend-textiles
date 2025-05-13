module.exports = {

    VALIDAR_CORREOS_DUPLICADOS: `
        SELECT correoElectronico FROM usuario WHERE correoElectronico IN (?)
    `,
    VALIDAR_TELEFONO_DUPLICADO: `
        SELECT numeroTelefono FROM usuario WHERE numeroTelefono IN (?)
    `,
    INSERTAR_USUARIO_EN_VOLUMEN:`
        INSERT INTO usuario
         (nombreCompleto, correoElectronico, contrasenia, numeroTelefono, direccion, fechaNacimiento, genero, estatus)
        VALUES ?
    `,
    OBTENER_ID_GENERADOS: `
        SELECT idUsuario, correoElectronico FROM usuario WHERE correoElectronico IN (?)
    `,
    INSERTAR_ROLES_EN_VOLUMEN:`
       INSERT INTO usuario_rol (idUsuario, idRol) VALUES ?
    `,
    INSERTAR_USUARIO_CLIENTE_EN_VOLUMEN:`
        INSERT INTO usuario_cliente (idUsuario, idCliente) VALUES ?
    `,
    INSERTAR_EMPLEADOS_EN_VOLUMEN:`
        INSERT INTO empleado
         (idUsuario, idCliente, numeroEmergencia, areaTrabajo, posicion, cantidadPuntos, antiguedad)
        VALUES ?
    `,
}