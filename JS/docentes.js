const formulario = document.querySelector("#formulario")
const mensaje = document.querySelector("#mensaje")
const listaDocentes = document.querySelector("#listaDocentes")
let docenteEditandoId = null
let docenteEditar = null

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim()
    const materia = document.querySelector("#materia").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    if (nombre === "" || materia === "" || correo === "") {
        mostrarMensaje("Todos los campos son obligatorios", "mje-error")
        return
    }

    if (!correo.includes("@")) {
        mostrarMensaje("Ingrese un correo electrónico válido", "mje-error")
        return
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-error")
        return
    }

    const docentes = obtenerDocentes()

    if (docenteEditandoId === null) {
        const docente = {
            id: Date.now(),
            nombre: nombre,
            materia: materia,
            correo: correo
        }
        docentes.push(docente)
        mostrarMensaje("Docente guardado correctamente", "mje-exito")
    } else {
        const docente = docentes.find(docente => docente.id === docenteEditandoId)
        docente.nombre = nombre
        docente.materia = materia
        docente.correo = correo

        const datosActuales = {
            nombre: nombre,
            materia: materia,
            correo: correo
        }
        if (JSON.stringify(datosActuales) === JSON.stringify(docenteEditar)) {
            mostrarMensaje("No se realizaron cambios", "mje-error")
            return
        }

        docenteEditandoId = null
        docenteEditar = null
        formulario.querySelector("button").textContent = "Guardar Docente"

        mostrarMensaje("Docente actualizado correctamente", "mje-exito")
    }

    guardarDatos("docentes", docentes)
    mostrarDocentes(docentes)
    formulario.reset()
});

function obtenerDocentes() {
    return obtenerDatos("docentes")
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
                <button 
                class="btn-editar" 
                data-id="${docente.id}"
                title="Editar docente">
                <i class="fa-solid fa-pen"></i>
                </button>
                <button 
                class="btn-eliminar" 
                data-id="${docente.id}"
                title="Eliminar docente">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }
}

function eliminarDocente(id) {
    const docentes = obtenerDocentes()
    const docentesActualizados = docentes.filter(
        docente => docente.id !== id
    );
    guardarDatos("docentes", docentesActualizados)
    mostrarDocentes(docentesActualizados)
    if (docenteEditandoId === id) {
        formulario.reset()
        docenteEditandoId = null
        formulario.querySelector("button").textContent = "Guardar Docente"
    }
    mostrarMensaje("Docente eliminado correctamente", "mje-exito")
}

listaDocentes.addEventListener("click", (e) => {
    const boton_el = e.target.closest(".btn-eliminar")
    if (boton_el) {
        const id = Number(boton_el.dataset.id)
        const confirmar = confirm("¿Está seguro de eliminar este docente?")
        if (confirmar) {
            eliminarDocente(id)
        }
    }
    const boton_ed = e.target.closest(".btn-editar")
    if (boton_ed) {
        const id = Number(boton_ed.dataset.id)
        editarDocente(id)
    }
})

function editarDocente(id) {
    const docentes = obtenerDocentes()
    const docente = docentes.find(docente => docente.id === id)
    document.querySelector("#nombre").value = docente.nombre;
    document.querySelector("#materia").value = docente.materia;
    document.querySelector("#correo").value = docente.correo;

    docenteEditar = {
        nombre: docente.nombre,
        materia: docente.materia,
        correo: docente.correo
    }

    docenteEditandoId = id;
    formulario.querySelector("button").textContent = "Actualizar Docente"
    document.querySelector("#nombre").focus()
}

const docentes = obtenerDocentes()
mostrarDocentes(docentes)