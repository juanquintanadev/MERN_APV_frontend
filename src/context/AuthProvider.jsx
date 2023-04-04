// importamos useState donde va a vivir el state global de la aplicacion
// utilizaremos el context para crear el estado global de la app y nos va a permitir acceder al state de diferentes lugares de esta aplicacion
import { useState, useEffect, createContext, Children } from "react";

// importamos la conexion de axios para entrar en el perfil y obtener los datos de sesion
import clienteAxios from "../config/axios";

// asignamos todas las funciones del Context, hacemos referencia a como se va a llamar el context de este provider
const AuthContext = createContext();

// esta es una funcion que es muy similar a un componente donde vamos a colocar el context
// en react podemos extraer el prop children que es el que le vamos a indicar al provider que dentro de el van a estar los hijos
const AuthProvider = ({children}) => {
    // aca vamos a definir los state que van a estar disponibles globalmente
    // la autenticacion va a ser un objeto en este caso lo iniciamos vacio
    const [auth, setAuth] = useState({});
    
    // creamos un state para cuando finalize la carga de datos esta nos muestre la pagina correctamente
    // sino por la demora de la consulta en un momento nos redirecciona al login
    const [cargando, setCargando] = useState(true);

    // utilizamos un useEffect para que cuando cargue la app revise si el usuario esta autenticado o no
    useEffect(() => {

        // creamos una funcion que mandamos a llamar en el useEffect para poder acceder al async
        const autenticarUsuario = async () => {

            // extraemos el token del localStorage
            const token = localStorage.getItem('token');
            // console.log(token);

            // si no tenemos un token porque no existe y no esta loggeado entonces detenemos el codigo
            if(!token) {
                setCargando(false);
                return;
            }
            
            // pasada la validacion podemos pasarle a axios la configuracion que vamos a mandarle con el token para obtener el perfil
            const config = {
                headers: { // configuracion para decirle que estamos enviando json
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // agregamos token como dato bearer por la validacion que tenemos en el backend
                },
            };

            // una vez hecha la configuracion mandamos la peticion 
            try {

                // realizamos la consulta obteniendo toda la informacion que nos devuelve el backend con los datos del veterinario
                const {data} = await clienteAxios('/veterinarios/perfil', config);
                // console.log(data);

                // lo ultimo que hay que hacer es colocarlo en el state toda la informacion para poder acceder a las paginas requeridas
                setAuth(data);

                

            } catch (error) {
                console.log(error.response.data.msg);
                // en caso de que tengamos error dejamos vacio el auth
                setAuth({});
            };

            // para evitar que nos redireccione antes de tiempo hasta que comprueba la autenticacion del usuario
            setCargando(false);
        };
        autenticarUsuario();

    }, []); // arreglo vacio sin dependencias para que se ejecute solo una vez

    // creamos la funcion para cerrar la sesion con el boton en el header.
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    };

    // funcion para actualizar el perfil del veterinario
    const actualizarPerfil = async datos => {

        // extraemos el token del localStorage
        const token = localStorage.getItem('token');
        // pasada la validacion podemos pasarle a axios la configuracion que vamos a mandarle con el token para obtener el perfil

        const config = {
            headers: { // configuracion para decirle que estamos enviando json
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // agregamos token como dato bearer por la validacion que tenemos en el backend
            },
        };
        try {
            // confeccionamos la url del router de veterinarios para la consulta
            const url = `/veterinarios/perfil/${datos._id}`;
            // console.log(url);
            const {data} = await clienteAxios.put(url, datos, config);

            // en el caso de que se guarde correctamente entonces mandamos respuesta de guardado correctamente
            return {
                msg: 'Almacenado Correctamente',
                error: false,
            };
        } catch (error) {
            
            // en el caso de que tengamos algun error entonces vamos a retornar el msj
            return {
                msg: error.response.msg,
                error: true,
            };
        };
    };

    const guardarPassword = async (datos) => {
        // extraemos el token del localStorage
        const token = localStorage.getItem('token');
        // pasada la validacion podemos pasarle a axios la configuracion que vamos a mandarle con el token para obtener el perfil

        const config = {
            headers: { // configuracion para decirle que estamos enviando json
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // agregamos token como dato bearer por la validacion que tenemos en el backend
            },
        };

        try {
            // definimos la url que no tiene id
            const url = '/veterinarios/actualizar-password';

            // realizamos la consulta a axios
            const {data} = await clienteAxios.put(url, datos, config);

            // console.log(data);

            return {
                msg: data.msg,
                error: false,
            };
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
            };
        };
    };

    // otra manera de obtener el children que es una propiedad de react es la siguiente
    // props vendria a ser el parametro de la funcion y la obtenemos (props) y no ({children})
    // const {children} = props;

    // aca viene como la parte del componente
    // de esta manera le decimos al provider que los hijos van a tener el acceso global a los states
    // el children quiere decir todos los componentes que estan dentro del AuthProvider en App.jsx
    // le pasamos los values al provider para que podamos acceder con el useAuth como parametros
    // definimos en value que valores, funciones, etc vamos a poner a disposicion en los componentes que queremos
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export {
    AuthProvider,
};

export default AuthContext;