const { verify } = require("jsonwebtoken");
require("dotenv").config();

const userSaveGuard = (req, res, next) => {
    //Captura el token desde la cabecera
    const authorization = req.headers.authorization;
    console.log(authorization);
    //Valida que hay un token
    if (!authorization) {
        next(JSON.stringify({ estado: "eror", msg: "NO AUTORIZADO1" }))
    };
    try {
        // Captura el token
        const token = authorization.split(' ')[1];
        //Obtiene la carga útil 
        const payload = verify(token, process.env.JWT_SECRET_KEY);
        console.log(payload);
        // Verifica el Rol de usuario
        if (payload.rol !== "admin") next(JSON.stringify({ estado: "eror", msg: "NO AUTORIZADO2" }));
    } catch (err) {
        console.log(err);
    }
    return next();
};

exports.userSaveGuard = userSaveGuard;