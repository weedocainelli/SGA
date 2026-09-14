const express = require("express")
const app = express()
app.use(express.json())
const alumnosRoutes = require("./routes/alumnos.routes")
app.use("/alumnos", alumnosRoutes)
const conectarBD = require("./config/database")
require("dotenv").config()
const PORT = process.env.PORT

conectarBD()

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})


// Creo un middleware
// app.use((req, res, next) => {
//     console.log(req.method)
//     console.log(req.url)
//     next()
// })



