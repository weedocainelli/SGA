import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

// Formulario de inicio de sesión: envía las credenciales al backend y muestra el resultado.
export default function Login() {
    const navigate = useNavigate()
    const { setToken } = useAuth()

    // usuario guarda los datos que devuelve el backend; null significa que no inició sesión.
    const [usuario, setUsuario] = useState(null)
    const [error, setError] = useState("")
    const [cargando, setCargando] = useState(false)
    const [mensaje, setMensaje] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function login(e) {
        // Evita que el formulario recargue la página.
        e.preventDefault()
        setError("")
        setCargando(true)
        setUsuario(null)
        setMensaje("")

        try {
            const respuesta = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })
            const datos = await respuesta.json()
            if (!respuesta.ok) {
                throw new Error(datos.mensaje || "No se pudo iniciar sesión")
            }
            // El backend envía nombre, email y rol directamente en la respuesta.
            localStorage.setItem("token", datos.token) // Guardar el token en localStorage
            // Avisa al contexto que hay sesión; sin esto RutaProtegida volvería a mandar al login.
            setToken(datos.token)

            setUsuario(datos)
            setMensaje(datos.mensaje)

            setEmail("")
            setPassword("")

            navigate("/")
        } catch (error) {
            console.error("Error en login: ", error)
            setError(error.message || "No se pudo conectar con el servidor.")
        } finally {
            setCargando(false)
        }
    }

    return (
        <Box
            component="main"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                bgcolor: "background.default",
            }}
        >
            <Box
                component="form"
                onSubmit={login}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 4,
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: 1,
                    borderColor: "divider",
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" component="h1" sx={{ mb: 3, textAlign: "center", color: "text.primary", fontWeight: 700 }}>
                    Iniciar sesión
                </Typography>
                <TextField
                    label="Correo electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    fullWidth
                    margin="normal"
                />
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
                {mensaje && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {mensaje}
                    </Alert>
                )}
                {/* Se deshabilita mientras espera la respuesta para evitar envíos repetidos. */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={cargando}
                    sx={{ mt: 3, py: 1.5, fontWeight: 700 }}
                >
                    {cargando ? "Ingresando..." : "Ingresar"}
                </Button>
                {usuario && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1">
                            Bienvenido/a, {usuario.nombre}
                        </Typography>
                        <Typography variant="body2">
                            Correo: {usuario.email}
                        </Typography>
                        <Typography variant="body2">
                            Rol: {usuario.rol}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
