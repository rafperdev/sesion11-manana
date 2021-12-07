const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoModelo = new Schema(
    {
        nombre: {
            type: "string",
            unique: true,
            required: true
        },
        precio: {
            type: "number",
            required: true
        },
        stock: {
            type: "number",
            required: true
        }
    }
);

module.exports = mongoose.model("productos", productoModelo);