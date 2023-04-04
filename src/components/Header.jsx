// importamos link para colocar los enlaces
import { Link } from "react-router-dom";

// importamos nuestro hook para poder utilizar las funciones del context
import useAuth from "../hooks/useAuth";

const Header = () => {

    const {cerrarSesion} = useAuth();

    return (
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de pacientes de {''} <span className="text-white font-black">Veterinaria</span></h1>
                <nav className="flex flex-col lg:flex-row gap-2 mt-10 lg:mt-0 items-center">
                    <Link to='/admin' className="text-sm font-bold uppercase text-white">Pacientes</Link>
                    <Link to='/admin/perfil' className="text-sm font-bold uppercase text-white">Perfil</Link>
                    <button 
                        className="text-sm font-bold uppercase text-white" type="button"
                        onClick={cerrarSesion}
                    >Cerrar Sesion</button>
                </nav>
            </div>
            
        </header>
    )
}

export default Header;