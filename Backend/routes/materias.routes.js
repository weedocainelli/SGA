const express = require("express")
const {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria,
} = require("../controllers/materias.controller")

// Rutas de materias: conectan cada método HTTP con su función. :codigo se lee con req.params.codigo.
const router = express.Router()

router.get("/", obtenerMaterias)
router.get("/:codigo", obtenerMateria)
router.post("/", crearMateria)
router.put("/:codigo", actualizarMateria)
router.delete("/:codigo", eliminarMateria)

module.exports = router
