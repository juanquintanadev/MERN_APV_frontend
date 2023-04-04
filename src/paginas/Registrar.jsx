// vamos a importar el state para poder captar los cambios en cada campo del formulario
// vamos a usar un state por cada campo
import { useState } from "react";

// vamos a importar la libreria de axios para comunicarnos con nuestra api
// aca tambien ya creamos un cliente de axios entonces lo importamos con la baseurl
import clienteAxios from '../config/axios';

import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";

const Registrar = () => {

    // inicializamos los states de los campos en strings vacios
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    // iniciamos el state alerta donde lo enviamos al componente creado para mostrar mensajes
    // el mismo lo inicaimos como un objeto vacio donde vamos a ir guardando los msj y si es error true
    const [alerta, setAlerta] = useState({});

    // aca vamos a colocar la funcion que llama cuando apretamos en el boton del submit del form
    const handleSubmit = async e => {
        e.preventDefault();

        // con este codigo creamos un arreglo con todos los campos que necesitamos y si algun elemento esta vacio entramos al if y nos termina la ejecucion de esta funcion.
        if([nombre, email, password, repetirPassword].includes('')) {

            // si tenemos al menos un campo vacio entonces vamos a mandar este mensaje y el error queda en true que vamos a utilizar para darle el color a los mensajes.
            setAlerta({msg: 'hay campos vacios', error: true});
            return;
        };

        // pasada esta validacion veremos que los passwords sean iguales
        if(password !== repetirPassword) {

            // al ser un objeto al modificar el state le tenemos que pasar un objeto
            setAlerta({msg: 'Los passwords son distintos', error: true});
            return;
        };

        // ahora veremos que el password tenga un minimo de 6 caracteres
        if(password.length < 6) {
            setAlerta({msg: 'Password muy corto, tiene que tener al menos 6 caracteres', error: true});
            return;
        };

        // si pasamos todas las validaciones entonces no hay alerta para mostrar y con esto reiniciamos el msg, por lo tanto va a estar vacio y cuando comprobamos al momento de mostrar la alerta no entra en la condicion y este mismo no se muestra
        setAlerta({});

        // una vez pasadas las validaciones sin mensajes que mostrar vamos a conectarnos con la Api de backend
        // utilizaremos la libreria de axios
        
        // en el caso de que tengamos un error para ver en la consola
        try {
            // creamos la url del backend a donde vamos a registrar el usuario
            // METEMOS variables de entorno segun la configuracion de VITE
            const url = `/veterinarios`;

            // obtenemos una respuesta con axios mandando a la url los datos que tenemos como en Postman hicimmos 
            // en la parte de data podemos pasarle un objeto, el mismo lo creamos al vuelo de la siguiente manera con los campos que requerimos para crear un usuario veterinario
            await clienteAxios.post(url, {nombre, email, password});

            // una vez creado correctamente el usuario mandamos a mostrar una alerta exitosa
            setAlerta({msg: 'Usuario creado correctamente, revisa tu email para confirmar', error: false});
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            })
        };

    };

    const {msg} = alerta;

    return (
      <>
        <div>
            <h1 className="text-indigo-600 text-4xl font-black">Crea una cuenta y administra tus {""} <span className="text-black">Pacientes</span></h1>
        </div>
        <div className="bg-white shadow-lg mt-20 md:mt-10 px-5 py-10 rounded-xl">
            {msg && 
                <Alerta
                    alerta={alerta}
                />
            }
            <form 
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label className="uppercase text-xl font-bold text-gray-500 block" htmlFor="">
                        Nombre
                    </label>
                    <input 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                        placeholder="Tu nombre" 
                        type="text" 
                        value={nombre} 
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-xl font-bold text-gray-500 block" htmlFor="">
                        Email
                    </label>
                    <input 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                        placeholder="Email de registro" 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-xl font-bold text-gray-500 block" htmlFor="">
                        Password
                    </label>
                    <input 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                        placeholder="Tu password" 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-xl font-bold text-gray-500 block" htmlFor="">
                        Repite tu Password
                    </label>
                    <input 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                        placeholder="Repite tu password" 
                        type="password" 
                        value={repetirPassword} 
                        onChange={e => setRepetirPassword(e.target.value)}
                    />
                </div>
                <input className="font-bold text-white bg-indigo-700 text-center w-full p-3 rounded-xl hover:bg-indigo-900 hover:cursor-pointer md:w-auto px-10" type="submit" value="Registrarse"/>
            </form>
            <nav className="mt-5 md:flex md:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/">¿Tienes una cuenta? Inica sesión!!</Link>
                <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi Password</Link>
            </nav>
        </div>
      </>
    )
  }
  
  export default Registrar;