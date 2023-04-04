// importamos los states para el login
import {useState, useEffect} from 'react';

// importamos el componente cliente de axios
import clienteAxios from '../config/axios';

// importamos link que es para los enlaces
import { Link, useNavigate } from "react-router-dom";

// importamos nuestro custom hook para poder utilizar los datos del context de auth
import useAuth from "../hooks/useAuth";

// importamos setAlerta para los mensaje
import Alerta from '../components/Alerta';

const Login = () => {

    // podemos realizar destructuring al context y poder acceder al value que nosotros permitimos el acceso global
    // const {auth} = useAuth();
    // console.log(auth);

    // iniciamos los states que va a completar el usuario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // iniciamos el navigate para redireccionar al ususario
    const navigate = useNavigate();

    // iniciamos para los mensajes de alerta
    const [alerta, setAlerta] = useState({});

    // extraemos setAuth para colocarle al auth toda la info que nos traemos del backend y asi poder iniciar sesion correctamente
    const {setAuth} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // comprobacion para ver si alguno de los dos campos esta vacio
        if([email, password].includes('')) {
            setAlerta({
                msg: 'Ambos campos son obligatorios',
                error: true,
            });
            return;
        };

        // reiniciamos el msg para que no muestre alerta si pasa la validacion
        setAlerta({});

        // try para la comunicacion y posibles errores de login
        try {
            console.log('antes de la consulta');
            // esta peticion nos devuelve data, este va acontener la devolucion de nuestro servidor con un JWT que utilizaremos en diferentes lugares de nuestra api
            const {data} = await clienteAxios.post('/veterinarios/login', {email, password});
            console.log('despues de la consulta');

            // vamos a almacenar el resutaldo JWT en el localStorage
            localStorage.setItem('token', data.token);

            // cargamos el auth con la informacion necesaria para que no nos mande al login
            setAuth(data);

            // y una vez almacenados los datos tenemos que redirigir al usuario a la pagina del perfil admin
            navigate('/admin');
        } catch (error) {
            // en el backend ya tenemos mensajes para este tipo de errores
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        };
        
    };

    const {msg} = alerta;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 text-4xl font-black">Inicia Sesión y Administra tus {""} <span className="text-black">Pacientes</span></h1>
            </div>
            <div className="bg-white shadow-lg mt-20 md:mt-10 px-5 py-10 rounded-xl">
                
                {msg &&
                    <Alerta 
                    alerta={alerta}
                    />
                }
                
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-xl font-bold text-gray-500 block" htmlFor="">
                            Email
                        </label>
                        <input value={email} onChange={e => setEmail(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Email de registro" type="email" />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-xl font-bold text-gray-500 block" htmlFor="">
                            Password
                        </label>
                        <input value={password} onChange={e => setPassword(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Tu Password" type="password" />
                    </div>
                    <input className="font-bold text-white bg-indigo-700 text-center w-full p-3 rounded-xl hover:bg-indigo-900 hover:cursor-pointer md:w-auto px-10" type="submit" value="Iniciar Sesión"/>
                </form>
                <nav className="mt-5 md:flex md:justify-between">
                    <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Regístrate aca!!</Link>
                    <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi Password</Link>
                </nav>
            </div>
        </>
    )
}

export default Login