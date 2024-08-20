import { useState } from "react";
import { Button, Form, Input } from "antd";
import { IoIosArrowRoundBack } from "react-icons/io";

import { LeftOutlined } from "@ant-design/icons";
import { useAuthStore } from "../store/auth";
import authService from "../services/authService";
import { useUserStore } from "../../../store/userStore";

export default function CreateAccountForm() {
	// const [error, setError] = useState();
	// const email = useAuthStore((state) => state.email);
	// const setAccion = useAuthStore((state) => state.setAccion);
	// const retryRequest = useUserStore((state) => state.retryRequest);
	// const setRetryRequest = useUserStore((state) => state.setRetryRequest);

	// const handleStateForm = async ({ password, repeatPassword, name }) => {
	//   try {
	//     const credentials = { email, password, repeatPassword, name };
	//     await authService.createUser(credentials);
	//     setRetryRequest(!retryRequest);
	//     setError(null);
	//   } catch (err) {
	//     setError(err.response.data.message);
	//   }
	// };

	const setChangeAction = useAuthStore((state) => state.setChangeAction);

	const handleChangeForm = () => {
		setChangeAction("LOGIN");
	};

	return (
		<div className="flex flex-col h-full pb-8 mx-10 pt-5">
			<div className="flex-grow">
				<div onClick={handleChangeForm} className="header flex space-x-[2px] items-center pb-6 -ml-4 cursor-pointer">
					<IoIosArrowRoundBack size={25} />
					<span className="font-medium text-sm">Volver</span>
				</div>
				<div className="main-container">
					<p className="text-2xl font-bold pb-8">Continuar con tu correo electrónico</p>
					<Form>
						<Form.Item name="email" className="mb-4">
							<div className="pb-2">
								<span className="text-base font-semibold text-color1 -tracking-tight">Email</span>
							</div>
							<Input placeholder="nombre@email.com" className="h-[42px]" />
						</Form.Item>
						<Form.Item name="password" className="pb-7">
							<div className="pb-2">
								<span className="text-base font-semibold text-color1 -tracking-tight">Contraseña</span>
							</div>
							<Input.Password type="password" className="h-[42px]" />
						</Form.Item>
						<Button className="w-full h-10" htmlType="submit">
							Continuar
						</Button>
					</Form>
				</div>
			</div>

			<div className="footer mt-auto">
				<p className="text-xs text-color4 opacity-90 leading-relaxed">
					Al unirte, aceptas los <span className="underline cursor-pointer">Términos de servicio</span> de Fiverr y
					recibirás ocasionalmente nuestros correos electrónicos. Lee nuestra{" "}
					<span className="underline cursor-pointer">Política de privacidad</span> para saber cómo utilizamos tus datos
					personales.
				</p>
			</div>
		</div>
	);
}
