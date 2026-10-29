import { useState } from "react"

function Incrementar(){
    // contador y mostrar son estados separados porque controlan cosas distintas.
    const [contador, setContador] = useState(0)
    const [mostrar, setMostrar] = useState(false)

    function incremento() {
        // Actualizar el estado vuelve a dibujar el número en pantalla.
        setContador(contador + 1)
    }
    function decremento() {
        // La condición evita que el contador baje de cero.
        if (contador > 0)
        setContador(contador - 1)
    }

    return (
        <>
        <h1>Contador: {contador}</h1>
        <div style={{display: "flex", justifyContent: "center", gap: 10}}>
        <button onClick={incremento} style={{
            width: "50px",
            height: "40px",
            fontSize: "20px"
        }}>+</button>
        <button onClick={decremento} style={{
            width: "50px",
            height: "40px",
            fontSize: "20px"
        }}>-</button>
        </div>
        <br />
        <button onClick={() => setMostrar(!mostrar)}>
            Mostar / Ocultar
        </button>
        {/* El texto existe en pantalla solo cuando mostrar vale true. */}
        {mostrar && <p>Información visible</p>}
        </>
    )
}
export default Incrementar