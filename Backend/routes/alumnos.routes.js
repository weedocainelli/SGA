const express = require("express") 
// const alumnosController = require("../controllers/alumnos.controller")
const { verificarToken } = require("../middlewares/authMiddleware")
const { 
    obtenerAlumnos, 
    obtenerAlumno, 
    crearAlumno, 
    actualizarAlumno, 
    eliminarAlumno } = require("../controllers/alumnos.controller")
const router = express.Router() 

router.get("/",verificarToken, obtenerAlumnos) 

router.get("/:id", verificarToken, obtenerAlumno) 

router.post("/", verificarToken, crearAlumno) 

router.put("/:id", verificarToken, actualizarAlumno) 

router.delete("/:id", verificarToken, eliminarAlumno) 

module.exports = router 