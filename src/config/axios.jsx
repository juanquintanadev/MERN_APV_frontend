// vamos a importar axios y este solamente se importa aca porque luego vamos a utilizar lo que salga de este component
import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export default clienteAxios;