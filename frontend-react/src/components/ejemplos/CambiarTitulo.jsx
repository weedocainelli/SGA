import { useState } from "react";

function CambiarTitulo() {
    // titulo empieza en "Inicio" y cambia cuando se pulsa un botón.
    const [titulo, setTitulo] = useState("Inicio")

    return (
        <>
        <h2>{titulo}</h2>
        <div style={{display: "flex", justifyContent: "center", gap: "15px" }}>
            {/* Cada evento actualiza el estado y React refleja el nuevo título. */}
            <button onClick={() => setTitulo("Alumnos")} style={{
                fontSize: "20px",
                color: "lightgreen",
                padding: "5px"
            }}>
                Alumnos
            </button>
            <button onClick={() => setTitulo("Docentes")} style={{
                fontSize: "20px",
                color: "lightgreen",
                padding: "5px"
            }}>
                Docentes
            </button>
        </div>
        </>
    )
}
export default CambiarTitulo