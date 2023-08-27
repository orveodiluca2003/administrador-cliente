import { Form, useNavigate,redirect } from "react-router-dom";
import { eliminarCliente } from "../api/Clientes";

export async function action({params}){
  await eliminarCliente(params.clienteId)
  return redirect("/")
}

function Cliente({ client }) {
  const navigate = useNavigate(); //Navega de forma programada.
  const { nombre, id, telefono, email, empresa } = client;
  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl">{nombre}</p>
        <p className="">{empresa}</p>
      </td>

      <td className="p-6">
        <p className="">
          <span className="uppercase font-bold ">Email: </span>
          {email}
        </p>
        <p className="">
          <span className="uppercase font-bold ">telf: </span>
          {telefono}
        </p>
      </td>

      <td className="p-6 flex gap-3">
        <button
          type="submit"
          className="text-green-600 font-bold hover:text-green-700 text-xs"
          onClick={() => navigate(`/cliente/${id}/editar`)}
        >
          Editar
        </button>

        <Form
          method="post"
          action={`/cliente/${id}/eliminar`}
          onSubmit={(e) => {
            if(!confirm("¿Deseas eliminar a esta persona?")){
              e.preventDefault()
            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 font-bold hover:text-red-700 text-xs"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
}

export default Cliente;
