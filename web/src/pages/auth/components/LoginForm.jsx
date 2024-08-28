import { useRef, useState } from "react";
import useFormsStore from "../store/forms";
import InputLOading from "../components/InputLoading";
import AuthService from "../services/authService";
import InputPassword from "./InputPassword";

export default function LoginForm() {
  const [error, setError] = useState(null);
  const [msgError, setMsgError] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const setChangeAction = useFormsStore((state) => state.setChangeAction);

  const [openSpinner, setOpenSpinner] = useState(false);

  const timeoutRef = useRef(null);

  const handleChangeForm = () => {
    setChangeAction("CREATE_ACCOUNT");
  };

  const handleOnchangeEmail = (email) => {
    let str = email?.split("@");
    setOpenSpinner(false);

    if (
      (email?.length > 5 && !email?.includes("@")) ||
      (email?.includes("@") && str[0]?.length && str[1]?.split(".")[1]?.length > 1)
    ) {
      try {
        setOpenSpinner(true);
      } catch (error) {
        setError(true);
        setMsgError(error.message);
      } finally {
        //setOpenSpinner(false);
      }
    }
  };

  const handleOnchangePassword = (value) => {
    console.log(value);
  };

  return (
    <div className="flex flex-col h-full pb-2 mx-10 pt-14">
      <div className="flex-grow">
        <p className="text-2xl font-bold pb-1">Inicia sesión en tu cuenta</p>
        <div className="space-x-2 pb-8">
          <span>¿No tienes una cuenta?</span>
          <span onClick={handleChangeForm} className="underline cursor-pointer">
            Únete aquí
          </span>
        </div>
        <p className="text-base font-medium text-color1 -tracking-tight pb-[10px]">
          Email o username
        </p>
        <InputLOading
          name="email"
          type="text"
          onChange={handleOnchangeEmail}
          error={error}
          msgError={msgError}
          openSpinner={openSpinner}
        />
        <p className="text-base font-medium text-color1 -tracking-tight pb-[10px]">Contraseña</p>
        <InputPassword onChange={handleOnchangePassword} />
        <p className="underline text-right pt-2 -tracking-tight">¿Olvidaste tu contraseña?</p>
        <button
          className="w-full h-[42px] text-color5 bg-color3 mt-12 hover:bg-zinc-700 font-medium rounded border disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-400"
          htmlType="submit"
          disabled={disabledButton ? true : false}
          //onClick={handleNextForm}
        >
          Continuar
        </button>
      </div>
      <div className=" pb-6">
        <p className="text-xs text-color4 opacity-90 leading-relaxed">
          Al unirte, aceptas los
          <span className="underline cursor-pointer">Términos de servicio</span> de Fiverr y
          recibirás ocasionalmente nuestros correos electrónicos. Lee nuestra
          <span className="underline cursor-pointer">Política de privacidad</span> para saber cómo
          utilizamos tus datos personales.
        </p>
      </div>
    </div>
  );
}
