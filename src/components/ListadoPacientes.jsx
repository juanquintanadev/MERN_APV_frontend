// importamos nuestro hook de state global de pacientes
import usePacientes from "../hooks/usePacientes"

import Paciente from "./Paciente";

const ListadoPacientes = () => {

  // extraemos el state que almacenamos con los pacientes
  const {pacientes} = usePacientes();

  // console.log(pacientes);
  return (
    <>
      {pacientes.length ? 
      (
        <>
          <h2 className="font-black text-3xl uppercase text-center">Listado de Pacientes</h2>
          <p className="text-center text-xl mt-5 mb-10">
            Administra tus {''} <span className="font-bold uppercase text-indigo-600">pacientes y citas</span>
          </p>
          {pacientes.map(paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
      ) : 
      (
        <>
          <h2 className="font-black text-3xl uppercase text-center">No hay pacientes</h2>
          <p className="text-center text-xl mt-5 mb-10">
            Agrega pacientes a tu lista y apareceran {''} <span className="font-bold uppercase text-indigo-600">aquí</span>
          </p>
        </> 
      )}
    </>
  )
}

export default ListadoPacientes