import { useState } from "react";
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
const API_MATERIAS = "http://localhost:3000/materias"

// Valores para limpiar los campos después de guardar.
const FORMULARIO_VACIO = {
    codigo: "",
    nombre: "",
    descripcion: "",
    cargaHoraria: "",
    estado: "activa"
}

// Valida en el cliente antes de enviar. No reemplaza la validación del servidor.
function validar(formulario) {
    const codigo = formulario.codigo.trim()
    const nombre = formulario.nombre.trim()
    const horas = Number(formulario.cargaHoraria)

    if (!codigo) return "El código es obligatorio"
    if (!/^[A-Za-z0-9]{2,10}$/.test(codigo)) {
        return "El código debe tener entre 2 y 10 letras o números, sin espacios"
    }
    if (!/[A-Za-z]/.test(codigo)) return "El código debe contener al menos una letra"
    if (nombre.length < 3 || nombre.length > 100) {
        return "El nombre debe tener entre 3 y 100 caracteres"
    }
    if (formulario.descripcion && !formulario.descripcion.trim()) {
        return "La descripción no puede contener únicamente espacios"
    }
    if (formulario.cargaHoraria === "") return "La carga horaria es obligatoria"
    if (!Number.isInteger(horas) || horas <= 0) {
        return "La carga horaria debe ser un número entero mayor que cero"
    }
    if (!["activa", "inactiva"].includes(formulario.estado)) {
        return "El estado debe ser activa o inactiva"
    }
    return ""
}

// Formulario de alta y modificación: si recibe materiaEditar, edita; si no, crea.
function FormularioMateria({ onMateriaGuardada, materiaEditar, onCancelar }) {
    // Un solo estado con todos los campos. Al editar arranca con los datos de la materia.
    const [formulario, setFormulario] = useState({
        codigo: materiaEditar?.codigo ?? "",
        nombre: materiaEditar?.nombre ?? "",
        descripcion: materiaEditar?.descripcion ?? "",
        cargaHoraria: String(materiaEditar?.cargaHoraria ?? ""),
        estado: materiaEditar?.estado ?? "activa"
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    // Sirve para todos los campos: name indica cuál cambió y ...formulario conserva los demás.
    function manejarCambio(e) {
        const { name, value} = e.target

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    // Valida, arma el objeto y lo envía con POST o PUT.
    async function guardar(e) {
        e.preventDefault()
        setError("")

        const errorValidacion = validar(formulario)
        if (errorValidacion) {
            setError(errorValidacion)
            return
        }

        setGuardando(true)

        const materia = {
            codigo: formulario.codigo.trim().toUpperCase(),
            nombre: formulario.nombre.trim(),
            descripcion: formulario.descripcion.trim(),
            cargaHoraria: Number(formulario.cargaHoraria),
            estado: formulario.estado
        }
        const editando = Boolean(materiaEditar)
        // Al editar, la URL usa el código original, aunque se haya cambiado en el campo.
        const url = editando ? `${API_MATERIAS}/${materiaEditar.codigo}` : API_MATERIAS

        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(materia)
            })
            // fetch no falla con errores HTTP, por eso se revisa ok y se usa el mensaje del backend.
            if (!respuesta.ok) {
                const datos = await respuesta.json().catch(() => ({}))
                throw new Error(datos.mensaje || `No se pudo guardar la materia. Estado HTTP: ${respuesta.status}`)
            }
            setFormulario(FORMULARIO_VACIO)
            onMateriaGuardada(editando ? "Materia modificada correctamente" : "Materia registrada correctamente")
        } catch (error) {
            console.error("Error al guardar:", error)
            // fetch lanza TypeError cuando no puede conectarse con el servidor.
            setError(error instanceof TypeError
                ? "No se pudo conectar con el servidor"
                : error.message)
        } finally {
            setGuardando(false)
        }
    }
    // Vista del formulario. Los inputs son controlados: value sale del estado y onChange lo actualiza.
    return(
        <Paper
            component="section"
            variant="outlined"
            sx={{
                p: { xs: 2.5, sm: 3 },
                mb: 3,
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
                {materiaEditar ? "Editar Materia" : "Crear Materia"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                Completá los datos para gestionar la materia.
            </Typography>
            <Box
                component="form"
                onSubmit={guardar}
                // Desactiva los mensajes del navegador para usar los de validar.
                noValidate
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
                    "& .form-field-completo": {
                        gridColumn: { sm: "1 / -1" },
                    },
                    "& label": {
                        color: "text.secondary",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                    },
                    "& input, & select, & textarea": {
                        width: "100%",
                        minWidth: 0,
                        px: 1.5,
                        py: 1.25,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1.5,
                        bgcolor: "background.default",
                        color: "text.primary",
                        font: "inherit",
                        outline: "none",
                        transition: "border-color 150ms ease, box-shadow 150ms ease",
                        "&:focus": {
                            borderColor: "primary.main",
                            boxShadow: (theme) =>
                                `0 0 0 3px ${theme.palette.primary.main}26`,
                        },
                    },
                    "& textarea": {
                        resize: "vertical",
                    },
                }}
            >
                <Box className="form-fields">
                    <Box className="form-field">
                        <label htmlFor="codigo">Código</label>
                        <input
                            id="codigo"
                            name="codigo"
                            value={formulario.codigo}
                            onChange={manejarCambio}
                            placeholder="Ej: PRG4"
                            maxLength={10}
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
                            maxLength={100}
                            required
                        />
                    </Box>
                    <Box className="form-field">
                        <label htmlFor="cargaHoraria">Carga horaria</label>
                        <input
                            id="cargaHoraria"
                            name="cargaHoraria"
                            type="number"
                            min="1"
                            step="1"
                            value={formulario.cargaHoraria}
                            onChange={manejarCambio}
                            required
                        />
                    </Box>
                    <Box className="form-field">
                        <label htmlFor="estado">Estado</label>
                        {/* La lista desplegable impide escribir un estado no permitido. */}
                        <select
                            id="estado"
                            name="estado"
                            value={formulario.estado}
                            onChange={manejarCambio}
                            required
                        >
                            <option value="activa">Activa</option>
                            <option value="inactiva">Inactiva</option>
                        </select>
                    </Box>
                    <Box className="form-field form-field-completo">
                        <label htmlFor="descripcion">Descripción (opcional)</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            rows={3}
                            value={formulario.descripcion}
                            onChange={manejarCambio}
                            maxLength={500}
                        />
                    </Box>
                </Box>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    sx={{ pt: 0.5 }}
                >
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {guardando ? "Guardando..." : (materiaEditar ? "Guardar Cambios" : "Guardar")}
                    </Button>
                    {materiaEditar && (
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
export default FormularioMateria
