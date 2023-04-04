// hook para que cargue el contenido a la pagina principal
// importamos el navigation para envial al usuario al inicio si no esta autenticado
import { Outlet, Navigate } from "react-router-dom";

// importamos los componentes header y footer
import Header from "../components/Header";
import Footer from "../components/Footer";


// importamos nuestro hook para acceder a los states globales
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {

    // extraemos del useAuth el auth para ver que contenga algo y poder mostrar informacion, 
    // en caso de que no este el auth con informacion reedireccionamos a la pagina de login

    const {auth, cargando} = useAuth();

    // console.log(auth);
    // console.log(cargando);

    // si cargando esta como true entonces no obtuvimos el objeto completo de auth
    // cuando pasa a false pasa esta condicion y no entra en el return
    if(cargando) return 'cargando';

    // aca abajo una vez que tengamos el auth lleno o vacio, muestra o redirecciona segun sea el caso
    return (
    <>
        <Header/>
        {auth?._id ? (
            <main className="container mx-auto mt-10">
                <Outlet/>
            </main>
            ): <Navigate to='/'/>
        }
        <Footer/>
    </>
    )
}

export default RutaProtegida;