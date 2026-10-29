const mongoose = require("mongoose")

const docenteSchema = new mongoose.Schema(
    {
        dni: {
            type: Number,
            required: true,
            unique: true,
        },
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        especialidad: {
            type: String,
            required: true,
            trim: true,
        },
        correo: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model("Docente", docenteSchema)
