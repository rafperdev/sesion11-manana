const { ventasModel } = require("../modelos/ventasModel");
const { productoModelo } = require("../modelos/productosModel");
const { Router } = require("express");
const ventasRutas = Router();

ventasRutas.post("/save", function (req, res) {
    const data = req.body;
    const ventas = new ventasModel(data);
    ventas.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "error", msg: "ERROR: Venta NO guardada" });
        } else {
            res.status(200).send({ estado: "ok", msg: "Venta Guardada" })
        }
    })
})

ventasRutas.get("/listar", function (req, res) {
    try {
        ventasModel.find({}, function (err, ventas) {
            productoModelo.populate(ventas, { path: "producto" }, function (err, ventas) {
                res.status(200).send({ estado: "ok", msg: "Listado de  Ventas", data: ventas });
            })
        })
    } catch (error) {

    }
})

exports.ventasRutas = ventasRutas