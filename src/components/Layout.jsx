import {Outlet,Link,useLocation} from "react-router-dom"
//Link: Esto sive para que la navegación sea más rapida a la hora de presionar el enlace

function Layout() {
  const location = useLocation()
  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-SunnyMorning px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">Control de clientes</h2>
        <nav className="mt-10">
          <Link className= {`${location.pathname ===  "/" ? "text-orange-600" : "text-white" } text-2xl block font-bold mt-2 hover:text-orange-600 `}  
          to="/">Inicio</Link> 
          <Link className= {`${location.pathname ===  "/cliente/nuevo" ? "text-orange-600" : "text-white" } text-2xl block font-bold mt-2 hover:text-orange-600 `}
          to="/cliente/nuevo">Nuevo Cliente</Link>
        </nav>
      </div>

      <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet/>
      </main>
    </div>
  )
}

export default Layout
