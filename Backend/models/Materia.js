const mongoose = require("mongoose")

// Esquema de la materia: campos y validaciones.
const materiaSchema = new mongoose.Schema(
    {
        // Clave de negocio. unique crea un índice único en MongoDB, la protección definitiva contra duplicados.
        codigo: {
            type: String,
            required: [true, "El código es obligatorio"],
            unique: true,
            trim: true,
            uppercase: true,
            minlength: [2, "El código debe tener al menos 2 caracteres"],
            maxlength: [10, "El código no puede superar los 10 caracteres"],
            // Solo letras y números, con al menos una letra.
            match: [/^(?=.*[A-Z])[A-Z0-9]+$/, "El código solo admite letras y números, con al menos una letra"],
        },
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            trim: true,
            minlength: [3, "El nombre debe tener al menos 3 caracteres"],
            maxlength: [100, "El nombre no puede superar los 100 caracteres"],
        },
        // Es opcional, por eso no tiene required.
        descripcion: {
            type: String,
            trim: true,
            maxlength: [500, "La descripción no puede superar los 500 caracteres"],
        },
        cargaHoraria: {
            type: Number,
            required: [true, "La carga horaria es obligatoria"],
            // min rechaza cero y negativos; el validador rechaza decimales.
            min: [1, "La carga horaria debe ser mayor que cero"],
            validate: {
                validator: Number.isInteger,
                message: "La carga horaria debe ser un número entero",
            },
        },
        estado: {
            type: String,
            required: [true, "El estado es obligatorio"],
            // Limita el estado a los valores permitidos.
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
