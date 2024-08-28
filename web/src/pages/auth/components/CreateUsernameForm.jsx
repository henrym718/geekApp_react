import { useEffect, useRef, useState } from "react";
import authService from "../services/authService";
import useFormsStore from "../store/forms";
import useAuthStore from "../store/auth";
import InputLoading from "./InputLoading";
import setAccessToken from "../utils/setAccessToken";
import { Loader2 } from "lucide-react";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function CreateUsernameForm() {
  const [error, setError] = useState(null);
  const [msgError, setMsgError] = useState("");
  const [openSpinner, setOpenSpinner] = useState(false);
  const [openSpinnerButton, setOpenSpinnerButton] = useState(false);
  const [msgErrorButton, setMsgErrorButton] = useState(false);

  const { setChangeAction, setCloseModal } = useFormsStore((state) => state);
  const { setCleanStore, setUsername, email, password, username } = useAuthStore((state) => state);

  const timeoutRef = useRef();

  const handleBackForm = () => {
    setChangeAction("CREATE_ACCOUNT");
  };

  const handleOnchangeUserName = (username) => {
    setOpenSpinner(false);
    const regex = /^[a-zA-Z0-9]+$/;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!regex.test(username) && username.length) {
      setError(true);
      setMsgError("Intenta usar solo caracteres alfanumericos");
      return;
    }

    if ((error !== null) & (!username.length || username.length < 6)) {
      setError(true);
      setMsgError(
        "Es demasiado corto. Un buen nombre de usuario debe tener al menos 6 caracteres. "
      );
      return;
    }

    if (username.length > 5) {
      setOpenSpinner(true);
      timeoutRef.current = setTimeout(async () => {
        try {
          const data = await authService.checkUsername(username);
          setError(data);
          setMsgError(data ? "Parece que este username ya existe" : "");
          !data && setUsername(username);
        } catch (error) {
          setError(true);
          setMsgError(error.message);
        } finally {
          setOpenSpinner(false);
        }
      }, 700);
    }
  };

  const handleOnClick = async () => {
    setOpenSpinnerButton(true);
    setMsgErrorButton(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const credentials = { email, password, username };
      const data = await authService.createAccount(credentials);
      setAccessToken(data.accessToken);
      setCloseModal();
    } catch (error) {
      setMsgErrorButton(error.message);
    } finally {
      setOpenSpinnerButton(false);
    }
  };

  useEffect(() => {
    return () => {
      setCleanStore();
    };
  }, []);

  return (
    <div className="flex flex-col  h-full mx-10 pt-5">
      <div
        onClick={handleBackForm}
        className="flex space-x-[2px] items-center pb-6 -ml-4 cursor-pointer"
      >
        <IoIosArrowRoundBack size={25} />
        <span className="font-medium text-sm">Volver</span>
      </div>
      <p className="text-2xl font-bold pb-2">¡Estás a punto de ser parte de nosotros!</p>
      <p className="text-base text-color4">
        Agrega un nombre de usuario exclusivo para ti. Así es como te verán los demás.
      </p>
      <p className="text-sm font-medium mt-1 pb-8">
        No puedras cambiarlo, así que elige sabiamente.
      </p>
      <p className="text-base font-medium text-color1 -tracking-tight pb-[10px]">
        Nombre de usuario
      </p>
      <InputLoading
        name="userName"
        type="text"
        onChange={handleOnchangeUserName}
        error={error}
        msgError={msgError}
        openSpinner={openSpinner}
      />
      <p className=" text-sm text-color4 -mt-3">
        Genera confianza usando tu nombre o el de tu empresa
      </p>
      <button
        className=" flex items-center justify-center w-full h-[42px] text-color5 bg-color3 hover:bg-zinc-700 font-medium rounded border disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-400 mt-12	"
        htmlType="submit"
        onClick={handleOnClick}
        disabled={error || error === null || (!error && openSpinner) ? true : false}
      >
        {openSpinnerButton ? (
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        ) : (
          "Crear mi cuenta"
        )}
      </button>
      <p className="text-red-500 ">{msgErrorButton ? msgErrorButton : null}</p>
    </div>
  );
}
