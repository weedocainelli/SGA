import { useState } from "react";
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
// Dirección del endpoint de docentes del backend.
const API_DOCENTES = "http://localhost:3000/docentes"

function FormularioD({ onDocenteCreado, docenteEditar, onCancelar }) {
    // docenteEditar es el objeto seleccionado para editar o null para registrar uno nuevo.
    // ?. y ?? dan valores iniciales vacíos al abrir el formulario de alta.
    const [formulario, setFormulario] = useState({
        dni: String(docenteEditar?.dni ?? ""),
        nombre: docenteEditar?.nombre ?? "",
        especialidad: docenteEditar?.especialidad ?? "",
        correo: docenteEditar?.correo ?? ""
    })
    // error muestra el fallo al usuario; guardando controla el envío en curso.
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    function manejarCambio(e) {
        // target identifica el input; name identifica qué propiedad actualizar.
        const { name, value} = e.target

        // Copia el estado previo y reemplaza solo el valor del campo modificado.
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    async function guardar(e) {
        // Impide que el envío recargue toda la página.
        e.preventDefault()
        setError("")
        // Desactiva los botones mientras espera la respuesta del servidor.
        setGuardando(true)

        // Los valores de input son texto; el backend recibe DNI como número.
        const docente = {
            ...formulario,
            dni: Number(formulario.dni),
        }
        // Decide entre POST para crear y PUT para actualizar.
        const editando = Boolean(docenteEditar)
        // En edición se identifica el docente por DNI en la URL; alta usa la colección.
        const url = editando ? `${API_DOCENTES}/${docenteEditar.dni}` : API_DOCENTES

        try {
            // Envía el docente serializado en formato JSON al backend.
            const respuesta = await fetch(url, {
                // POST crea y PUT actualiza el docente identificado por su DNI.
                method: editando ? "PUT" : "POST",
                // Este encabezado activa el parseo JSON en el servidor Express.
                headers: {"Content-Type":"application/json"},
                // fetch requiere el cuerpo como texto; JSON.stringify serializa el objeto.
                body: JSON.stringify(docente)
            })
            // fetch puede recibir 400/500 sin lanzar excepción: se verifica la respuesta.
            if (!respuesta.ok) {
                throw new Error(`No se pudo guardar el docente. Estado HTTP: ${respuesta.status}`)
            }
            setFormulario({
                dni: "",
                nombre: "",
                especialidad: "",
                correo: ""
            })
            // Avisa a la página para cerrar edición y refrescar el listado.
            onDocenteCreado()
        } catch (error) {
            // Puede ser un error de red o el Error que se lanza al recibir status no exitoso.
            console.error("Error al guardar:", error)
            setError(error.message || "No se pudo conectar con el servidor")
        } finally {
            // Siempre termina el estado de carga aunque la petición falle.
            setGuardando(false)
        }
    }
    return (
        <Paper
            component="section"
            variant="outlined"
            sx={{ p: { xs: 2.5, sm: 3 }, mb: 3, borderRadius: 3, borderColor: "divider" }}
        >
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                {docenteEditar ? "Editar Docente" : "Crear Docente"}
            </Typography>
            {/* Box usa un form HTML para que guardar responda al botón o a Enter. */}
            <Box
                component="form"
                onSubmit={guardar}
                sx={{
                    display: "grid",
                    gap: 2,
                    "& .form-fields": {
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 2,
                    },
                    "& .form-field": { display: "grid", gap: 0.75 },
                    "& label": { color: "text.secondary", fontSize: "0.875rem", fontWeight: 600 },
                    "& input": {
                        width: "100%",
                        minWidth: 0,
                        px: 1.5,
                        py: 1.25,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1.5,
                        bgcolor: "background.default",
                        color: "text.primary",
                    },
                }}
            >
                <Box className="form-fields">
                    <Box className="form-field">
                        <label htmlFor="dni">DNI</label>
                        {/* El patrón valida 7 u 8 dígitos y required impide dejarlo vacío. */}
                        <input
                            id="dni"
                            name="dni"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]{7,8}"
                            value={formulario.dni}
                            onChange={manejarCambio}
                            required
                        />
                    </Box>
                    <Box className="form-field">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            name="nombre"
                            value={formulario.nombre}
                            onChange={manejarCambio}
                            required
                        />
                    </Box>
                    <Box className="form-field">
                        <label htmlFor="especialidad">Especialidad</label>
                        <input
                            id="especialidad"
                            name="especialidad"
                            value={formulario.especialidad}
                            onChange={manejarCambio}
                            required
                        />
                    </Box>
                    <Box className="form-field">
                        <label htmlFor="correo">Correo</label>
                        <input
                            id="correo"
                            name="correo"
                            type="email"
                            value={formulario.correo}
                            onChange={manejarCambio}
                            required
                        />
                    </Box>
                </Box>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {guardando ? "Guardando..." : (docenteEditar ? "Guardar Cambios" : "Guardar")}
                    </Button>
                    {docenteEditar && (
                        <Button type="button" variant="outlined" onClick={onCancelar} disabled={guardando}>
                            Cancelar
                        </Button>
                    )}
                </Stack>
                {error && <Alert severity="error" role="alert">{error}</Alert>}
            </Box>
        </Paper>
    )
}
export default FormularioD