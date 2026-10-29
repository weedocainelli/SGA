import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
const API_DOCENTES = "http://localhost:3000/docentes"

export function ListaDocentes({ actualizar, onDocenteCreado, onEditarDocente }) {
    // docentes guarda el array recibido; cargando y error controlan la vista alternativa.
    const [docentes, setDocentes] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarDocente(dni) {
        // Evita borrar por accidente si el usuario cancela la confirmación.
        const confirmar = window.confirm("¿Está seguro de eliminar el docente?")
        // Al cancelar, se sale antes de contactar al backend.
        if (!confirmar) return

        try {
            // El DNI identifica al docente que se elimina.
            const respuesta = await fetch(`${API_DOCENTES}/${dni}`, {
                method: "DELETE"
            })

            if (!respuesta.ok) {
                throw new Error(
                    `No se pudo eliminar el docente. Estado HTTP: ${respuesta.status}`
                )
            }

            // Notifica al padre para que vuelva a cargar el listado.
            onDocenteCreado()
        } catch (error) {
            console.error("Error al eliminar el docente", error)
            alert(error.message || "No se pudo eliminar el docente.")
        }
    }

    useEffect(() => {
        async function cargarDocentes(){
            // Reinicia la vista antes de pedir la lista.
            setCargando(true)
            setError("")

            try {
            // Solicita todos los docentes al backend.
            const respuesta = await fetch(API_DOCENTES)

            if (!respuesta.ok){
                // fetch no falla por respuestas HTTP 4xx/5xx: se comprueba ok.
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            // Parsea el cuerpo JSON y guarda el array para que React lo dibuje.
            const datos = await respuesta.json()
            setDocentes(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de docentes.")
        } finally {
            setCargando(false)
        }
    }
        cargarDocentes()
    // Ejecuta la consulta inicial y la repite cuando la página cambia actualizar.
    }, [actualizar])

    // Renderizado condicional: carga y error reemplazan temporalmente el listado.
    if (cargando) {
        return (
            <Paper
                component="section"
                variant="outlined"
                sx={{ p: 3, borderRadius: 3, borderColor: "divider" }}
            >
                <Typography color="text.secondary">Cargando docentes...</Typography>
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
                Docentes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                Consultá y administrá los registros del sistema.
            </Typography>
            {docentes.length === 0
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
                        {/* Array vacío: mostramos un mensaje en vez de una lista sin filas. */}
                        <Typography color="text.secondary">
                            No hay docentes registrados.
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
                        {/* Cada objeto crea una fila; DNI es estable y permite identificarla con key. */}
                        {docentes.map(docente => (
                            <Paper
                                component="li"
                                key={docente.dni}
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
                                            {docente.nombre}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ overflowWrap: "anywhere" }}
                                        >
                                            DNI {docente.dni} · {docente.especialidad}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ overflowWrap: "anywhere" }}
                                        >
                                            {docente.correo}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                                        {/* Se pasa la fila elegida al padre para iniciar la edición. */}
                                        <Button
                                            type="button"
                                            size="small"
                                            variant="outlined"
                                            onClick={() => onEditarDocente(docente)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            type="button"
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            // El DNI se agrega a la URL para borrar ese registro específico.
                                            onClick={() => eliminarDocente(docente.dni)}
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