import EmailValidateForm from "./components/EmailValidateForm";
import LoginUserForm from "./components/LoginUserForm";
import CreateAccountForm from "./components/CreateAccountForm";
import { useAuthStore } from "./store/auth";

export default function Auth() {
  const accion = useAuthStore((state) => state.accion);
  console.log(accion);

  return (
    <div className='flex flex-col  justify-center  '>
      {accion === "CHECK_EMAIL" && <EmailValidateForm />}
      {accion === "LOGGIN" && <LoginUserForm />}
      {accion === "CREATE_ACCOUNT" && <CreateAccountForm />}
    </div>
  );
}
