const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productoSchema = new Schema(
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

const productoModelo = model("productos", productoSchema);
exports.productoModelo = productoModelo;