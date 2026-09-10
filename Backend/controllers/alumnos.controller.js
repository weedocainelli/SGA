const Alumno = require('../models/alumno')

async function obtenerAlumnos(req, res){
    const alumnos = await Alumno.find()
    res.json(alumnos)
}

async function obtenerAlumno(req, res) {
    const alumno = await Alumno.findOne({ legajo: Number(req.params.id) })
    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        })
    }
    res.json(alumno)
}

async function crearAlumno(req, res) {
    const { legajo, nombre, carrera, correo } = req.body

    if (legajo === undefined || !nombre || !carrera || !correo) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        })
    }

    if (typeof nombre !== "string" || typeof carrera !== "string" || typeof correo !== "string") {
        return res.status(400).json({
            mensaje: "Nombre, carrera y correo deben ser textos"
        })
    }

    const legajoNumero = Number(legajo)
    if (Number.isNaN(legajoNumero) || legajoNumero <= 0) {
        return res.status(400).json({
            mensaje: "El legajo debe ser un número válido"
        })
    }

    const nuevoAlumno = await Alumno.create({
        legajo: legajoNumero,
        nombre: nombre.trim(),
        carrera: carrera.trim(),
        correo: correo.trim()
    })

    res.status(201).json(nuevoAlumno)
}

async function actualizarAlumno(req, res) {
    const alumno = await Alumno.findOneAndUpdate(
        { legajo: Number(req.params.id) },
        req.body,
        { new: true }
    )

    if (!alumno){
      return  res.status(404).json({
            mensaje: "Alumno no encontrado"
        })
    }

    res.json(alumno)
}

async function eliminarAlumno(req, res) {
    const alumno = await Alumno.findOneAndDelete({ legajo: Number(req.params.id) })

    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        })
    }

    res.json({ mensaje: "Alumno eliminado correctamente" })
}

module.exports = { obtenerAlumnos, 
    obtenerAlumno, 
    crearAlumno, 
    actualizarAlumno,
    eliminarAlumno }