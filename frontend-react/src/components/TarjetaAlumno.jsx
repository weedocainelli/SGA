function TarjetaAlumno({ nombre, carrera, edad }){
    // nombre, carrera y edad son props recibidas desde el componente padre.
    return (
        <article>
            <h2>{nombre}</h2>
            <p>{carrera}</p>
            <p>Edad: {edad}</p>
        </article>
    )
}
export default TarjetaAlumno