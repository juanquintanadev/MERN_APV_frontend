
// importamos la navegacion que necesitamos como componente en las dos paginas de edicion de perfil
import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav"

// importamos nuestro hook para tener acceso a la informacion del veterinario logeado
import useAuth from "../hooks/useAuth";

import Alerta from "../components/Alerta";

const EditarPerfil = () => {

    // extraemos de nuestro hook la informacion que necesitamos del veterinario logeado
    const {auth, actualizarPerfil} = useAuth();

    // iniciamos un state de perfil vacio para no modificar el original hasta que el usuario de click en guardar cambios
    const [perfil, setPerfil] = useState({});

    const [alerta, setAlerta] = useState({});

    // console.log(auth);

    // utilizamos como dependencia el auth
    // una vez que se cargue el dom llenamos con la informacion de auth el nuevo objeto en el cual vamos a trabajar
    useEffect(() => {
        setPerfil(auth);
    }, [auth]);

    // la funcion para registrar los cambios del perfil de veterinarios
    const handleSubmit = async e => {
        e.preventDefault();
        // console.log('Desde el submit');

        // aplicamos destructuring
        const {nombre, email} = perfil;

        // validacion de al menos dos campos del registro obligatorios
        if([nombre, email].includes('')) {
            setAlerta({
                msg: 'Campo Email y Nombre son obligatorios',
                error: true,
            });
            return;
        };

        setAlerta({});

        // mandamos a llamar al provider con una funcion que toma el objeto que lleno el usuario y todavia no guardamos en el auth
        // esto lo vamos a realizar en el provider.
        // siendo en el provider una funcion asincrona entonces este llamado a esta funcion tambien le vamos a colocar await hasta que se termine de ejecutar no pase a la siguiente linea
        const resultado = await actualizarPerfil(perfil);

        // mostramos la alerta que nos devuelve la funcion del provider
        setAlerta(resultado);
    };

    const {msg} = alerta;

    return (
        <>
            <AdminNav/>

            <h2 className="mt- 10 text-center text-black text-3xl font-bold">Editar perfil</h2>

            <p className="my-10 text-center font-normal text-xl">Edita tu perfil con el siguiente {''} <span className="text-indigo-500 font-bold">Formulario</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 rounded-lg bg-white shadow-md p-2 ">
                    <form className="mb-5" onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label 
                                className="uppercase font-bold text-gray-500"
                            >
                                Nombre:
                            </label>
                            <input 
                                type="text" 
                                className="w-full rounded-md bg-gray-100 mt-5 p-2"
                                name="nombre"
                                value={perfil.nombre || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value,
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label 
                                className="uppercase font-bold text-gray-500"
                            >
                                Web:
                            </label>
                            <input 
                                type="text" 
                                className="w-full rounded-md bg-gray-100 mt-5 p-2"
                                name="web"
                                value={perfil.web || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value,
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label 
                                className="uppercase font-bold text-gray-500"
                            >
                                Teléfono:
                            </label>
                            <input 
                                type="text" 
                                className="w-full rounded-md bg-gray-100 mt-5 p-2"
                                name="telefono"
                                value={perfil.telefono || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value,
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label 
                                className="uppercase font-bold text-gray-500"
                            >
                                Email:
                            </label>
                            <input 
                                type="email" 
                                className="w-full rounded-md bg-gray-100 mt-5 p-2"
                                name="email"
                                value={perfil.email || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value,
                                })}
                            />
                        </div>
                        <input 
                            className="w-full bg-indigo-600 py-4 rounded-md text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer"
                            type="submit"   
                            value="Guardar Cambios"
                        />
                    </form>
                    {msg &&
                    <Alerta
                        alerta={alerta}
                    />
                    }
                </div>
                
            </div>
        </>
    )
}

export default EditarPerfil