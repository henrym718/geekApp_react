import { Form, Input, Button } from "antd";
import useFormsStore from "../store/forms";
import InputLOading from "../components/InputLoading";

import AuthService from "../services/authService";
import { useRef, useState } from "react";

export default function LoginForm() {
  const setChangeAction = useFormsStore((state) => state.setChangeAction);
  const [error, setError] = useState(null);
  const [msgError, setMsgError] = useState("");

  const [openSpinner, setOpenSpinner] = useState(false);

  const timeoutRef = useRef(null);

  const handleChangeForm = () => {
    setChangeAction("CREATE_ACCOUNT");
  };

  const handleOnchange = (value) => {
    let str = value?.split("@");
    const str1 = str[1]?.split(".");
    console.log(value?.trim().length);

    if (value?.trim().length > 3 && (!value?.includes("@") || (str1 && str1[1]?.length > 1))) {
      setOpenSpinner(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        let validate = "henry";
        if (validate == value) {
          setError(false);
        } else {
          setError(true);
        }
        setOpenSpinner(false);
      }, 800);
    } else {
      setOpenSpinner(false);
    }
  };

  return (
    <div className="flex flex-col h-full pb-8 mx-10 pt-5">
      <div className="flex-grow">
        <div className="main-container pt-12">
          <p className="text-2xl font-bold pb-1">Inicia sesión en tu cuenta</p>
          <div className="space-x-2 pb-8">
            <span>¿No tienes una cuenta?</span>
            <span onClick={handleChangeForm} className="underline cursor-pointer">
              Únete aquí
            </span>
          </div>

          <Form>
            <Form.Item name="email" className="mb-4">
              <div className="pb-2">
                <span className="text-base font-semibold text-color1 -tracking-tight">
                  Email o username
                </span>
              </div>
              {/* <Input className="h-[42px]" /> */}
              <InputLOading
                name="email"
                type="text"
                onChange={handleOnchange}
                error={error}
                msgError={msgError}
                openSpinner={openSpinner}
              />
            </Form.Item>
            <Form.Item name="password">
              <div className="pb-2">
                <span className="text-base font-semibold text-color1 -tracking-tight">
                  Contraseña
                </span>
              </div>
              <Input.Password type="password" className="h-[42px]" />
            </Form.Item>
            <div className="flex justify-end pb-10">
              <span className="underline -tracking-tight">¿Olvidaste tu contraseña?</span>
            </div>
            <Button className="w-full h-10" htmlType="submit">
              Continuar
            </Button>
          </Form>
        </div>
      </div>

      <div className="footer mt-auto">
        <p className="text-xs text-color4 opacity-90 leading-relaxed">
          Al unirte, aceptas los{" "}
          <span className="underline cursor-pointer">Términos de servicio</span> de Fiverr y
          recibirás ocasionalmente nuestros correos electrónicos. Lee nuestra{" "}
          <span className="underline cursor-pointer">Política de privacidad</span> para saber cómo
          utilizamos tus datos personales.
        </p>
      </div>
    </div>
  );
}
