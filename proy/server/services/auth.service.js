// jwt --> JSON Web Tokens
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(user) {

    // El objeto payload es un objeto ke se transmite en el heder de nuestras peticiones. Puede contener varios parametros ke me den alguna semantica ke necesite en mi proyecto. Los campos ke utilizoson [sub: este es un id ke me va a identificar a un cliente durante el uso de mi aplicacion. No tiene ke ser igual al _id de mongodb, pero en nuestro caso lo vamos a considerar asi], [iat: es la fecha en ke se creo este usuario. Para esto se usa la libreria (moment)], [exp: es la fecha en ke expira este token para dicho usuario. Notese ke se uso 14 dias porke ees el tiempo promedio de la mayoria de los tokens] 
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        ext: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

/*
function decodeToken(token) {


    // Crear la promesa decoded, la cual si se resuelve tendra el token descodificado, y si no pues la variable reject tendra el error ke ocurrio
    const decoded = new Promise((resolve, reject) => {
        try {
            // Descodifico el token usando la clave SECRET_TOKEN ke guarde en mi fichero de configuracion
            const payload = jwt.decode(token, config.SECRET_TOKEN);

            // Verificar ke el token no haya expirado
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: "El token ha expirado"
                })
            }

            // le paso a la variable user del req, el usuario y verificada su autenticacion
            resolve(payload.sub);
        } catch (error) {
            reject({
                status: 500,
                message: "El token es invalido"
            })
        }
    })

    return decoded;
}*/

module.exports = { createToken /*, decodeToken*/ };