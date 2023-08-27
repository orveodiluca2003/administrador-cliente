import { useLoaderData } from "react-router-dom";
import Cliente from "../components/Cliente";
import { obtenerClientes } from "../api/Clientes";

export function loader() {
  const clientes = obtenerClientes()
  return clientes
}

//Error Boundries: son componentes de react que obtiene el error en cualquier lugar del componente.

function Inicio() {
  const cliente = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-SunnyMorning">Inicio</h1>
      <p className="mt-3">Administra tus clientes</p>
      {cliente.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto ">
          <thead className="bg-SunnyMorning font-semibold">
              <tr>
                <th className="p-2">
                  Cliente
                </th>
                <th className="p-2">
                  Contacto
                </th>
                <th className="p-2">
                  Acciones
                </th>
              </tr>
            </thead>
              <tbody>
                {cliente.map(client => (
                  <Cliente
                    key={client.id}
                    client = {client}
                  />
                ))}
              </tbody>
          
        </table>
      ) : (
        <p className= "text-center mt-10">No hay clientes aún </p>
      )}
    </>
  );
}

export default Inicio;
