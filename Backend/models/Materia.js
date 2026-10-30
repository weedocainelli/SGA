const mongoose = require("mongoose")

const materiaSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: [true, "El código es obligatorio"],
            unique: true,
            trim: true,
            uppercase: true,
            minlength: [2, "El código debe tener al menos 2 caracteres"],
            maxlength: [10, "El código no puede superar los 10 caracteres"],
            match: [/^[A-Z0-9]+$/, "El código solo admite letras y números"],
        },
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            trim: true,
            minlength: [3, "El nombre debe tener al menos 3 caracteres"],
            maxlength: [100, "El nombre no puede superar los 100 caracteres"],
        },
        descripcion: {
            type: String,
            trim: true,
            maxlength: [500, "La descripción no puede superar los 500 caracteres"],
        },
        cargaHoraria: {
            type: Number,
            required: [true, "La carga horaria es obligatoria"],
            min: [1, "La carga horaria debe ser mayor que cero"],
            validate: {
                validator: Number.isInteger,
                message: "La carga horaria debe ser un número entero",
            },
        },
        estado: {
            type: String,
            required: [true, "El estado es obligatorio"],
            enum: {
                values: ["activa", "inactiva"],
                message: "El estado debe ser activa o inactiva",
            },
        },
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model("Materia", materiaSchema)
