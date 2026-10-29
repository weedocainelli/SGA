const Alumno = require("../models/Alumno") 

async function obtenerAlumnos(req, res) { 
    const alumnos = await Alumno.find()
    res.json(alumnos) 
}

async function obtenerAlumno(req, res) {
    const alumno = await Alumno.findOne({ 
        legajo: Number(req.params.id)
    }) 
    if (!alumno) { 
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        })
    }
    res.json(alumno) 
}

async function crearAlumno(req, res) {
    const { legajo, nombre, carrera, correo } = req.body
    const legajoNormalizado = Number(legajo)
    const nombreLimpio = typeof nombre === "string" ? nombre.trim() : ""
    const carreraLimpia = typeof carrera === "string" ? carrera.trim() : ""
    const correoLimpio = typeof correo === "string" ? correo.trim() : ""

    if (!legajo || !nombre || !carrera || !correo) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        })
    }

    if (!Number.isInteger(legajoNormalizado) || legajoNormalizado <= 0) {
        return res.status(400).json({
            mensaje: "El legajo debe ser un número válido"
        })
    }

    if (!nombreLimpio || nombreLimpio.length < 3) {
        return res.status(400).json({
            mensaje: "El nombre debe tener al menos 3 caracteres"
        })
    }

    if (!carreraLimpia || !correoLimpio || !correoLimpio.includes("@")) {
        return res.status(400).json({
            mensaje: "La carrera y el correo son obligatorios y el correo debe ser válido"
        })
    }

    const existe = await Alumno.findOne({
        legajo: legajoNormalizado
    })
    if (existe) {
        return res.status(400).json({
            mensaje: "El legajo ya existe"
        })
    }
    const nuevoAlumno = await Alumno.create({
        legajo: legajoNormalizado,
        nombre: nombreLimpio,
        carrera: carreraLimpia,
        correo: correoLimpio
    })
    res.status(201).json(nuevoAlumno)
}

async function actualizarAlumno(req, res) {
    const { nombre, carrera, correo } = req.body
    const alumno = await Alumno.findOneAndUpdate( 
        { legajo: Number(req.params.id) }, 
        { nombre, carrera, correo }, 
        { returnDocument: "after" } 
    )
    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no econtrado"
        })
    }

    res.json(alumno)
}

async function eliminarAlumno(req, res) {
    const alumno = await Alumno.findOneAndDelete( 
        { legajo: Number(req.params.id) } 
    )
    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no econtrado"
        })
    }

    res.json({ mensaje: "Alumno eliminado correctamente" })
}

module.exports = {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
} 