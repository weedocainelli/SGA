const formulario = document.querySelector("#formDocente")
const listaDocentes = document.querySelector("#listaDocentes")
const botonGuardar = document.querySelector("#btnGuardarDocente")
const botonCancelar = document.querySelector("#btnCancelarDocente")
const tituloFormulario = document.querySelector("#tituloFormularioDocente")
let docenteEditandoId = null

formulario.addEventListener("submit", function (event) {
    event.preventDefault()

    const nombre = formulario.elements.nombre.value.trim()
    const especialidad = formulario.elements.especialidad.value.trim()
    const correo = formulario.elements.correo.value.trim()

    if (nombre.length < 3 || !especialidad || !correo) {
        mostrarMensaje("Completá todos los campos. El nombre debe tener al menos 3 caracteres.", "mje-error")
        return
    }

    const docentes = obtenerDocentes()
    if (docenteEditandoId === null) {
        docentes.push({
            id: Date.now(),
            nombre,
            especialidad,
            correo,
        })
        mostrarMensaje("Docente guardado correctamente", "mje-exito")
    } else {
        const docente = docentes.find(({ id }) => id === docenteEditandoId)
        if (!docente) {
            limpiarFormulario()
            mostrarMensaje("No se encontró el docente que querías editar.", "mje-error")
            return
        }

        docente.nombre = nombre
        docente.especialidad = especialidad
        docente.correo = correo
        mostrarMensaje("Docente actualizado correctamente", "mje-exito")
    }

    guardarDatos("docentes", docentes)
    mostrarDocentes(docentes)
    limpiarFormulario()
})

function obtenerDocentes() {
    return obtenerDatos("docentes")
}

function mostrarDocentes(docentes) {
    const filas = docentes.map((docente) => {
        const fila = document.createElement("tr")
        const valores = [docente.id, docente.nombre, docente.especialidad, docente.correo]

        for (const valor of valores) {
            const celda = document.createElement("td")
            celda.textContent = String(valor ?? "")
            fila.append(celda)
        }

        const acciones = document.createElement("td")
        const botonEditar = document.createElement("button")
        botonEditar.type = "button"
        botonEditar.className = "btn-editar"
        botonEditar.dataset.id = docente.id
        botonEditar.textContent = "Editar"
        botonEditar.title = "Editar docente"

        const botonEliminar = document.createElement("button")
        botonEliminar.type = "button"
        botonEliminar.className = "btn-eliminar"
        botonEliminar.dataset.id = docente.id
        botonEliminar.textContent = "Eliminar"
        botonEliminar.title = "Eliminar docente"

        acciones.append(botonEditar, botonEliminar)
        fila.append(acciones)
        return fila
    })

    listaDocentes.replaceChildren(...filas)
}

function eliminarDocente(id) {
    const docentes = obtenerDocentes().filter((docente) => docente.id !== id)
    guardarDatos("docentes", docentes)
    mostrarDocentes(docentes)

    if (docenteEditandoId === id) {
        limpiarFormulario()
    }

    mostrarMensaje("Docente eliminado correctamente", "mje-exito")
}

listaDocentes.addEventListener("click", (event) => {
    const boton = event.target.closest("button[data-id]")
    if (!boton) return

    const id = Number(boton.dataset.id)
    if (boton.classList.contains("btn-eliminar")) {
        if (confirm("¿Está seguro de eliminar este docente?")) {
            eliminarDocente(id)
        }
        return
    }

    editarDocente(id)
})

function editarDocente(id) {
    const docente = obtenerDocentes().find((item) => item.id === id)
    if (!docente) {
        mostrarMensaje("No se encontró el docente que querías editar.", "mje-error")
        return
    }

    formulario.elements.nombre.value = docente.nombre
    formulario.elements.especialidad.value = docente.especialidad
    formulario.elements.correo.value = docente.correo
    docenteEditandoId = id
    botonGuardar.textContent = "Actualizar Docente"
    botonCancelar.hidden = false
    tituloFormulario.textContent = "Editar Docente"
    formulario.elements.nombre.focus()
}

function limpiarFormulario() {
    formulario.reset()
    docenteEditandoId = null
    botonGuardar.textContent = "Guardar Docente"
    botonCancelar.hidden = true
    tituloFormulario.textContent = "Alta de Docente"
}

botonCancelar.addEventListener("click", limpiarFormulario)
mostrarDocentes(obtenerDocentes())
