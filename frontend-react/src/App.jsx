import Titulo from './components/Titulo'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import TarjetaAlumno from './components/TarjetaAlumno'

function App() {
  return (
    <>
      <Navbar />
      <main id="inicio">
        <Titulo texto="Sistema de Gestión Académica" color="magenta" />
        <section id="alumnos" aria-labelledby="titulo-alumnos">
          <h2 id="titulo-alumnos">Administración de Alumnos</h2>
          <TarjetaAlumno
            nombre="Ana López"
            carrera="Programación"
            edad="20"
          />
          <TarjetaAlumno
            nombre="Juan Pérez"
            carrera="Tecnicatura en sistemas"
            edad="23"
          />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App;