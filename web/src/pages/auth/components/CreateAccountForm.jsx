import { useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { IoIosArrowRoundBack } from "react-icons/io";
import InputLOading from "../../../ui/InputLoading";
import { useAuthStore } from "../store/auth";
import InputPassword from "../../../ui/InputPassword";

export default function CreateAccountForm() {
	const [error, setError] = useState(null);
	const [msgError, setMsgError] = useState("");
	const [openSpinner, setOpenSpinner] = useState(false);
	const [disabledButton, setDisabledButton] = useState(true);

	const timeoutRef = useRef();

	const setChangeAction = useAuthStore((state) => state.setChangeAction);

	const handleChangeForm = () => {
		setChangeAction("LOGIN");
	};

	const handleOnchangeEmail = (value) => {
		const str = value?.split("@");
		setOpenSpinner(false);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		if (value?.trim()?.length) {
			if (value?.includes("@") && str[0]?.length && str[1].split(".")[1]?.length > 1) {
				setOpenSpinner(true);

				timeoutRef.current = setTimeout(() => {
					if (value === "henrym.718@gmail.com") {
						setError(true);
						setMsgError("Parece que ya tienes una cuenta");
						setOpenSpinner(false);
					} else {
						setError(false);
						setOpenSpinner(false);
					}
				}, 900);
			} else if (value?.includes("@")) {
				setError(true);
				setMsgError("Parece que el email esta incompleto");
			}
		}
	};

	const handleOnchangePassword = (value) => {
		console.log(value);
	};

	return (
		<div className="flex flex-col h-full pb-8 mx-10 pt-5">
			<div className="relative flex-grow">
				<div onClick={handleChangeForm} className="header flex space-x-[2px] items-center pb-6 -ml-4 cursor-pointer">
					<IoIosArrowRoundBack size={25} />
					<span className="font-medium text-sm">Volver</span>
				</div>
				<div className="relative">
					<p className="text-2xl font-bold pb-8">Continuar con tu correo electrónico</p>
					<Form>
						<Form.Item name="email">
							<div className="pb-2">
								<span className="text-base font-semibold text-color1 -tracking-tight">Email</span>
							</div>
							<InputLOading
								name="email"
								type="text"
								onChange={handleOnchangeEmail}
								error={error}
								msgError={msgError}
								openSpinner={openSpinner}
							/>
						</Form.Item>
						<Form.Item name="password" className="pb-7">
							<div className="pb-2">
								<span className="text-base font-semibold text-color1 -tracking-tight">Contraseña</span>
							</div>
							<div>
								<InputPassword
									onChange={handleOnchangePassword}
									setDisabledButton={setDisabledButton}
									showCheck={error}
								/>
							</div>
						</Form.Item>
						<div className="w-full">
							<Button
								className="w-full h-10 disabled:cursor-default"
								htmlType="submit"
								disabled={!disabledButton && !error ? false : true}
							>
								Continuar
							</Button>
						</div>
					</Form>
				</div>
				<div className="absolute bottom-0">
					<p className="text-xs text-color4 opacity-90 leading-relaxed">
						Al unirte, aceptas los <span className="underline cursor-pointer">Términos de servicio</span> de Fiverr y
						recibirás ocasionalmente nuestros correos electrónicos. Lee nuestra{" "}
						<span className="underline cursor-pointer">Política de privacidad</span> para saber cómo utilizamos tus
						datos personales.
					</p>
				</div>
			</div>
		</div>
	);
}
