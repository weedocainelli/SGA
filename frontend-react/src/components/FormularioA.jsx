import { useState } from "react";
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
// Dirección del endpoint de alumnos que expone el backend.
const API_ALUMNOS = "http://localhost:3000/alumnos"

function FormularioA({ onAlumnoCreado, alumnoEditar, onCancelar }) {
    // alumnoEditar contiene el registro durante la edición o null durante un alta nueva.
    // ?. evita leer una propiedad de null; ?? usa "" cuando no hay un valor definido.
    // String convierte el legajo inicial a texto porque los inputs editan texto.
    const [formulario, setFormulario] = useState({
        legajo: String(alumnoEditar?.legajo ?? ""),
        nombre: alumnoEditar?.nombre ?? "",
        carrera: alumnoEditar?.carrera ?? "",
        correo: alumnoEditar?.correo ?? ""
    })
    // error guarda el mensaje para la alerta; guardando bloquea envíos repetidos.
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    function manejarCambio(e) {
        // e es el evento del input; target es el input que disparó el cambio.
        const { name, value} = e.target

        // name coincide con la clave del objeto (legajo, nombre, carrera o correo).
        // ...formulario copia los campos anteriores y [name] cambia solo el editado.
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    async function guardar(e) {
        // Evita la recarga tradicional del navegador al enviar el formulario.
        e.preventDefault()
        setError("")
        // Actualiza el botón y evita otro envío mientras la petición está pendiente.
        setGuardando(true)

        // Copia los campos del formulario y reemplaza legajo por un número para la API.
        const alumno = {
            ...formulario,
            legajo: Number(formulario.legajo)

        }
        // Con alumnoEditar se actualiza; sin él se crea un registro nuevo.
        const editando = Boolean(alumnoEditar)
        // Editar apunta al recurso /:legajo; crear apunta a la colección /alumnos.
        const url = editando ? `${API_ALUMNOS}/${alumnoEditar.legajo}` : API_ALUMNOS
        
        try {
            // fetch envía el registro como JSON al endpoint correspondiente.
            const respuesta = await fetch(url, {
                // El servidor decide entre actualización y creación por el método HTTP.
                method: editando ? "PUT" : "POST",
                // Informa al middleware express.json() que el cuerpo tiene formato JSON.
                headers: {"Content-Type":"application/json"},
                // Convierte el objeto de JavaScript a texto JSON para enviarlo por HTTP.
                body: JSON.stringify(alumno)
            })
            // fetch no rechaza la promesa por respuestas 400/500; hay que revisar ok.
            if (!respuesta.ok) {
                throw new Error(`No se pudo guardar el alumno. Estado HTTP: ${respuesta.status}`)
            }
            setFormulario({
                legajo: "",
                nombre: "",
                carrera: "",
                correo: ""
            })
            // El padre avisa al listado para recargar los datos.
            onAlumnoCreado()
        } catch (error) {
            // Atrapa fallos de red y el Error lanzado cuando la respuesta HTTP no fue exitosa.
            console.error("Error al guardar:", error)
            setError(error.message || "No se pudo conectar con el servidor")
        } finally {
            // Se ejecuta tanto si la petición tuvo éxito como si falló.
            setGuardando(false)
        }
    }
    return(
        <Paper
            component="section"
            variant="outlined"
            sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: 3,
                borderColor: "divider",
                bgcolor: "background.paper",
                boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                        ? "0 12px 32px rgba(0, 0, 0, 0.2)"
                        : "0 12px 32px rgba(32, 54, 94, 0.06)",
            }}
        >
            <Typography variant="h5" component="h2" sx={{ mb: 0.75 }}>
                {alumnoEditar ? "Editar Alumno" : "Crear Alumno"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                Completá los datos para gestionar el registro académico.
            </Typography>
            {/* Box se renderiza como form; submit ejecuta guardar y evita enviar por defecto. */}
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
                    "& .form-field": {
                        display: "grid",
                        gap: 0.75,
                        minWidth: 0,
                    },
                    "& label": {
                        color: "text.secondary",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                    },
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
                        outline: "none",
                        transition: "border-color 150ms ease, box-shadow 150ms ease",
                        "&:focus": {
                            borderColor: "primary.main",
                            boxShadow: (theme) =>
                                `0 0 0 3px ${theme.palette.primary.main}26`,
                        },
                    },
                }}
            >
                <Box className="form-fields">
                    {/* value + onChange hacen que cada input sea controlado por React. */}
                    <Box className="form-field">
                        <label htmlFor="legajo">Legajo</label>
                        <input
                            id="legajo"
                            name="legajo"
                            value={formulario.legajo}
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
                        <label htmlFor="carrera">Carrera</label>
                        <input
                            id="carrera"
                            name="carrera"
                            value={formulario.carrera}
                            onChange={manejarCambio}
                            required
                        />
                    </Box>
                    <Box className="form-field">
                        <label htmlFor="correo">Correo</label>
                        <input
                            id="correo"
                            name="correo"
                            value={formulario.correo}
                            onChange={manejarCambio}
                            required
                        />
                    </Box>
                </Box>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    sx={{ pt: 0.5 }}
                >
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {guardando ? "Guardando..." : (alumnoEditar ? "Guardar Cambios" : "Guardar")}
                    </Button>
                    {alumnoEditar && (
                        <Button type="button" variant="outlined" onClick={onCancelar}
                            disabled={guardando}>
                            Cancelar
                        </Button>
                    )}
                </Stack>
                {error && <Alert severity="error" role="alert">{error}</Alert>}
            </Box>
        </Paper>
    )
}
export default FormularioA