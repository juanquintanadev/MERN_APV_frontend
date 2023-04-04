// importamos nuestro hook para poder extraer la funcion de editar la cita
import usePacientes from "../hooks/usePacientes";

// extraemos los objetos que nos mandan del arreglo.
const Paciente = ({paciente}) => {

    // extraemos la funcion para editar el paciente
    const { setEditar, eliminarPaciente} = usePacientes();

    // extraemos del objeto toda la informacion que vamos a necesitar
    const {nombre, propietario, email, fecha, sintomas, _id} = paciente;

    // console.log(fecha);

    // creamos una funcion para formatear la fecha donde toma una fecha y la convertimos con la api de intl.dateTimeFormat
    const formatearFecha = (fecha) => {

        // creamos una nueva instancia de la fecha que le pasamos a esta funcion
        const nuevaFecha = new Date(fecha);

        //retornamos la fecha formateada con la configuracion correspondiente
        return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha);
    };

    // console.log(fecha);
    
    return (
        <>
            <div className="shadow-md rounded-xl mx-10 p-5 my-10 bg-white uppercase">
                <p className="font-bold text-xl mb-2  text-indigo-600">
                    Nombre: {''}
                    <span className="font-normal normal-case text-black">{nombre}</span>
                </p>
                <p className="font-bold text-xl mb-2 text-indigo-600">
                    Propietario: {''}
                    <span className="font-normal normal-case text-black">{propietario}</span>
                </p>
                <p className="font-bold text-xl mb-2 text-indigo-600">
                    Email de contacto: {''}
                    <span className="font-normal normal-case text-black">{email}</span>
                </p>
                <p className="font-bold text-xl mb-2 text-indigo-600">
                    Fecha de alta: {''}
                    <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
                </p>
                <p className="font-bold text-xl mb-2 text-indigo-600">
                    Sintomas de la mascota: {''}
                    <span className="font-normal normal-case text-black">{sintomas}</span>
                </p>
                <div className="flex justify-between mt-5">
                    <button 
                        type="button" 
                        className="bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 rounded-md"
                        onClick={() => setEditar(paciente)}
                    >Editar Cita</button>
                    <button 
                        type="button" 
                        className="bg-red-600 px-5 py-2 text-white hover:bg-red-700 rounded-md "
                        onClick={() => eliminarPaciente(_id)}
                    >Eliminar Cita</button>
                </div>
            </div>
        </>
        
    )
}

export default Paciente