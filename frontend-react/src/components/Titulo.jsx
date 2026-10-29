function Titulo({texto, color}){
    // Las props personalizan el contenido y el color del título.
    return (
        <h1 style={{color}}>{texto}</h1>
    )
}

export default Titulo