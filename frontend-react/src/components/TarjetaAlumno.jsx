function TarjetaAlumno({ nombre, carrera, edad }) {
    return (
        <article>
            <h3>{nombre}</h3>
            <p>{carrera}</p>
            <p>Edad: {edad}</p>
        </article>
    )
}

export default TarjetaAlumno