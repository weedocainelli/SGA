import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
const API_MATERIAS = "http://localhost:3000/materias"

export function ListaMaterias({ actualizar, onMateriaEliminada, onEditarMateria }) {
    const [materias, setMaterias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")
    const [errorEliminar, setErrorEliminar] = useState("")

    async function eliminarMateria(codigo) {
        const confirmar = window.confirm(`¿Está seguro de eliminar la materia ${codigo}?`)
        if (!confirmar) return

        setErrorEliminar("")
        try {
            const respuesta = await fetch(`${API_MATERIAS}/${codigo}`, {
                method: "DELETE"
            })

            if (!respuesta.ok) {
                const datos = await respuesta.json().catch(() => ({}))
                throw new Error(
                    datos.mensaje || `No se pudo eliminar la materia. Estado HTTP: ${respuesta.status}`
                )
            }

            onMateriaEliminada("Materia eliminada correctamente")
        } catch (error) {
            console.error("Error al eliminar la materia", error)
            setErrorEliminar(error instanceof TypeError
                ? "No se pudo conectar con el servidor"
                : error.message)
        }
    }

    useEffect(() => {
        async function cargarMaterias(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_MATERIAS)

            if (!respuesta.ok){
                throw new Error(`No se pudo obtener la lista. Estado HTTP: ${respuesta.status}`)
            }

            const datos = await respuesta.json()
            setMaterias(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de materias. Verificá que el servidor esté disponible.")
        } finally {
            setCargando(false)
        }
    }
        cargarMaterias()
    }, [actualizar])

    if (cargando) {
        return (
            <Paper
                component="section"
                variant="outlined"
                sx={{ p: 3, borderRadius: 3, borderColor: "divider" }}
            >
                <Typography color="text.secondary">Cargando materias...</Typography>
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
                Materias
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                Consultá y administrá los registros del sistema.
            </Typography>
            {errorEliminar && (
                <Alert severity="error" role="alert" onClose={() => setErrorEliminar("")} sx={{ mb: 2 }}>
                    {errorEliminar}
                </Alert>
            )}
            {materias.length === 0
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
                        <Typography color="text.secondary">
                            No hay materias registradas.
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
                        {materias.map(materia => (
                            <Paper
                                component="li"
                                key={materia.codigo}
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
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ fontWeight: 700, overflowWrap: "anywhere" }}
                                            >
                                                {materia.nombre}
                                            </Typography>
                                            <Chip
                                                size="small"
                                                label={materia.estado === "activa" ? "Activa" : "Inactiva"}
                                                color={materia.estado === "activa" ? "success" : "default"}
                                                variant="outlined"
                                            />
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ overflowWrap: "anywhere" }}
                                        >
                                            Código {materia.codigo} · {materia.cargaHoraria} horas
                                        </Typography>
                                        {materia.descripcion && (
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ overflowWrap: "anywhere" }}
                                            >
                                                {materia.descripcion}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                                        <Button
                                            type="button"
                                            size="small"
                                            variant="outlined"
                                            onClick={() => onEditarMateria(materia)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            type="button"
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => eliminarMateria(materia.codigo)}
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
