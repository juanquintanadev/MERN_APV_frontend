// aca crearemos un custom hook que retorna el useContext indicandole cual es el context que queremos extraer los datos

// importamos useContext la herramienta para extraer los datos
import { useContext } from "react";

// importamos el context de donde vamos a extraer los datos por eso importamos componente
import AuthContext from "../context/AuthProvider";

// creamos una funcion hook que nos va a permitir extraer los datos del context que creamos de Auth
const useAuth = () => {

    // retornamos la funcion para extraer los datos y le indicamos cuales son los datos a traves de un parametro
    return useContext(AuthContext);
};

export default useAuth;