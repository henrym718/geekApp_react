import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

const Autocomplete = ({ options, onChange, onSelected, className }) => {
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); // Ninguna opción seleccionada inicialmente
	const [inputValue, setInputValue] = useState(""); // Estado para el valor del input
	const inputRef = useRef(null);

	// Manejar la navegación del teclado
	const handleKeyDown = (event) => {
		if (event.key === "ArrowUp") {
			event.preventDefault();
			if (selectedOptionIndex !== null) {
				setSelectedOptionIndex((prevIndex) => prevIndex - 1);
			}
			if (selectedOptionIndex === -1) {
				setSelectedOptionIndex(options.length - 1);
			}
		} else if (event.key === "ArrowDown") {
			setSelectedOptionIndex((prevIndex) => (prevIndex === null ? 0 : prevIndex + 1));

			if (selectedOptionIndex === options.length) {
				setSelectedOptionIndex(0);
			}
		} else if (event.key === "Enter") {
			if (selectedOptionIndex !== null) {
				const selectedOption = options[selectedOptionIndex];
				setInputValue(selectedOption.value); // Actualiza el input con la opción seleccionada
				onSelected(selectedOption.value); // Llama al callback onChange con la opción seleccionada
			}
		}
	};

	// Manejar la selección por clic del usuario
	const handleOptionClick = (index) => {
		const selectedOption = options[index];
		setInputValue(selectedOption.value); // Actualiza el input con la opción seleccionada
		onSelected(selectedOption.value);
		// setSelectedOptionIndex(index); // Actualiza el índice seleccionado
	};

	// Manejar el cambio en el input
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
		onChange(event.target.value); // Llama a onChange con el nuevo valor del input
		setSelectedOptionIndex(null); // Resetea la selección cuando se cambia el texto
	};

	const defaultStyles = {
		display: "flex",
		flexDirection: "column",
		position: "relative",
	};

	return (
		<div style={defaultStyles}>
			<Input
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				inputRef={inputRef}
				className={className}
			/>
			<Options options={options} selectedOptionIndex={selectedOptionIndex} onOptionClick={handleOptionClick} inputValue={inputValue} />
		</div>
	);
};

const Input = ({ value, onChange, onKeyDown, inputRef, className }) => {
	const defaultStyles = {
		width: "100%",
		height: "45px", // Default height
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingRight: "24px",
		paddingLeft: "12px",
		borderRadius: "10px",
		border: "1px solid #ccc",
	};

	return (
		<div style={defaultStyles}>
			<input
				className={`bg-transparent border-none w-full h-full outline-none flex-1 ${className || ''}`}
				placeholder="Busca tu servicio"
				type="text"
				value={value} // Bind del valor del input
				onChange={onChange}
				onKeyDown={onKeyDown}
				ref={inputRef}
			/>
			<FaSearch />
		</div>
	);
};

const Options = ({ options = [], selectedOptionIndex, onOptionClick, inputValue }) => {
	const highlightText = (text, query) => {
		if (!query.trim()) return text;

		const parts = text.split(new RegExp(`(${query})`, 'gi'));
		return parts.map((part, index) =>
			part.toLowerCase() === query.toLowerCase() ? (
				<span key={index}>{part}</span>
			) : (
				<span key={index} style={{ fontWeight: 'bold' }}>{part}</span>
			)
		);
	};

	return (
		<ul className="list-none p-0 m-0 absolute top-16 w-full bg-white rounded-md drop-shadow-md -translate-y-1">
			{options.map((option, index) => (
				<div className="mx-4" key={option.id}>
					<li
						className={`px-5 py-1 cursor-pointer rounded-md hover:bg-gray-200 ${
							index === selectedOptionIndex ? "bg-gray-100" : ""
						}`}
						onClick={() => onOptionClick(index)}
					>
						{highlightText(option.value, inputValue)}
					</li>
				</div>
			))}
		</ul>
	);
};

export default Autocomplete;


