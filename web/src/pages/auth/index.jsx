import LoginForm from "./components/LoginForm";
import CreateAccountForm from "./components/CreateAccountForm";
import CreateUsernameForm from "./components/CreateUsernameForm";
import useFormsStore from "./store/forms";
import Modal from "../../ui/Modal";

export default function Auth() {
  const { form, isOpenModal, setCloseModal } = useFormsStore((state) => state);

  return (
    <Modal isOpenModal={isOpenModal} setCloseModal={setCloseModal}>
      <div className="flex h-[645px] w-[875px] ">
        <div className="min-w-[50%]">
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/layout-service/standard.0638957.png"
            alt="singin"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-[50%] flex-grow">
          {form === "LOGIN" && <LoginForm />}
          {form === "CREATE_ACCOUNT" && <CreateAccountForm />}
          {form === "CREATE_USERNAME" && <CreateUsernameForm />}
        </div>
      </div>
    </Modal>
  );
}
