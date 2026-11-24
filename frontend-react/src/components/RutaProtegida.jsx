import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/useAuth"

// Muestra las rutas hijas solo si hay sesión; si no, redirige al login.
const RutaProtegida = () => {
    const { token, cargando } = useAuth()

    // Mientras AuthProvider verifica el token guardado, todavía no se sabe si hay sesión.
    if (cargando) {
        return <p>Verificando sesión...</p>
    }

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default RutaProtegida
