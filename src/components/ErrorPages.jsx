//Este componente nos muestra el error que está siendo presentado en la página. es llamado Error boundries.
import {useRouteError} from "react-router-dom"

export default function ErrorPages(){
    const error = useRouteError()
    console.log(error.message)
    return(
        <div className="space-y-6">
            <h1 className="text-center text-6xl font-extrabold text-SunnyMorning mt-20">Control de clientes.</h1>
            <p className="text-center">Hubo un error</p>
            <p className="text-center">{error.statusText || error.message}</p>
        </div>
    )
}