// importamos states para los inputs
import { useState, useEffect } from "react"

// importamos el componente de alerta
import Alerta from './Alerta';

// importamos el use para los pacientes
import usePacientes from "../hooks/usePacientes";

const Fromulario = () => {

    // iniciamos los inputs con los states
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    // en el caso del veterinario que se encuentra en el modelo, lo vamos a traer del inicio de sesion.

    // el alerta para mostrar diferentes mensajes con el componente Alerta que tenemos en components
    const [alerta, setAlerta] = useState({});

    // extraemos pacientes del context
    const {guardarPaciente, paciente} = usePacientes();

    // console.log(paciente);

    // aca no vamos a tener que usar este state ya que se recomienda modificarlo en el provider
    // console.log(pacientes);

    // useEffect para poder leer los datos de editar y pasamos como dependencia el state paciente, cuando este state cambie el effect se ejecuta.
    useEffect(() => {
        
        // vamos a comprobar si hay un campo del state con contenido entonces recien ahi modificamos el state de los inputs
        if(paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        };

    }, [paciente]);


    // funcion para ejecutar el submit del form
    const handleSubmit = e => {
        e.preventDefault();

        // vamos a validar el form que todos los campos tengan informacion por el usuario
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true,
            });
            return;
        };

        // le pasamos al context de guardar paciente todos los datos en forma de un objeto, ademas pasamos su id que en este caso si va con contenido es que estamos editando.
        guardarPaciente({nombre, propietario, email, fecha, sintomas, id});

        // pasamos la validacion reiniciamos el alerta
        setAlerta({
            msg: 'Almacenado correctamente',
            error: false,
        });

        // tenemos que reiniciar todos los states para poder limpiar los campos una vez guardados todos los cambios
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId(null);
    };

    // extraemos el msg para mostrar el alerta o no
    const {msg} = alerta;

    return (
        <>
            <h2 className="font-black text-3xl uppercase text-center">Fromulario de pacientes</h2>
            <p className="text-center text-xl mt-5 mb-10">
                Completa el formualrio para administrar tus {''} <span className="text-indigo-600 font-bold">Pacientes</span>
            </p>

            <form 
                className="mb-10 bg-white py-2 px-5 md:mb-5 shadow-md rounded-md" action=""
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label 
                        className="block uppercase text-gray-800 font-bold" 
                        htmlFor="nombre">
                            Nombre Mascota:
                    </label>
                    <input 
                        className="w-full placeholder-gray border-2 p-2 mt-2 rounded-md" 
                        type="text" 
                        placeholder="Nombre de la mascota" 
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        className="block uppercase text-gray-800 font-bold" 
                        htmlFor="propietario">
                            Nombre Propietario:
                    </label>
                    <input 
                        className="w-full placeholder-gray border-2 p-2 mt-2 rounded-md" 
                        type="text" 
                        placeholder="Nombre del Propietario" 
                        id="propietario"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        className="block uppercase text-gray-800 font-bold" 
                        htmlFor="email">
                            Email Propietario:
                    </label>
                    <input 
                        className="w-full placeholder-gray border-2 p-2 mt-2 rounded-md " 
                        type="email" 
                        placeholder="Email del Propietario" 
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        className="block uppercase text-gray-800 font-bold" 
                        htmlFor="fecha">
                            Fecha Ingreso:
                    </label>
                    <input 
                        className="w-full placeholder-gray border-2 p-2 mt-2 rounded-md " 
                        type="date"
                        id="fecha"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        className="block uppercase text-gray-800 font-bold" 
                        htmlFor="sintomas">
                            Sintomas:
                    </label>
                    <textarea 
                        className="w-full placeholder-gray border-2 p-2 mt-2 rounded-md " 
                        id="sintomas"
                        placeholder="Describe los sintomas de la mascota"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input 
                    className="w-full bg-indigo-500 py-5 font-bold uppercase text-white rounded-md hover:bg-indigo-800 hover:cursor-pointer transition-colors" 
                    type="submit" 
                    value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
                />
            </form>

            {msg && 
                <Alerta
                    alerta={alerta}
                />
            }
        </>
    )
}

export default Fromulario