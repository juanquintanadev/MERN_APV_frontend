
// importamos el paquete para poder utilizar los params que enviamos en la url desde confirmar
// importamos link para colocar un link como en los otros componentes
import {useParams, Link} from 'react-router-dom';

// importamos axios para realizar la consulta al servidor y confirmar la cuenta
// en este caso ya creamos una baseurl en un archivo de config
import clienteAxios from '../config/axios';

// importamos el hook de useEffect para realizar una accion una vez que se cargo el dom 
// seria un re render,
import { useEffect, useState } from 'react';

// importamos el alerta para mostrarlo segun tengamos las condiciones
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {

  // creamos los state para poder mostrar los alertas y si confirmamos la cuenta

  // alerta inica como un objeto vacio y dependiendo el resultado del trycatch vamos a llamarlo con distintos valores
  const [alerta, setAlerta] = useState({});

  // utilizamos este state para mostrar el alerta que queremos
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  // utilizamos cargando porque cuando estemos consultando a la bd este state va a permanecer true pero cuando termina de cargar pasaria a false
  const [cargando, setCargando] = useState(true);


  // asignamos a una variable el hook para ver los parametros que le pasamos desde el route de App.jsx y lo mostramos por consola a ver si esta correctamente
  const params = useParams();
  // console.log(params);

  // extraemos id que es el params que le pasamos desde el route de react para que confirme la cuneta
  const {id} = params;

  // utilizamos este hook para que se ejecute una vez que el componente esta listo, como dependencia le pasamos un [] para que se ejecute solo una vez
  useEffect(() => {

    // creamos una funcion para llamarla luego donde vamos a consultar la bd con el id extraido de useParams
    const confirmarCuenta = async () => {
      try {

        // tenemos que habilitar esta url para que Cors no nos impida el acceso
        // en este caso vamos a ir hacia el backend con esta ruta, pero desde nuesto react router
        const url = `/veterinarios/confirmar/${id}`;

        // data es siempre el valos que nos va a devolver la consulta con axios
        // en este caso nos va a retornar el objeto json que manda un msg de usuario confirmado correctamente
        const {data} = await clienteAxios(url);

        // comprobammos los datos que nos manda axios
        // console.log(data);

        // si llegamos hasta este codigo quiere decir que se confirmo correctamente
        // entonces pasamos el state de cuentaConfirmada a true 
        setCuentaConfirmada(true);

        // tambien vamos a mandar el alerta de cuenta confirmada del data obtenido por axios
        setAlerta({
          msg: data.msg,
          error: false,
        });

      } catch (error) {
        // si caemos aca es un error por lo tanto obtenemos el error y la configuracion del backend que hicimos
        // cambiamos el estado del alerta ya que era un objeto vacio ahora le ponemos los siguientes elementos
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      };

      // una vez confirmada la cuenta o no vamos a pasar al cargando a false porque ya termino de realizar la comprobacion con el servidor
      // para que muestre el msj en el componente si ya termino con el servidor
      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
        <div>
            <h1 className="text-indigo-600 text-4xl font-black">Confirma tu cuenta y administra tus {""} <span className="text-black">Pacientes</span></h1>
        </div>
        <div className="bg-white shadow-lg mt-20 md:mt-10 px-5 py-10 rounded-xl">
            {!cargando &&
              <Alerta
                alerta={alerta}
              />
            }
            {cuentaConfirmada &&
              (<Link className="block text-center my-5 text-gray-500" to="/">Inica sesión!!</Link>)
            }
        </div>
    </>
  )
}

export default ConfirmarCuenta;