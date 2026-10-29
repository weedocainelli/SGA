import { Box } from "@mui/material"
import { Navigate, Route, Routes, Outlet } from "react-router-dom"
import Header from "./components/Header"
import { Footer } from "./components/Footer"
import Alumnos from "./page/Alumnos"
import Docentes from "./page/Docentes"
import { FAQ } from "./page/FAQ"

// Layout se reutiliza en todas las rutas hijas: el Outlet es el espacio variable.
function Layout() {
  return (
    <>
      <Header />
      {/* Box renderiza un main semántico; sx aplica estilos de Material UI. */}
      <Box component="main" sx={{ width: "min(100% - 2rem, 960px)", mx: "auto", py: 4, flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}

function App() {
  // Routes compara la URL actual con sus Route y muestra la que coincide.
  return (
    <Routes>
      {/* Las rutas internas comparten Layout. */}
      <Route path="/" element={<Layout />}>
        {/* La ruta raíz lleva a la página de alumnos sin agregar otro historial. */}
        <Route index element={<Navigate to="alumnos" replace />} />
        {/* Cada path hija se presenta dentro del Outlet del Layout. */}
        <Route path="alumnos" element={<Alumnos />} />
        <Route path="docentes" element={<Docentes />} />
        <Route path="ayuda" element={<FAQ />} />
        {/* Cualquier dirección desconocida vuelve a la ruta principal. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App