// importamos el state para utilizar mostrar el formulario
import { useState } from "react";

// importamos los componentes que forman esta pagina
import Fromulario from "../components/Fromulario"
import ListadoPacientes from "../components/ListadoPacientes"

const AdministrarPacientes = () => {

  // state para mostrar el formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row container">
        <button
          type="button"
          className="uppercase font-bold bg-indigo-600 py-3 text-white mx-10 rounded-md mb-5 md:mb-0 hover:bg-indigo-700 md:hidden"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >{mostrarFormulario ? "Ocultar Formulario" : "Mostrar Formulario"}  </button>
        <div 
          className={`${mostrarFormulario ? 'block ': 'hidden' } md:w-1/2 lg:w-3/5 md:block`}
        >
          <Fromulario/>
        </div>
        <div className="md:w-1/2 lg:w-3/5">
          <ListadoPacientes/>
        </div>
      </div>

    </>
  )
}

export default AdministrarPacientes