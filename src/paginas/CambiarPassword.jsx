import { useState } from "react";

import Alerta from "../components/Alerta";

import AdminNav from "../components/AdminNav"

import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo:'',
    });
    const [alerta, setAlerta] = useState({});

    const {guardarPassword} = useAuth();
    
    const handleSubmit = async e => {
        e.preventDefault();

        // aca comprobamos que el objeto de password tenga contenido
        // console.log( Object.values( password).some( campo => campo === ''));

        if(Object.values( password).some( campo => campo === '')) {
            setAlerta({
                msg: 'Los dos campos son obligatorios',
                error: true,
            });
            return;
        };

        if(password.pwd_nuevo.length < 6) {
            setAlerta({
                msg: 'El password nuevo debe tener minimo 6 caracteres',
                error: true,
            });
            return;
        };

        const resultado = await guardarPassword(password);

        setAlerta(resultado);

    };

    const {msg} = alerta;

    return (
        <>
            <AdminNav/>

            <h2 className="mt-10 text-center text-black text-3xl font-bold">Cambiar Password</h2>

            <p className="my-10 text-center font-normal text-xl">Cambia tu password con el siguiente {''} <span className="text-indigo-500 font-bold">Formulario</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 rounded-lg bg-white shadow-md p-2 ">
                    <form className="mb-5" onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label 
                                className="uppercase font-bold text-gray-500"
                            >
                                Password Actual:
                            </label>
                            <input 
                                type="password" 
                                className="w-full rounded-md bg-gray-100 mt-5 p-2"
                                name="pwd_actual"
                                placeholder="Escribe tu password actual"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value,
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label 
                                className="uppercase font-bold text-gray-500"
                            >
                                Nuevo Password:
                            </label>
                            <input 
                                type="password" 
                                className="w-full rounded-md bg-gray-100 mt-5 p-2"
                                name="pwd_nuevo"
                                placeholder="Escribe tu nuevo password"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value,
                                })}
                            />
                        </div>
                        <input 
                            className="w-full bg-indigo-600 py-4 rounded-md text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer"
                            type="submit"   
                            value="Actualizar Password"
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

export default CambiarPassword