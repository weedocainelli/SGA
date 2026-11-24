import { ListaMaterias } from "../components/ListaMaterias"
import { useState } from "react"
import Alert from "@mui/material/Alert"
import FormularioMateria from "../components/FormularioMateria"

// Coordina el formulario y el listado, que se comunican a través de la página con props.
export default function Materias() {
// Contador: cuando sube, el listado vuelve a pedir los datos.
const [actualizar, setActualizar] = useState(0)
// Materia que se está editando; null significa modo alta.
const [materiaEditar, setMateriaEditar] = useState(null)
// Aviso de éxito. Está acá porque el formulario se vuelve a crear al editar y lo perdería.
const [mensaje, setMensaje] = useState("")

function materiaGuardada(texto) {
  setActualizar(valor => valor + 1)
  setMateriaEditar(null)
  setMensaje(texto)
}

// La edición solo se cierra si se eliminó la materia que se estaba editando.
function materiaEliminada(codigo, texto) {
  setActualizar(valor => valor + 1)
  setMateriaEditar(actual => actual?.codigo === codigo ? null : actual)
  setMensaje(texto)
}

function seleccionarMateria(materia) {
  setMensaje("")
  setMateriaEditar(materia)
}

function cancelarEdicion() {
  setMensaje("")
  setMateriaEditar(null)
}

return (
   <>
   {mensaje && (
    <Alert severity="success" onClose={() => setMensaje("")} sx={{ mb: 2 }}>
      {mensaje}
    </Alert>
   )}
   {/* Al cambiar la key, React crea el formulario de nuevo con los datos de la materia elegida. */}
   <FormularioMateria key={materiaEditar?.codigo ?? "nuevo"}
   onMateriaGuardada={materiaGuardada}
   materiaEditar={materiaEditar}
   onCancelar={cancelarEdicion}
   />
   <ListaMaterias
   actualizar={actualizar}
   onMateriaEliminada={materiaEliminada}
   onEditarMateria={seleccionarMateria}
   />
  </>
  )
}
