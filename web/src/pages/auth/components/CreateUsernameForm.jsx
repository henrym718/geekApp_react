import InputLoading from "./InputLoading";
import { useFormsStore } from "../store/forms";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRef, useState } from "react";

export default function CreateUsernameForm() {
	const [error, setError] = useState(null);
	const [msgError, setMsgError] = useState("");
	const [openSpinner, setOpenSpinner] = useState(false);
	const timeoutRef = useRef();

	const { setChangeAction } = useFormsStore((state) => state);

	const handleBackForm = () => {
		setChangeAction("CREATE_ACCOUNT");
	};

	const handleOnchangeUserName = (value) => {
		setOpenSpinner(false);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		if (value.trim().length) {
			const regex = /^[a-zA-Z0-9]+$/;

			if (value.length > 3 && regex.test(value)) {
				setOpenSpinner(true);

				timeoutRef.current = setTimeout(() => {
					if (value === "henrym718") {
						setError(true);
						setMsgError("Parece que este username ya existe");
						setOpenSpinner(false);
					} else {
						setError(false);
						setOpenSpinner(false);
					}
				}, 700);
			} else {
				setError(true);
				setMsgError("Intenta usar solo caracteres alfanumericos");
				setOpenSpinner(false);
			}
		}
	};

	return (
		<div className="flex flex-col h-full mx-10 pt-5">
			<div onClick={handleBackForm} className="flex space-x-[2px] items-center pb-6 -ml-4 cursor-pointer">
				<IoIosArrowRoundBack size={25} />
				<span className="font-medium text-sm">Volver</span>
			</div>
			<p className="text-2xl font-bold pb-2">¡Estás a punto de ser parte de nosotros!</p>
			<p className="text-base text-color4">
				Agrega un nombre de usuario exclusivo para ti. Así es como te verán los demás.
			</p>
			<p className="text-sm font-medium mt-1 pb-8">No puedras cambiarlo, así que elige sabiamente.</p>
			<p className="text-base font-medium text-color1 -tracking-tight pb-[10px]">Nombre de usuario</p>
			<InputLoading
				name="userName"
				type="text"
				onChange={handleOnchangeUserName}
				error={error}
				msgError={msgError}
				openSpinner={openSpinner}
			/>
			<p className=" text-sm text-color4 -mt-3">Genera confianza usando tu nombre o el de tu empresa</p>
			<button
				className="w-full h-[42px] text-color5 bg-color3 hover:bg-zinc-700 font-medium rounded border disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-400 mt-12	"
				htmlType="submit"
				disabled={error || (!error && openSpinner) ? true : false}
				onClick={""}
			>
				Crear mi cuenta
			</button>
		</div>
	);
}
