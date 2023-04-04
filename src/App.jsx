// vamos a importar los routers de react
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// importamos el layout
import AuthLayout from './layout/AuthLayout';
// importamos el layout donde va a acceder si esta logeado el veterinario
import RutaProtegida from './layout/RutaProtegida';

// aca vamos a importar las paginas hijo del layout principal
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import NuevoPassword from './paginas/NuevoPassword';
import AdministrarPacientes from './paginas/AdministrarPacientes';
import CambiarPassword from './paginas/CambiarPassword';
import EditarPerfil from './paginas/EditarPerfil';


// importamos el provider del context para poder tener acceso a los states globales
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* area publica */}
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path='registrar' element={<Registrar/>}/>
              <Route path='olvide-password' element={<OlvidePassword/>}/>
              <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
              <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
            </Route>

            {/* area privada donde requerimos que el usuario este autenticado inicado sesion*/}
            <Route path='/admin' element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>}/>
              <Route path='perfil' element={<EditarPerfil/>}/>
              <Route path='cambiar-password' element={<CambiarPassword/>}/>
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
};

export default App;
