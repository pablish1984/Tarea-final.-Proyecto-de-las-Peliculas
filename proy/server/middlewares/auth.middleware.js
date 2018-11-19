//const services = require('../services/auth.service')
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function isAuth(req, res, next) {

    // Verificar que en la cabecera de mi peticion viene la autorizacion del usuario para acceder al sitio
    if (!req.headers.authorization) {
        {
            return res.status(403).send({ message: "No tienes autorizacion" });
        }

    }

    // Obtengo el token a partir de la cabecera usando el metodo split(). Esto se debe a ke en el req.headers.authorization vienen 2 parametros separados por un espacio [Bearer] y [el codigo del token]. Indicandole al metodo split ke me los separe usando como indicador el espacio, obtengo en el segundo elemento el codigo del token ke necesito
    const token = req.headers.authorization.split(" ")[1];

    const payload = jwt.decode(token, config.SECRET_TOKEN);

    if (payload.exp <= moment().unix()) {
        res.status(401).send({ message: "El token ha caducado" });
    }

    req.user = payload.sub;
    next();
    /*
        services.decodeToken(token)
            .then(response => {
                req.user = response,
                    next()
            })
            .catch(response => {
                res.status(response.status);
            })*/
}

module.exports = isAuth;