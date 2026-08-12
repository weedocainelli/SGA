console.log("Abriendo Sistema de Gestion Academica");
setTimeout(() => {
    console.log("Alumnos Cargados");
}, 3000);

console.log("El usuario pude seguir navegando");

function obtenerAlumnosDemo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Alumnos cargados");
            resolve(["Ana", "Juan", "Pedro"]);
        }, 3000);
    });
}

obtenerAlumnosDemo().then((alumnos) => {
    console.log(alumnos);
});

async function iniciar() {
    const alumnos = await obtenerAlumnosDemo();
    console.log(alumnos);
}
iniciar();

function obtenerClima() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Clima cargado");
            resolve({ temperatura: 25, condiciones: "Soleado" });
        }, 3000);
    });
}

// con then()
obtenerClima().then((clima) => {
    console.log(clima);
});

// con async/await
async function iniciarClima() {
    const clima = await obtenerClima();
    console.log(clima);
}
iniciarClima();

function obtenerSaldo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(15000);
        }, 3000);
    });
}

async function mostrarSaldo() {
    const saldo = await obtenerSaldo();
    console.log(`Su saldo es: ${saldo}`);
}
mostrarSaldo();

function iniciarSesion() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Sesion iniciada");
        }, 3000);
    });
}