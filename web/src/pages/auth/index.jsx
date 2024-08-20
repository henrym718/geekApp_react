import LoginForm from "./components/LoginForm";
import CreateAccountForm from "./components/CreateAccountForm";
import { useAuthStore } from "./store/auth";
import Modal from "../../ui/Modal";

export default function Auth() {
	const { action, isOpenModal, setCloseModal } = useAuthStore((state) => ({
		action: state.action,
		isOpenModal: state.isOpenModal,
		setCloseModal: state.setCloseModal,
	}));

	return (
		<Modal open={isOpenModal} onCancel={setCloseModal}>
			<div className="flex h-[645px] w-[875px] ">
				<div className="min-w-[50%]">
					<img
						src="https://fiverr-res.cloudinary.com/npm-assets/layout-service/standard.0638957.png"
						alt="singin"
						className="w-full h-full object-cover"
					/>
				</div>

				<div className="min-w-[50%] flex-grow">
					{action === "LOGIN" && <LoginForm/>}
					{action === "CREATE_ACCOUNT" && <CreateAccountForm />}
					{action === "CREATE_USERNAME" && <h1>UserName</h1>	}
				</div>
			</div>
		</Modal>
	);
}
