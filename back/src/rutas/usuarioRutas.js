const { userModel } = require("../modelos/userModel");
const { compare } = require("bcryptjs");
const { Router } = require("express");
const { sign } = require("jsonwebtoken");
const { userSaveGuard } = require("../guard/userSaveGuard")
const usuarioRutas = Router();

usuarioRutas.post("/login", async function (req, res) {
    try {
        // Captura el usuario y el password
        const { usuario, password } = req.body;
        //Consulta el usuario en BD
        const user = await userModel.findOne({ usuario });
        //Valida que el usuario exista
        if (!user) {
            return res.status(401).send({ estado: "error", msg: "Credenciales NO válidas" });
        }
        // Compara el password enviado por el usuario y el guardado en BD
        const passwordOk = await compare(password, user.password);
        //Si son iguales los password
        if (passwordOk) {
            // Se firma el token (Se genera el token con JWT)
            const token = sign(
                {
                    _id: user.id,
                    usuario: user.usuario,
                    rol: user.rol,
                },
                process.env.JWT_SECRET_KEY
            )
            return res.status(200).send({ estado: "ok", msg: "Logueado :)", url: "/home", token });
        }
        //Si no coinciden los password, envia error
        return res.status(401).send({ estado: "error", msg: "Credenciales NO válidas" });
    } catch (error) {

    }
});

usuarioRutas.post("/save", userSaveGuard, function (req, res) {
    const data = req.body;
    const user = new userModel(data);
    user.save(function (error) {
        if (!error) {
            res.status(200).send({ estado: "ok", msg: "Usuario Guardado" });
        }
        res.status(500).send({ estado: "error", msg: "ERROR: Usuario NO guardado" });
    })
});

usuarioRutas.post("/logout", function (req, res) {

});

exports.usuarioRutas = usuarioRutas