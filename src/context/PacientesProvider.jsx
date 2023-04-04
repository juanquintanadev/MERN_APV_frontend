// importamos los hooks para crear el context
import { useState, useEffect, createContext } from "react";

// importamos el cliente axios para comunicarnos con el servidor
import clienteAxios from '../config/axios';

// importamos el useAuth el auth para que cuando se cierre sesion y se vuelva a abrir nos traeremos los pacientes de manera actualizada
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {

    // creamos los states, en el caso de pacientes, vamos a iniciarlo como un arreglo vacio
    const [pacientes, setPacientes] = useState([]);

    // creamos un state para cuando vamos a editar un paciente, tenemos la informacion de ese paciente
    const [paciente, setPaciente] = useState({});

    const {auth} = useAuth();

    // vamos a utilizar el effect para obtener todos los pacientes cargados por el usuario
    useEffect(() => {

        // creamos una funcion para mostrar los pacientes y la mandamos a llamar asi tenemos async
        const obtenerPacientes = async () => {
            try {

                // extraemos el token del localStorage que esta la informacion del id del veterinario para hacerlo parte del config de axios y autorizar la peticion
                const token = localStorage.getItem('token');
                // console.log(token)
                if(!token) return;
                
                // configuracion para pasarle a axios get
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                // console.log(config)
                
                // realizamos la consulta al servidor con la configuracion de autorizacion
                const { data } = await clienteAxios('/pacientes', config);
                
                // confirmamos que tenemos el resultado que queremos con un arreglo con todos los pacientes de el veterinario logeado
                // console.log(data);

                // y ahora si pasamos el valor al state global
                setPacientes(data);
                
            } catch (error) {
                console.log(error.response.data.msg);
            };
        };
        obtenerPacientes();
    }, [auth]); // cada vez que auth se modifique entonces vamos a tener un useEffect ejecutandose nuevamente

    // creamos una funcion para guardar pacientes y esta la vamos a utilizar en el form
    const guardarPaciente = async (paciente) => {

        // extraemos el token del localStorage para hacerlo parte del config de axios y autorizar la peticion
        const token = localStorage.getItem('token');

        // configuracion para pasarle a axios post
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        if(paciente.id) { // en este caso el id viene con valores por lo tanto estamos en la opcion de editar.

            try {

                // aca guardamos con put los cambios con el id del paciente.
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                // console.log(data);

                // realizamos una iteracion sobre el state de pacientes para encontrar el paciente que queremos modificar en el state global.
                // al crear un nuevo arreglo con map vamos devolviendo los valores que corresponden si encontramos el paciente a editar
                const pacientesActualizado = pacientes.map(pacienteActualizado => pacienteActualizado._id === paciente.id ? data : pacienteActualizado);

                // luego vamos a actualizar el arreglo de pacientes con el nuevo arreglo obtenido del map
                setPacientes(pacientesActualizado);

            } catch (error) {
                console.log(error);
            };

        } else { // en este caso vamos a crear un nuevo registro por eso el id viene con null en esta parte

            // empezamos con un try para mandar la peticion al servidor tipo post
            try {

                // realizamos la consulta con method post
                const {data} = await clienteAxios.post('/pacientes', paciente, config);

                // mostramos el resultado
                // console.log(data);

                // con este codigo vamos a crear un nuevo objeto con elementos que no necesitamos para almacenarlo en el state de pacientes
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data;

                // creamos un nuevo objeto sin esos elementos.
                // console.log(pacienteAlmacenado);

                // almacenamos el resulado en el state tomando una copia del arreglo que tenemos como principal al final, osea agregamos el paciente nuevo y al final todos los anteriores
                setPacientes([pacienteAlmacenado, ...pacientes]);

                // console.log(pacientes)

            } catch (error) {
                console.log(error.response.data.msg);
            };
        };
    };

    // creamos la funcion para editar los pacientes y luego obtener los datos de dicho paciente
    const setEditar = (paciente) => {
        setPaciente(paciente)
    };

    // funcion que vamos a llamar desde el button de eliminar
    const eliminarPaciente = async id => {
        // console.log('eliminando', id);

        

        // vamos a crear un alerta modal para ver si en realidad queremos eliminar el paciente, por lo tanto usaremos una funcion de js
        const confirmar = confirm('¿Desea eliminar este paciente?');
        
        // si damos en si entonces hacemos el llamado a la api y sincronizamos el state tambien
        if(confirmar) {
            try {

                // extraemos el token del localStorage para hacerlo parte del config de axios y autorizar la peticion
                const token = localStorage.getItem('token');

                // configuracion para pasarle a axios post
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                // realizamos el delete correspondiente al id que nos pasaron, porque asi lo tenemos en el backend
                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config);

                // ahora con filter vamos a traer todos los pacientes que son diferentes al id que eliminamos 
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id);

                // una vez creado el arreglo con los pacientes que son diferentes al id que pasamos para eliminar
                // actualizamos el state de pacientes para poder actualizar el dom
                setPacientes(pacientesActualizado);

            } catch (error) {
                console.log(error);
            };
        };


    };

    return (
        <PacientesContext.Provider 
            value={{
                pacientes,
                guardarPaciente,
                setEditar,
                paciente,
                eliminarPaciente,
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
};

export {
    PacientesProvider,
};

export default PacientesContext;
