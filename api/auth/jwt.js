// Importamos la librería jsonwebtoken
const jwt = require('jsonwebtoken');

// Definimos la clave secreta que se usará para generar los tokens
const JWT_CLAVE = 'clave-secreta-para-generar-tokens';

// Definimos el tiempo de expiración del token
const JWT_EXPIRES = '1h';

// Función que recibe los datos del usuario para generar el token
function generarToken(datos) {
    // Creamos el payload con los datos necesarios
    let payload = {
        "id":datos._id,
        "nombre":datos.nombre,
        
    }

    // Generamos el token usando la función sign de la librería jwt
    const token = jwt.sign(payload, JWT_CLAVE, {
        expiresIn: JWT_EXPIRES
    }); 

    // Retornamos el token generado
    return token;
}

// Exportamos la función generarToken para poder usarla en otros módulos
module.exports.generarToken = generarToken;
