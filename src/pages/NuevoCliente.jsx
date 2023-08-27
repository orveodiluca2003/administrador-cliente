import { useNavigate,Form,useActionData,redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Errores from "../components/Errores"
import { añadirCliente } from "../api/Clientes"

//se pone aca igual sea un componente pero se pone en esta carpeta porque es dedicado nada más a una página.
export async function action({request}){ //es donde se envía las acciones de un formulario a una url 
  const formData = await request.formData() //esto lo que me permite visualizar los datos ingresados en un formulario.
  const datos = Object.fromEntries(formData)
  const email = formData.get("email") 
  
  //Validacion de errores. 
  const errores = [] //se agrega con un push porque no se está utilizando el usestate. 
  if(Object.values(datos).includes("")){
    errores.push("Todos los campos son obligatorios..")
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")

  if(!regex.test(email)){ //lo que hace es que si regex no es valido hacer lo siguiente.
    errores.push("El email no es valido.")
  }

  //Retorno de datos si hay errores. 
  if(Object.keys(errores).length > 0){
    return errores
  }

  await añadirCliente(datos)
  return redirect("/")
}

function NuevoCliente() {
  const navigate = useNavigate()//permite regresar con los botones.
  const errores = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-SunnyMorning">Nuevo Cliente</h1>
      <p className="mt-3">Añade un nuevo cliente</p>

      <div className="flex justify-end">
        <button className="bg-SunnyMorning font-bold px-3 py-1 uppercase" onClick={() => navigate("/")}>
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length && errores.map((error ,i ) => <Errores key={i}>{error}</Errores> )} 
        <Form
          method="post"
          noValidate
        >
          <Formulario/>

          <input
            type="submit"
            className="mt-5 w-full bg-SunnyMorning p-3 uppercase font-bold text-lg cursor-pointer hover:bg-orange-300"
            value="Añadir Cliente."
          />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente