import { useEffect, useState } from "react";

function Pantalla(){
    // El estado guarda el ancho actual para que React lo pueda mostrar.
    const [ancho, setAncho] = useState(window.innerWidth)
    
    useEffect(() => {
        // Se registra un evento del navegador para reaccionar al cambio de tamaño.
        const actualizarAncho = () => {
            setAncho(window.innerWidth)
        }
        window.addEventListener("resize", actualizarAncho)

        // La función de limpieza quita el evento cuando el componente se desmonta.
        return () => {
            window.removeEventListener("resize", actualizarAncho)
        }
    // El array vacío indica que este efecto se configura una vez al montar.
    }, [])
    return (
        <h2>Ancho: {ancho} px</h2>
    )
}

export default Pantalla