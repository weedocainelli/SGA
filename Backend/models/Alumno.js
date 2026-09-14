const mongoose = require("mongoose")

const AlumnoSchema = new mongoose.Schema({
    legajo: {type: Number, unique: true},
    nombre: {type: String, required: true},
    carrera: {type: String, required: true},
    correo: {type: String, required: true}
},
{
    versionKey: false // Evita que se genere el campo __v
})

const Alumno = mongoose.model("Alumno", AlumnoSchema)
module.exports = Alumno