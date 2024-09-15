import { useRef, useState } from "react";
import useFormsStore from "../store/forms";
import InputLOading from "../components/InputLoading";
import authService from "../services/authService";
import InputPassword from "./InputPassword";
import useUserStore from "../store/user";
import setAccessToken from "../utils/setAccessToken";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const [error, setError] = useState(null);
  const [msgError, setMsgError] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [openSpinner, setOpenSpinner] = useState(false);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [msgErrorButton, setMsgErrorButton] = useState(false);
  const [openSpinnerButton, setOpenSpinnerButton] = useState(false);
  const { setChangeAction, setCloseModal } = useFormsStore((state) => state);
  const { setUser } = useUserStore((state) => state);
  const timeoutRef = useRef(null);

  const handleChangeForm = () => {
    setChangeAction("CREATE_ACCOUNT");
  };

  const handleOnchangeEmail = (credential) => {
    let str = credential?.split("@");
    setOpenSpinner(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (credential?.trim()?.length) {
      if (
        (credential?.length > 5 && !credential?.includes("@")) ||
        (credential?.includes("@") && str[0]?.length && str[1]?.split(".")[1]?.length > 1)
      ) {
        setOpenSpinner(true);
        timeoutRef.current = setTimeout(async () => {
          try {
            const existsCredential = await authService.checkCredential(credential);
            setCredential(existsCredential ? credential : "");
            setError(existsCredential ? false : true);
            setMsgError(!existsCredential ? "Parece que aun no tienes una cuenta creada" : "");
            setDisabledButton(existsCredential ? false : true);
          } catch (error) {
            setError(true);
            setMsgError(error.message);
          } finally {
            setOpenSpinner(false);
          }
        }, 700);
      } else if (credential?.includes("@")) {
        setError(true);
        setMsgError("Parece que el email esta incompleto");
      }
    } else if ((error === false || error === true) && credential.trim() === "") {
      setError(true);
      setMsgError("Parece que tu email o username esta incompleto");
    }
  };

  const handleOnchangePassword = (password) => {
    setPassword(password);
  };

  const handleOnClick = async () => {
    try {
      setOpenSpinnerButton(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const { accessToken, user } = await authService.loginWithCredential({ credential, password });
      setUser(user);
      setAccessToken(accessToken);
      setCloseModal();
    } catch (error) {
      setMsgErrorButton(error.message);
    } finally {
      setOpenSpinnerButton(false);
    }
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
          className="w-full h-[42px] flex items-center justify-center text-color5 bg-color3 mt-12 hover:bg-zinc-700 font-medium rounded border disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-400"
          htmlType="submit"
          disabled={
            error || disabledButton || !password.trim().length || openSpinner ? true : false
          }
          onClick={handleOnClick}
        >
          {openSpinnerButton ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          ) : (
            "Continuar"
          )}
        </button>
        <p className="text-red-500 ">
          {msgErrorButton && !openSpinnerButton ? msgErrorButton : null}
        </p>
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
