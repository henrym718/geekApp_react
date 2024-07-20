import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";

export default function Menu() {
  return (
    <header className='flex '>
      <div>
        <NavLink to={"/"}>LOGO</NavLink>
      </div>
      <div className='flex items-center space-x-4'>
        <NavLink to={"/profile"}>Conviertete en vendedor</NavLink>
        <NavLink to={"/next"}>Iniciar sesion</NavLink>
        <NavLink to={"/next"}>Unete</NavLink>
        <div>
          <Avatar />
        </div>
      </div>
    </header>
  );
}
