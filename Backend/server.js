require("dotenv").config() 

const express = require("express") 
const cors = require("cors")

const conectarDB = require("./config/database")
const alumnosRoutes = require("./routes/alumnos.routes") 
const docentesRoutes = require("./routes/docentes.routes")
const materiasRoutes = require("./routes/materias.routes")
const authRoutes = require("./routes/authRoutes")

const app = express() 

app.use(express.json()) 
app.use(cors()) 
app.use("/alumnos", alumnosRoutes) 
app.use("/docentes", docentesRoutes)
app.use("/auth", authRoutes)
app.use("/materias", materiasRoutes)

// Middleware de errores: Express lo reconoce por sus 4 parámetros. Evita mostrar la traza, por ejemplo ante un JSON mal formado.
app.use((error, req, res, next) => {
    if (error.type === "entity.parse.failed") {
        return res.status(400).json({ mensaje: "El formato de los datos enviados no es válido" })
    }
    console.error(error)
    res.status(500).json({ mensaje: "Error interno del servidor" })
})

const PORT = process.env.PORT || 3000

conectarDB() 

console.log("Ejecutado con nodemon")

app.listen(PORT, () => { 
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})


// Creo un middleware
// app.use((req, res, next) => {
//     console.log(req.method)
//     console.log(req.url)
//     next()
// })