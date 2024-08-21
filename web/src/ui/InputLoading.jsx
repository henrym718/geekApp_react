import { useState, useEffect, useRef } from "react";
import { TailSpin } from "react-loader-spinner";
import { IoAlertCircleSharp } from "react-icons/io5";

export default function InputLoading({ name, type, onChange, error, msgError, openSpinner }) {
	const [textInput, setTextInput] = useState("");
	const [showError, setShowError] = useState(false);
	const inputRef = useRef();

	useEffect(() => {
		if ((error == true || error === null) && textInput.trim()) {
			setShowError(true);
		}
		if (error === false || openSpinner) {
			setShowError(false);
		}
	}, [textInput, openSpinner]);

	const handleOnchange = (e) => {
		const value = e.target.value;
		setTextInput(value);
		onChange(value);
	};

	return (
		<div className="flex flex-col">
			<div
				className={`flex border h-[42px] justify-center items-center w-full pl-3 pr-4 ${
					showError ? "border-red-500" : ""
				}`}
			>
				<input
					className="flex-1 outline-none h-full"
					ref={inputRef}
					type={type}
					value={textInput}
					name={name}
					onChange={handleOnchange}
					autoComplete="off"
				/>	

				{openSpinner ? (
					<TailSpin
						visible={true}
						height="20"
						width="20"
						color="#74767E"
						ariaLabel="tail-spin-loading"
						radius="1"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				) : null}

				{!openSpinner && showError ? <IoAlertCircleSharp size={20} color="red" /> : null}
			</div>
			{showError && <span className="text-sm text-red-500 mt-1">{msgError}</span>}
		</div>
	);
}
