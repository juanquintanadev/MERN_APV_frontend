import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <>
        <nav className="flex gap-5">
            <Link 
                to="/admin/perfil"
                className="text-gray-500 font-bold text-xl"
            >Perfil</Link>

            <Link 
                to="/admin/cambiar-password"
                className="text-gray-500 font-bold text-xl"
            >Cambiar Password</Link>
        </nav>
    </>
  )
};

export default AdminNav;