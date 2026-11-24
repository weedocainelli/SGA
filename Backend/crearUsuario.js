const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Usuario= require('./models/Usuario');

const crearUsuario = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const email = "mati@gmail.com";
        const password = "password123";


        const hash  = await bcrypt.hash(password, 10);

        const usuario = new Usuario({
            nombre: "Matias",
            email: "mati@gmail.com",
            password: hash,
            rol: "admin"
        });


        await usuario.save();
        console.log("Usuario creado exitosamente");
        console.log("email:", email);
    } catch (error) {
        console.error("Error al crear el usuario:", error);
    }finally {
        await mongoose.disconnect();
    }


};

crearUsuario();