//aquí va todo lo que tenga que ver con la api.
//variable de entorno, puede tener un valor y en variable de producción puede tener otro valor diferente
export async function obtenerClientes(){
    const respuesta =  await fetch(import.meta.env.VITE_API_URL) //variable de entorno el env
    const resultado = await respuesta.json()
    return resultado
}

export async function obtenerCliente(id){
    const respuesta =  await fetch(`${import.meta.env.VITE_API_URL}/${id}`) //aquí estoy obteniendo el id de la persona.
    const resultado = await respuesta.json()
    return resultado
}

export async function añadirCliente(datos){
    console.log(datos)
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL,{
            method:"POST", 
            body: JSON.stringify(datos), //esto lo que hace es convertir los datos en json y los agrega con el post.
            headers: {
                "Content-Type" : "application/json"
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}


export async function actualizarCliente(id,datos){
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method:"PUT", 
            body: JSON.stringify(datos), //esto lo que hace es convertir los datos en json y los agrega con el PUT.
            headers: {
                "Content-Type" : "application/json"
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}

export async function eliminarCliente(id){
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method:"DELETE",     
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}