import { useRef, useState } from "react";
import { useFormsStore } from "../store/forms";
import { IoIosArrowRoundBack } from "react-icons/io";
import InputLOading from "./InputLoading";
import InputPassword from "./InputPassword";

export default function CreateAccountForm() {
	const [error, setError] = useState(null);
	const [msgError, setMsgError] = useState("");
	const [openSpinner, setOpenSpinner] = useState(false);
	const [disabledButton, setDisabledButton] = useState(true);	
	const timeoutRef = useRef();
	const setChangeAction = useFormsStore((state) => state.setChangeAction);

	const handleBackForm = () => {
		setChangeAction("LOGIN");
	};
	const handleNextForm = ()=>{
		setChangeAction("CREATE_USERNAME");
	}

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
				}, 800);
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
		<div className="flex flex-col relative h-full mx-10 pt-5">
			<div onClick={handleBackForm} className="header flex space-x-[2px] items-center pb-6 -ml-4 cursor-pointer">
				<IoIosArrowRoundBack size={25} />
				<span className="font-medium text-sm">Volver</span>
			</div>
			<div className="flex-grow">
				<p className="text-2xl font-bold pb-8">Continuar con tu correo electrónico</p>
				<p className="text-base font-medium text-color1 -tracking-tight pb-[10px]">Email</p>
				<InputLOading
					name="email"
					type="text"
					onChange={handleOnchangeEmail}
					error={error}
					msgError={msgError}
					openSpinner={openSpinner}
				/>
				<p className="text-base font-medium text-color1 -tracking-tight pb-[10px]">Contraseña</p>
				<InputPassword onChange={handleOnchangePassword} setDisabledButton={setDisabledButton} showCheck={error} />
				<button
					className="w-full h-[42px] text-color5 bg-color3 hover:bg-zinc-700 font-medium rounded border disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-400 mt-12	"
					htmlType="submit"
					disabled={!disabledButton && !error ? false : true}
					onClick={handleNextForm}
				>
					Continuar
				</button>
			</div>
			<div className=" pb-6">
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
