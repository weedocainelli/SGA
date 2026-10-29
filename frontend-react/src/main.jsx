import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import tema from './tema.js'

// Busca en index.html el div id="root" y crea ahí el punto de montaje de React.
createRoot(document.getElementById('root')).render(
  // StrictMode revisa posibles problemas en desarrollo; no agrega elementos visuales.
  <StrictMode>
    {/* El proveedor comparte el tema de Material UI con todos los componentes descendientes. */}
    <ThemeProvider theme={tema} defaultMode="system">
      {/* CssBaseline aplica una base de estilos consistente entre navegadores. */}
      <CssBaseline />
      {/* BrowserRouter habilita las rutas sin recargar la página completa. */}
      <BrowserRouter>
        {/* App contiene el layout y las páginas que se eligen según la URL. */}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
