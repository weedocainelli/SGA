import { useState } from "react";

function Mensaje(){
    // El texto inicial se conserva como estado del componente.
    const [mensaje, setMensaje] = useState("Hola, alumno")

    function cambiarMensaje(){
        // El operador ternario elige el mensaje opuesto al que está visible.
        setMensaje(mensaje === "Hola, alumno"
            ? "Bienvenidos a Programación IV"
            : "Hola, alumno"
        )
    }

    return (
        <>
        <h2>{mensaje}</h2>
        <button onClick={cambiarMensaje}>Cambiar Mensaje</button>
        </>
    )
}
export default Mensaje