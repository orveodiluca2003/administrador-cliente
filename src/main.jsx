import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import Layout from './components/Layout'
import NuevoCliente,{action as nuevoClienteAction} from './pages/NuevoCliente'
import Inicio, {loader as InicioLoader} from './pages/Inicio'
import EditarCliente, {loader as EditarClienteLoader, action as EditarClienteAction} from './pages/EditarCliente'
import ErrorPages from './components/ErrorPages'
import {action as eliminarClienteAction} from "./components/Cliente"

const router = createBrowserRouter([ //esto es para colocar todos los links de las páginas creadas osea es una funcion que crea tutas por medio de objetos. 
  {
    path:"/",
    element: <Layout/>, 
    //esto lo que hace es heredar los estilos y la informaación de la primera página se realiza con un outlet en el componente.
    children : [ 
      {
        index:true, 
        element: <Inicio/>,//sirve para nada más colocar información al primer componente.
        loader: InicioLoader,
        errorElement: <ErrorPages/>
      },
      {
        path:"/cliente/nuevo",
        element: <NuevoCliente/>,
        action: nuevoClienteAction,
        errorElement: <ErrorPages/>
      },
      {
        path: "/cliente/:clienteId/editar",
        element: <EditarCliente/>,
        loader: EditarClienteLoader,
        errorElement: <ErrorPages/>,
        action: EditarClienteAction
      },
      {
        path: "/cliente/:clienteId/eliminar",
        action: eliminarClienteAction
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
