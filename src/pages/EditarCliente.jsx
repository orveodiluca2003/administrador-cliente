import { obtenerCliente,actualizarCliente } from "../api/Clientes";
import { Form, useNavigate, useLoaderData,redirect, useActionData } from "react-router-dom";
import Formulario from "../components/Formulario";
import Errores from "../components/Errores";

export async function loader({ params }) {
  //esto sirve para obtener el id de la persona seleccionada.
  const cliente = await obtenerCliente(params.clienteId); //estoy obtienendo el cliente
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No hay resulatdo",
    });
  }
  return cliente;
}

export async function action({ request, params }) {
  const formData = await request.formData(); //esto lo que me permite visualizar los datos ingresados en un formulario.
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");

  //Validacion de errores.
  const errores = []; //se agrega con un push porque no se está utilizando el usestate.
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios..");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!regex.test(email)) {
    //lo que hace es que si regex no es valido hacer lo siguiente.
    errores.push("El email no es valido.");
  }

  //Retorno de datos si hay errores.
  if (Object.keys(errores).length > 0) {
    return errores;
  }

  await actualizarCliente(params.clienteId,datos);
  return redirect("/");
}

function EditarCliente() {
  const load = useLoaderData(); //me permite cuando carga al cliente obtener su información.
  const navigate = useNavigate();
  const errores = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-SunnyMorning">Editar Cliente</h1>
      <p className="mt-3">Edita al cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-SunnyMorning font-bold px-3 py-1 uppercase"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length && errores.map((error ,i ) => <Errores key={i}>{error}</Errores> )}
        <Form method="post" noValidate>
          <Formulario cliente={load} />

          <input
            type="submit"
            className="mt-5 w-full bg-SunnyMorning p-3 uppercase font-bold text-lg cursor-pointer hover:bg-orange-300"
            value="Editar Cliente."
          />
        </Form>
      </div>
    </>
  );
}

export default EditarCliente;
