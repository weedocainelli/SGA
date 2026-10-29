import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
const API_ALUMNOS = "http://localhost:3000/alumnos"

export function ListaAlumnos({ actualizar, onAlumnoCreado, onEditarAlumno }) {
    // alumnos guarda el array descargado; los otros dos estados controlan la vista.
    const [alumnos, setAlumnos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarAlumno(legajo) {
        // Se pide confirmación antes de realizar una acción irreversible.
        const confirmar = window.confirm("¿Está seguro de eliminar el alumno?")
        // Si el usuario elige Cancelar, no se envía ninguna petición DELETE.
        if (!confirmar) return

        try {
            // DELETE identifica el alumno usando su legajo en la URL.
            const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, {
                method: "DELETE"
            })

            if (!respuesta.ok) {
                throw new Error(
                    `No se pudo eliminar el alumno. Estado HTTP: ${respuesta.status}`
                )
            }

            // La página incrementa actualizar y el efecto vuelve a consultar.
            onAlumnoCreado()
        } catch (error) {
            console.error("Error al eliminar el alumno", error)
            alert(error.message || "No se pudo eliminar el alumno.")
        }
    }

    useEffect(() => {
        async function cargarAlumnos(){
            // Antes de la consulta se muestra carga y se limpia un error anterior.
            setCargando(true)
            setError("")

            try {
            // GET obtiene la lista actual desde el backend.
            const respuesta = await fetch(API_ALUMNOS)

            if (!respuesta.ok){
                // fetch no considera 404/500 como error de red; se verifica status.
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            // Convierte el JSON de respuesta en array y lo guarda para renderizarlo.
            const datos = await respuesta.json()
            setAlumnos(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de alumnos.")
        } finally {
            setCargando(false)
        }
    }
        cargarAlumnos()
    // Corre al montar y luego cada vez que cambia actualizar (por ejemplo, tras guardar).
    }, [actualizar])

    // Render temprano: se muestra una sola vista mientras carga o si hubo error.
    if (cargando) {
        return (
            <Paper
                component="section"
                variant="outlined"
                sx={{ p: 3, borderRadius: 3, borderColor: "divider" }}
            >
                <Typography color="text.secondary">Cargando alumnos...</Typography>
            </Paper>
        )
    }
    if (error) {
        return <Alert severity="error" role="alert">{error}</Alert>
    }
    return (
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
                Alumnos
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                Consultá y administrá los registros del sistema.
            </Typography>
            {alumnos.length === 0
                ? (
                    <Box
                        sx={{
                            p: 3,
                            textAlign: "center",
                            border: 1,
                            borderStyle: "dashed",
                            borderColor: "divider",
                            borderRadius: 2,
                        }}
                    >
                        {/* Si el servidor devolvió [] no hay filas que mapear. */}
                        <Typography color="text.secondary">
                            No hay alumnos registrados.
                        </Typography>
                    </Box>
                )
                : (
                    <Box
                        component="ul"
                        sx={{
                            display: "grid",
                            gap: 1.5,
                            p: 0,
                            m: 0,
                            listStyle: "none",
                        }}
                    >
                        {/* map transforma cada objeto en un <li>; legajo identifica esa fila con key. */}
                        {alumnos.map(alumno => (
                            <Paper
                                component="li"
                                key={alumno.legajo}
                                variant="outlined"
                                sx={{
                                    p: { xs: 1.5, sm: 2 },
                                    borderRadius: 2,
                                    borderColor: "divider",
                                    transition: "border-color 150ms ease, transform 150ms ease",
                                    "&:hover": {
                                        borderColor: "primary.main",
                                        transform: "translateY(-1px)",
                                    },
                                }}
                            >
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={1.5}
                                    alignItems={{ xs: "stretch", sm: "center" }}
                                    justifyContent="space-between"
                                >
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ fontWeight: 700, overflowWrap: "anywhere" }}
                                        >
                                            {alumno.nombre}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ overflowWrap: "anywhere" }}
                                        >
                                            Legajo {alumno.legajo} · {alumno.carrera}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                                        {/* Se pasa la fila elegida al padre para iniciar la edición. */}
                                        <Button
                                            type="button"
                                            size="small"
                                            variant="outlined"
                                            onClick={() => onEditarAlumno(alumno)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            type="button"
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            // Se manda el identificador de esta fila al endpoint DELETE.
                                            onClick={() => eliminarAlumno(alumno.legajo)}
                                        >
                                            Eliminar
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Paper>
                        ))}
                    </Box>
                )}
        </Paper>
    )
}