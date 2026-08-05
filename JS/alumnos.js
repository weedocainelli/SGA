const alumnos = [
    {
        id: 1,
        nombre: "Juan"
    },
    {
        id: 2,
        nombre: "María",
    },
    {
        id: 3,
        nombre: "Pedro",
    }
];

const materias = [
    {
        id: 1,
        nombre: "Matemáticas"
    },
    {
        id: 2,
        nombre: "Ciencias"
    },
    {
        id: 3,
        nombre: "Historia"
    }
];

const docentes = [
    {
        id: 1,
        nombre: "Dr. García"
    },
    {
        id: 2,
        nombre: "Lic. Rodríguez"
    },
    {
        id: 3,
        nombre: "Ing. López"
    }
];

function obtenerAlumnos(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(alumnos);
        }, 3000);
    })
}

async function mostrarAlumnos(){
    const datos = await obtenerAlumnos();
    console.table(datos);
}

mostrarAlumnos();

// crear obtenerMaterias()
// crear obtenerDocentes()
// mostrar los datos a travez de async/await

function obtenerMaterias(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(materias);
        }, 3000);
    })
}

async function mostrarMaterias(){
    const datos = await obtenerMaterias();
    console.table(datos);
}

function obtenerDocentes(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(docentes);
        }, 3000);
    })
}

async function mostrarDocentes(){
    const datos = await obtenerDocentes();
    console.table(datos);
}