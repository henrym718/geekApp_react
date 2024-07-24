import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";

export default function Menu() {
  return (
    <>
      <header className="flex justify-between items-center px-4 h-16  mx-auto">
        <NavLink to="/">LOGO</NavLink>
        <div className="flex items-center space-x-4">
          <NavLink to="/profile">Conviertete en vendedor</NavLink>
          <NavLink to="/next">Iniciar sesion</NavLink>
          <NavLink
            to="/next"
            className="text-green-500 border border-green-500 rounded p-2 hover:bg-green-500 hover:text-white"
          >
            Unete
          </NavLink>
          <div>
            <Avatar />
          </div>
        </div>
      </header>

      <div className="w-full mb-10">
        <div className="absolute left-0 w-full">
          <hr className="border-t border-gray-300 my-4" />
        </div>
      </div>
    </>
  );
}
