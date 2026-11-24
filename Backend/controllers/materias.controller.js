const Materia = require("../models/Materia")

const ESTADOS = ["activa", "inactiva"]

// Deja el código sin espacios y en mayúsculas, igual a como se guarda.
function normalizarCodigo(codigo) {
    return typeof codigo === "string" ? codigo.trim().toUpperCase() : ""
}

// Revisa los datos antes de ir a la base. Devuelve el primer error o null.
function validarMateria({ codigo, nombre, descripcion, cargaHoraria, estado }) {
    const codigoLimpio = normalizarCodigo(codigo)
    const nombreLimpio = typeof nombre === "string" ? nombre.trim() : ""
    const horas = Number(cargaHoraria)

    if (!codigoLimpio) {
        return "El código es obligatorio"
    }
    if (!/^[A-Z0-9]{2,10}$/.test(codigoLimpio)) {
        return "El código debe tener entre 2 y 10 letras o números, sin espacios"
    }
    // El código es textual: debe tener al menos una letra.
    if (!/[A-Z]/.test(codigoLimpio)) {
        return "El código debe contener al menos una letra"
    }
    if (!nombreLimpio || nombreLimpio.length < 3 || nombreLimpio.length > 100) {
        return "El nombre es obligatorio y debe tener entre 3 y 100 caracteres"
    }
    // Es opcional: solo se revisa si vino con contenido.
    if (descripcion !== undefined && descripcion !== null && descripcion !== "") {
        if (typeof descripcion !== "string" || !descripcion.trim()) {
            return "La descripción no puede contener únicamente espacios"
        }
    }
    if (cargaHoraria === undefined || cargaHoraria === null || cargaHoraria === "") {
        return "La carga horaria es obligatoria"
    }
    if (!Number.isInteger(horas) || horas <= 0) {
        return "La carga horaria debe ser un número entero mayor que cero"
    }
    if (!ESTADOS.includes(estado)) {
        return "El estado debe ser activa o inactiva"
    }
    return null
}

// Convierte los errores en respuestas controladas, sin exponer detalles internos.
function manejarError(error, res) {
    // 11000: clave duplicada, lanzada por el índice único ante pedidos simultáneos.
    if (error.code === 11000) {
        return res.status(409).json({ mensaje: "Ya existe una materia con ese código" })
    }
    if (error.name === "ValidationError") {
        const primerError = Object.values(error.errors)[0]
        return res.status(400).json({ mensaje: primerError.message })
    }
    console.error(error)
    res.status(500).json({ mensaje: "Error interno del servidor" })
}

// GET /materias: devuelve todas, ordenadas por código.
async function obtenerMaterias(req, res) {
    try {
        const materias = await Materia.find().sort({ codigo: 1 })
        res.json(materias)
    } catch (error) {
        manejarError(error, res)
    }
}

// GET /materias/:codigo: devuelve una o responde 404.
async function obtenerMateria(req, res) {
    try {
        const materia = await Materia.findOne({ codigo: normalizarCodigo(req.params.codigo) })
        if (!materia) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }
        res.json(materia)
    } catch (error) {
        manejarError(error, res)
    }
}

// POST /materias: valida, controla duplicados y registra la materia.
async function crearMateria(req, res) {
    const mensajeError = validarMateria(req.body)
    if (mensajeError) {
        return res.status(400).json({ mensaje: mensajeError })
    }

    const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
    const codigoLimpio = normalizarCodigo(codigo)

    try {
        // Se busca antes de insertar para dar un mensaje claro. Responde 409 si ya existe.
        const existente = await Materia.findOne({ codigo: codigoLimpio })
        if (existente) {
            return res.status(409).json({ mensaje: "Ya existe una materia con ese código" })
        }

        const nuevaMateria = await Materia.create({
            codigo: codigoLimpio,
            nombre: nombre.trim(),
            descripcion: descripcion ? descripcion.trim() : "",
            cargaHoraria: Number(cargaHoraria),
            estado,
        })
        res.status(201).json(nuevaMateria)
    } catch (error) {
        manejarError(error, res)
    }
}

// PUT /materias/:codigo: la URL indica qué materia es y el cuerpo, cómo queda.
async function actualizarMateria(req, res) {
    const mensajeError = validarMateria(req.body)
    if (mensajeError) {
        return res.status(400).json({ mensaje: mensajeError })
    }

    const codigoActual = normalizarCodigo(req.params.codigo)
    const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
    const codigoNuevo = normalizarCodigo(codigo)

    try {
        const materia = await Materia.findOne({ codigo: codigoActual })
        if (!materia) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }

        // Solo se busca un duplicado si el código cambió: conservar el propio no es un duplicado.
        if (codigoNuevo !== codigoActual) {
            const duplicada = await Materia.findOne({ codigo: codigoNuevo })
            if (duplicada) {
                return res.status(409).json({ mensaje: "Ya existe una materia con ese código" })
            }
        }

        const materiaActualizada = await Materia.findOneAndUpdate(
            { codigo: codigoActual },
            {
                codigo: codigoNuevo,
                nombre: nombre.trim(),
                descripcion: descripcion ? descripcion.trim() : "",
                cargaHoraria: Number(cargaHoraria),
                estado,
            },
            // Devuelve el documento modificado y aplica las reglas del esquema.
            { returnDocument: "after", runValidators: true }
        )
        if (!materiaActualizada) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }

        res.json(materiaActualizada)
    } catch (error) {
        manejarError(error, res)
    }
}

// DELETE /materias/:codigo: elimina la materia o responde 404.
async function eliminarMateria(req, res) {
    try {
        const materia = await Materia.findOneAndDelete({ codigo: normalizarCodigo(req.params.codigo) })
        if (!materia) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }

        res.json({ mensaje: "Materia eliminada correctamente" })
    } catch (error) {
        manejarError(error, res)
    }
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria,
}
