// importamos un paquete para poder cargar componentes en el layout principal
import {Outlet} from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
        <main className='container md:grid md:grid-cols-2 mx-auto mt-6 gap-12 p-5 items-center'>
            <Outlet/>
        </main>
    </>
  )
}

export default AuthLayout