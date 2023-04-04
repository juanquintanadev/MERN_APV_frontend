// importamos los hooks de react para los state y para cuando carga el dom y tenemos que mandar a llamar una api
import { useState, useEffect } from "react";

// importamos useParams para obtener de la url el token que nos estamos enviando por email
import { useParams } from "react-router-dom";

// importamos el alerta para mostrar los diferentes mensajes
import Alerta from "../components/Alerta";

// importamos el cliente axios para consultar la url de tipo get por defecto no lleva el .get
import clienteAxios from "../config/axios";

import { Link } from "react-router-dom";


const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  // creamos un state nuevo para mostrar el formulario de carga del nuevo password
  const [tokenValido, setTokenValido] = useState(false);

  // creamos el state para cuando se modifique el password muestre el link de iniciar sesion
  const [passwordModificado, setPasswordModificado] = useState(false);

  // iniciamos la variable con los params de la url
  const params = useParams();

  // console.log(params.token);

  // extraemos el token para mandarlo con la url de axios
  const {token} = params;

  useEffect(() => { 
    
    // declaramos la funcion y mandamos a llamar todo dentro del useEffect para evitar problemas errors y acceder al async para la consulta al servidor
    const comprobarToken = async () => {

      // trycatch siempre que consultemos el servidor
      try {
        // comenzamos la consulta al servidor
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        
        // en caso de que el await confirme el token entonces mostramos el mensaje de que se puede escribir el nuevo password
        setAlerta({
          msg: 'Puede escribir el nuevo password',
          error: false,
        });

        setTokenValido(true);
      } catch (error) {
        setAlerta({
          // ponemos este mensaje porque hablar de token es complejo, lo resumimos en este mensaje
          msg: 'Hubo un problema con el enlace',
          error: true,
        });
      };
    };
    comprobarToken();
  }, []); // corchetes para que se ejecute solo una vez

  // como es un formulario hay que sacarle el comportamiento por defecto
  const handleSubmit = async e => {
    e.preventDefault();

    // si el password esta vacio o tiene menos de 6 caracteres mostramos alerta
    if(password.length < 6) {
      setAlerta({
        msg: 'El password debe tener minimo 6 caracteres',
        error: true,
      });
      return;
    };

    // ahora si try requerimos la url completa con el token para poder mandar el nuevo password en forma de objeto porque es un json 
    try {

      // enviamos la peticion tipo post de axios al servidor con el password nuevo
      // en el modelo ya lo almacenamos hasheado
      const {data} = await clienteAxios.post(`/veterinarios/olvide-password/${token}`, {password}); // siempre pasar objeto ya que son siempre json!!!!!!

      // console.log(data);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      // pasamos a true el password modificado para mostrar el inicio de sesion
      setPasswordModificado(true);
      setTokenValido(false);
    } catch (error) {
      setAlerta({
        msg: error.response.date.msg,
        error: true,
      });
    };

  };

  const {msg} = alerta;
  return (
    <>
        <div>
            <h1 className="text-indigo-600 text-4xl font-black">Reestablece tu password y no pierdas acceso a tus {""} <span className="text-black">Pacientes</span></h1>
        </div>
        <div className="bg-white shadow-lg mt-20 md:mt-10 px-5 py-10 rounded-xl">
          {msg && 
            <Alerta 
              alerta={alerta}
            />
          }
          {tokenValido &&
            (
              <form onSubmit={handleSubmit}>
                <div className="my-5">
                  <label className="uppercase text-xl font-bold text-gray-500 block" htmlFor="">
                      Nuevo Password
                  </label>
                  <input 
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                      placeholder="Tu password" 
                      type="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <input className="font-bold text-white bg-indigo-700 text-center w-full p-3 rounded-xl hover:bg-indigo-900 hover:cursor-pointer md:w-auto px-10" type="submit" value="Reestablecer"/>
              </form>
            )
          }
          {passwordModificado &&
            <Link className="block text-center my-5 text-gray-500" to="/">Inica sesión!!</Link>
          }
        </div>
    </>
  )
};

export default NuevoPassword;