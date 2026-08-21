const formulario = document.querySelector("#formDocente")
const mensaje = document.querySelector("#mensaje")
const listaDocentes = document.querySelector("#listaDocentes")
const cantidadDocentes = document.querySelector("#cantidadDocentes")
let docenteEditandoId = null

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value
    const materia = document.querySelector("#materia").value
    const correo = document.querySelector("#correo").value

    const docentes = obtenerDocentes()

    if (docenteEditandoId !== null) {
        const docente = docentes.find(d => d.id === docenteEditandoId)
        docente.nombre = nombre
        docente.materia = materia
        docente.correo = correo
        docenteEditandoId = null
        mostrarMensaje("Docente editado correctamente")
    } else {
        const docente = {
            id: Date.now(),
            nombre: nombre,
            materia: materia,
            correo: correo
        }
        docentes.push(docente)
        mostrarMensaje("Docente guardado correctamente")
    }

    localStorage.setItem("docentes", JSON.stringify(docentes))
    mostrarDocentes(docentes)
    formulario.reset()
});

function obtenerDocentes() {
    const datos = localStorage.getItem("docentes")
    if (datos) {
        return JSON.parse(datos)
    }
    return []
}

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = " ";
    }, 3000);
}

function mostrarDocentes(docentes) {
    listaDocentes.innerHTML = ""
    for (const docente of docentes) {
        listaDocentes.innerHTML += `
        <tr>
            <td>${docente.id}</td>
            <td>${docente.nombre}</td>
            <td>${docente.materia}</td>
            <td>${docente.correo}</td>
            <td>
                <button class="btn-editar" data-id="${docente.id}">Editar</button>
                <button class="btn-eliminar" data-id="${docente.id}">Eliminar</button>
            </td>
        </tr>
        `;
    }
    cantidadDocentes.textContent = `Total de docentes: ${docentes.length}`
}

function eliminarDocente(id) {
    const docentes = obtenerDocentes()
    const docentesActualizados = docentes.filter(
        docente => docente.id !== id
    );
    localStorage.setItem("docentes", JSON.stringify(docentesActualizados))
    mostrarDocentes(docentesActualizados)
    mostrarMensaje("Docente eliminado correctamente")
}

function editarDocente(id) {
    const docentes = obtenerDocentes()
    const docente = docentes.find(docente => docente.id === id)
    document.querySelector("#nombre").value = docente.nombre;
    document.querySelector("#materia").value = docente.materia;
    document.querySelector("#correo").value = docente.correo;
    docenteEditandoId = id;
}

listaDocentes.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const id = Number(e.target.dataset.id)
        eliminarDocente(id)
    }
    if (e.target.classList.contains("btn-editar")) {
        const id = Number(e.target.dataset.id)
        editarDocente(id)
    }
})

document.addEventListener("DOMContentLoaded", () => {
    mostrarDocentes(obtenerDocentes())
})