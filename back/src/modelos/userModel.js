const { model, Schema } = require("mongoose");
const { genSalt, hash } = require("bcryptjs");

const userSchema = new Schema({
    usuario: {
        type: "string",
        unique: true,
        required: true
    },
    password: {
        type: "string",
        required: true
    },
    rol: {
        type: "string",
        required: true
    }
});
// Precondición que se ejecuta antes de Guardar el Usuario
// Cifra la contraseña con el algoritmo bcrypt
userSchema.pre("save", async function (next) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
})

const userModel = model("users", userSchema);
exports.userModel = userModel