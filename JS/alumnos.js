const alumnos = [
    { id: 1, nombre: "Juan", carrera: "Ingeniería", correo: "juan@mail.com" },
    { id: 2, nombre: "María", carrera: "Sistemas", correo: "maria@mail.com" },
    { id: 3, nombre: "Pedro", carrera: "Contador", correo: "pedro@mail.com" }
];

const materias = [
    { id: 1, nombre: "Matemáticas" },
    { id: 2, nombre: "Ciencias" },
    { id: 3, nombre: "Historia" }
];

const docentes = [
    { id: 1, nombre: "Dr. García" },
    { id: 2, nombre: "Lic. Rodríguez" },
    { id: 3, nombre: "Ing. López" }
];

let nextId = alumnos.length + 1;
let idEditando = null;

function obtenerAlumnos() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(alumnos);
        }, 1000);
    });
}

function obtenerMaterias() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(materias);
        }, 1000);
    });
}

function obtenerDocentes() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(docentes);
        }, 1000);
    });
}

async function mostrarMaterias() {
    const datos = await obtenerMaterias();
    console.table(datos);
}

async function mostrarDocentes() {
    const datos = await obtenerDocentes();
    console.table(datos);
}

function renderizarAlumnos(lista) {
    const tbody = document.getElementById("listaAlumnos");
    tbody.innerHTML = "";

    lista.forEach(a => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${a.id}</td>
            <td>${a.nombre}</td>
            <td>${a.carrera}</td>
            <td>${a.correo}</td>
            <td>
                <button type="button" onclick="editarAlumno(${a.id})">Editar</button>
                <button type="button" onclick="eliminarAlumno(${a.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });

    document.getElementById("cantidadAlumnos").textContent = `Total de alumnos: ${lista.length}`;
}

function eliminarAlumno(id) {
    const index = alumnos.findIndex(a => a.id === id);
    if (index !== -1) {
        const nombre = alumnos[index].nombre;
        alumnos.splice(index, 1);
        renderizarAlumnos(alumnos);
        mostrarMensaje(`Alumno ${nombre} eliminado correctamente`, "ok");
    }
}

function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.style.color = tipo === "error" ? "red" : "green";
}

function editarAlumno(id) {
    const alumno = alumnos.find(a => a.id === id);
    if (!alumno) return;

    document.getElementById("nombre").value = alumno.nombre;
    document.getElementById("carrera").value = alumno.carrera;
    document.getElementById("correo").value = alumno.correo;

    idEditando = id;
    document.querySelector("#formAlumno button[type='submit']").textContent = "Guardar cambios";
}

document.getElementById("formAlumno").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const nombre = document.getElementById("nombre").value.trim();
        const carrera = document.getElementById("carrera").value.trim();
        const correo = document.getElementById("correo").value.trim();

        if (!nombre || !carrera || !correo) {
            throw new Error("Todos los campos son obligatorios");
        }

        if (idEditando !== null) {
            const alumno = alumnos.find(a => a.id === idEditando);
            alumno.nombre = nombre;
            alumno.carrera = carrera;
            alumno.correo = correo;
            idEditando = null;
            document.querySelector("#formAlumno button[type='submit']").textContent = "Guardar alumno";
            mostrarMensaje("Alumno editado correctamente", "ok");
        } else {
            alumnos.push({ id: nextId++, nombre, carrera, correo });
            mostrarMensaje("Alumno agregado correctamente", "ok");
        }
        renderizarAlumnos(alumnos);
        e.target.reset();
    } catch (error) {
        mostrarMensaje(error.message, "error");
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const datos = await obtenerAlumnos();
    renderizarAlumnos(datos);
});