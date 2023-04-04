// Link para poder poner los enlaces en react
import { Link } from "react-router-dom";

// importamos useState para almacenar el campo email que escribe el usuario
import { useState } from "react";   

// importamos la conexion de axios ya configurada
import clienteAxios from "../config/axios";

// importamos el componente de alerta para mostrar los mensajes correspondientes
import Alerta from "../components/Alerta";

const OlvidePassword = () => {

    // declaramos el state del email para ir completandolo en el form
    const [email, setEmail] = useState('');

    // iniciamos el alerta state para guardar los msj
    const [alerta, setAlerta] = useState({});

    // funcion asincrona por el llamado con axios para la consulta al servidor
    const handleSubmit = async e => {
        e.preventDefault();

        // si no hay nada en el campo de email cuando damos en submit entonces mostramos una alerta y terminamos la funcion
        if(email === '' || email.length < 5) {
            setAlerta({msg: 'El email es obligatorio', error: true});
            return;
        };

        // ahora si un try para la conexion con axios
        try {
            // la respuesta que nos da axios es con destructuring
            const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email}); // al ser json tenemos que pasarlo como objeto, seria email: email
            // console.log(data);

            // cargamos el alerta con el mensaje 
            setAlerta({
                msg: data.msg,
                error: false,
            });
        } catch (error) {
            // mostramos el alerta de error en caso de que caiga en el catch
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    // extraemos el elemento msg del objeto de alerta para comprobar si hay mensaje y mostrarlo en le dom
    const {msg} = alerta;

    return (
      <>
        <div>
            <h1 className="text-indigo-600 text-4xl font-black">Olvidaste tu Password, recupera tu cuenta y no pierdas {""} <span  className="text-black">tus Pacientes</span></h1>
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
                    <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Tu email" type="email" value={email} onChange={e=> setEmail(e.target.value)}/>
                </div>
                <input className="font-bold text-white bg-indigo-700 text-center w-full p-3 rounded-xl hover:bg-indigo-900 hover:cursor-pointer md:w-auto px-10" type="submit" value="Reestablecer Password"/>
            </form>
            <nav className="mt-5 md:flex md:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/">¿Tienes una cuenta? Inica sesión!!</Link>
                <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Regístrate aca!!</Link>
            </nav>
        </div>
      </>
    )
  }
  
  export default OlvidePassword;