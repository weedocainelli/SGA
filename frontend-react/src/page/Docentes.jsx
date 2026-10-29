import { ListaDocentes } from "../components/ListaDocentes"
import { useState } from "react"
import FormularioD from "../components/FormularioD"

export default function Docentes() {
// actualizar es la señal de recarga; docenteEditar guarda el objeto seleccionado.
const [actualizar, setActualizar] = useState(0)
const [docenteEditar, setDocenteEditar] = useState(null)

function docenteCreado() {
  // Incrementar el número cambia la prop del listado y hace que consulte otra vez.
  setActualizar(valor => valor + 1)
  // null quita la selección; el formulario vuelve al modo de alta.
  setDocenteEditar(null)
}

function seleccionarDocente(docente) {
  // Guarda el objeto de la fila; el formulario lo recibe por la prop docenteEditar.
  setDocenteEditar(docente)
}

return (
   <>
   {/* La key usa el DNI: al cambiar, React crea el formulario con el estado inicial correcto. */}
   {/* La página entrega los datos y callbacks que el formulario necesita. */}
   <FormularioD key={docenteEditar?.dni ?? "nuevo"}
   onDocenteCreado={docenteCreado}
   docenteEditar={docenteEditar}
   onCancelar={() => setDocenteEditar(null)}
   />
   {/* El número cambia luego de guardar o borrar, y provoca la nueva consulta GET. */}
   <ListaDocentes 
   actualizar={actualizar} 
   onDocenteCreado={docenteCreado}
   onEditarDocente={seleccionarDocente} 
   /> 
  </>
  )
}