const Docente = require("../models/Docente")

async function obtenerDocentes(req, res) {
    const docentes = await Docente.find()
    res.json(docentes)
}

async function obtenerDocente(req, res) {
    const docente = await Docente.findOne({ dni: Number(req.params.id) })
    if (!docente) {
        return res.status(404).json({ mensaje: "Docente no encontrado" })
    }
    res.json(docente)
}

async function crearDocente(req, res) {
    const { dni, nombre, especialidad, correo } = req.body
    const dniNormalizado = Number(dni)
    const nombreLimpio = typeof nombre === "string" ? nombre.trim() : ""
    const especialidadLimpia = typeof especialidad === "string" ? especialidad.trim() : ""
    const correoLimpio = typeof correo === "string" ? correo.trim() : ""

    if (
        !Number.isInteger(dniNormalizado) ||
        dniNormalizado <= 0 ||
        !nombreLimpio ||
        !especialidadLimpia ||
        !correoLimpio ||
        !correoLimpio.includes("@")
    ) {
        return res.status(400).json({
            mensaje: "DNI, nombre, especialidad y correo son obligatorios y válidos",
        })
    }

    const existente = await Docente.findOne({ dni: dniNormalizado })
    if (existente) {
        return res.status(409).json({ mensaje: "El DNI ya está registrado" })
    }

    const nuevoDocente = await Docente.create({
        dni: dniNormalizado,
        nombre: nombreLimpio,
        especialidad: especialidadLimpia,
        correo: correoLimpio,
    })
    res.status(201).json(nuevoDocente)
}

async function actualizarDocente(req, res) {
    const { nombre, especialidad, correo } = req.body
    if (
        typeof nombre !== "string" ||
        !nombre.trim() ||
        typeof especialidad !== "string" ||
        !especialidad.trim() ||
        typeof correo !== "string" ||
        !correo.trim()
    ) {
        return res.status(400).json({
            mensaje: "Nombre, especialidad y correo son obligatorios",
        })
    }

    const docente = await Docente.findOneAndUpdate(
        { dni: Number(req.params.id) },
        {
            nombre: nombre.trim(),
            especialidad: especialidad.trim(),
            correo: correo.trim(),
        },
        { returnDocument: "after", runValidators: true }
    )
    if (!docente) {
        return res.status(404).json({ mensaje: "Docente no encontrado" })
    }

    res.json(docente)
}

async function eliminarDocente(req, res) {
    const docente = await Docente.findOneAndDelete({ dni: Number(req.params.id) })
    if (!docente) {
        return res.status(404).json({ mensaje: "Docente no encontrado" })
    }

    res.json({ mensaje: "Docente eliminado correctamente" })
}

module.exports = {
    obtenerDocentes,
    obtenerDocente,
    crearDocente,
    actualizarDocente,
    eliminarDocente,
}
