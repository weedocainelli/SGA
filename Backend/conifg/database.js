const mongoose = require("mongoose")

async function conectarBD() {
    try {
        await mongoose.connect("mongodb://localhost:27017/SGA")
        console.log("Conexión a la base de datos exitosa")
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error)
    }
}

module.exports = conectarBD
  