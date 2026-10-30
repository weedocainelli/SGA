import { ListaMaterias } from "../components/ListaMaterias"
import { useState } from "react"
import Alert from "@mui/material/Alert"
import FormularioMateria from "../components/FormularioMateria"

export default function Materias() {
const [actualizar, setActualizar] = useState(0)
const [materiaEditar, setMateriaEditar] = useState(null)
const [mensaje, setMensaje] = useState("")

function materiaGuardada(texto) {
  setActualizar(valor => valor + 1)
  setMateriaEditar(null)
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
   <FormularioMateria key={materiaEditar?.codigo ?? "nuevo"}
   onMateriaGuardada={materiaGuardada}
   materiaEditar={materiaEditar}
   onCancelar={cancelarEdicion}
   />
   <ListaMaterias
   actualizar={actualizar}
   onMateriaEliminada={materiaGuardada}
   onEditarMateria={seleccionarMateria}
   />
  </>
  )
}
