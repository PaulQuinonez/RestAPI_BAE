const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {

    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            resp: false,
            msj: "No hay Token en la solicitud"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.KEY_JWTOKEN);

        req.uid = uid;

        next();

    } catch (e) {
        return res.status(401).json({
            resp: false,
            msj: 'Token inválido',
            users: {},
            token: 'Token inválido'
        });
    }

}

module.exports = {
    validateToken
}