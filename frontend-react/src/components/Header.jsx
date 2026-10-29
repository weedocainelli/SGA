import { Link } from "react-router-dom";

export default function Header() {
    // Fragment agrupa header y nav sin crear un div adicional en el HTML.
    return (
        <>
        {/* Header se muestra en todas las rutas porque forma parte de Layout en App.jsx. */}
        <header>
            <h2>SGA</h2>
        </header>
        <nav>
        {/* Link cambia de ruta con React Router sin recargar el documento HTML. */}
        {/* El atributo to indica el destino; no es el href de un enlace HTML normal. */}
        <Link to="/">Inicio</Link>
        {/* Las llaves permiten insertar texto de JavaScript entre elementos JSX. */}
        {" | "}
        <Link to="/alumnos">Alumnos</Link>
        {" | "}
        <Link to="/docentes">Docentes</Link>
        {" | "}
        {/* aria-label da un nombre accesible al enlace que solo muestra un icono. */}
        <Link to="/ayuda" aria-label="Ayuda">
        ❔
        </Link>
        </nav>
        </>
    )
}