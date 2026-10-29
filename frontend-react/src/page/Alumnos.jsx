import { ListaAlumnos } from "../components/ListaAlumnos"
import { useState } from "react"
import FormularioA from "../components/FormularioA"

export default function Alumnos() {
// actualizar es una señal numérica para recargar; alumnoEditar guarda el objeto elegido.
const [actualizar, setActualizar] = useState(0)
const [alumnoEditar, setAlumnoEditar] = useState(null)

function alumnoCreado() {
  // La función funcional recibe el valor previo y evita calcular el siguiente estado a mano.
  setActualizar(valor => valor + 1)
  // null significa que ya no hay ningún alumno seleccionado para edición.
  setAlumnoEditar(null)
}

function seleccionarAlumno(alumno) {
  // Recibe el objeto completo desde la fila y lo convierte en el alumno activo.
  setAlumnoEditar(alumno)
}

return (
   <>
   {/* key cambia al seleccionar otro legajo; React remonta el formulario y reinicia sus useState. */}
   {/* La página pasa al formulario los datos seleccionados y las funciones para comunicarse. */}
   <FormularioA key={alumnoEditar?.legajo ?? "nuevo"}
   onAlumnoCreado={alumnoCreado}
   alumnoEditar={alumnoEditar}
   onCancelar={() => setAlumnoEditar(null)}
   />
   {/* actualizar dispara el useEffect del listado cuando cambia el número. */}
   <ListaAlumnos 
   actualizar={actualizar} 
   onAlumnoCreado={alumnoCreado}
   onEditarAlumno={seleccionarAlumno} 
   /> 
  </>
  )
}