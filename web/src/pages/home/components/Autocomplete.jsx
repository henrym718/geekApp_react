import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import Typewriter from "typewriter-effect";

const Autocomplete = ({ options = [], onChange, onSelected, limit }) => {
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
	const [inputValue, setInputValue] = useState("");
	const [isOptionsVisible, setIsOptionsVisible] = useState(false);
	const [isPlaceholverVisible, setIsPlaceholverVisible] = useState(true);
	const inputRef = useRef(null);
	const containerRef = useRef(null);

	// Funcion para limitar las opcione
	const limitOptions = (options, limit) => {
		const ocopy = [...options];
		return limit ? ocopy.splice(0, limit) : options;
	};
	const optiosToShow = limitOptions(options, limit);

	// Manejar la navegación del teclado
	const handleKeyDown = (event) => {
		if (event.key === "ArrowUp") {
			event.preventDefault();
			setSelectedOptionIndex((prevIndex) => (prevIndex === null ? 0 : prevIndex - 1));
			if (selectedOptionIndex === -1) {
				setSelectedOptionIndex(optiosToShow.length - 1);
			}
		} else if (event.key === "ArrowDown") {
			setSelectedOptionIndex((prevIndex) => (prevIndex === null ? 0 : prevIndex + 1));
			if (selectedOptionIndex === optiosToShow.length) {
				setSelectedOptionIndex(0);
			}
		} else if (event.key === "Escape") {
			setIsOptionsVisible(false);
		} else if (event.key === "Enter") {
			if (selectedOptionIndex !== null) {
				const selectedOption = optiosToShow[selectedOptionIndex];
				setInputValue(selectedOption.value);
				onSelected(selectedOption.value);
				setIsOptionsVisible(false); // Ocultar opciones al presionar "Enter"
			} else if (inputRef.current.value.trim()) {
				onSelected(inputRef.current.value);
			}
		}
	};

	// Manejar la selección por clic del usuario
	const handleOptionClick = (index) => {
		const selectedOption = optiosToShow[index];
		setInputValue(selectedOption.value);
		onSelected(selectedOption.value);
		setIsOptionsVisible(false); // Ocultar opciones al seleccionar una opción
	};

	// Manejar el cambio en el input
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
		onChange(event.target.value);
		setSelectedOptionIndex(null);
		setIsOptionsVisible(true); // Mostrar opciones al cambiar el texto
	};

	// Manejar el clic fuera del componente para ocultar las opciones
	const handleClickOutside = (event) => {
		if (containerRef.current && !containerRef.current.contains(event.target)) {
			setIsOptionsVisible(false);
			!inputRef.current.value && setIsPlaceholverVisible(true);
		}
	};

	// Agregar y eliminar event listener para detectar clics fuera del componente
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Mostrar las opciones al hacer clic en el input
	const handleInputClick = () => {
		setIsOptionsVisible(true);
		setIsPlaceholverVisible(false);
		inputRef.current.focus();
	};

	// Estilos
	const containerStyle = {
		display: "flex",
		flexDirection: "column",
		position: "relative",
	};

	return (
		<div className="relative z-10 gap-x-24 sm:w-[450px]" style={containerStyle} ref={containerRef}>
			<div onClick={handleInputClick}>
				<Input
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					onClick={handleInputClick}
					inputRef={inputRef}
				/>

				<Placeholder isVisible={isPlaceholverVisible} />
			</div>
			{isOptionsVisible && optiosToShow.length > 0 && (
				<Options
					options={optiosToShow}
					selectedOptionIndex={selectedOptionIndex}
					onOptionClick={handleOptionClick}
					inputValue={inputValue}
					limit={limit}
				/>
			)}
		</div>
	);
};

const Input = ({ value, onChange, onKeyDown, onClick, inputRef }) => {
	// Estilos
	const inputContainerStyle = {
		width: "100%",
		height: "45px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingRight: "24px",
		paddingLeft: "12px",
		borderRadius: "8px",
		border: "1px solid #0ae98a",
		position: "relative",
	};

	const inputStyle = {
		backgroundColor: "transparent",
		border: "none",
		width: "100%",
		height: "100%",
		outline: "none",
		flex: 1,
	};

	return (
		<div style={inputContainerStyle}>
			<input
				className="text-gray-300"
				style={inputStyle}
				type="text"
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				onClick={onClick}
				ref={inputRef}
			/>
			<FaSearch className="text-color6" />
		</div>
	);
};

const Placeholder = ({ isVisible }) => {
	return (
		<div
			className="absolute top-[-1px] left-0 m-3 text-gray-200 opacity-75"
			style={{ visibility: isVisible ? "visible" : "hidden" }}
		>
			<Typewriter
				options={{
					strings: ["Editar un video", "Organizar un evento", "Pintar tu habitaciòn", "Clases de Ingles"],
					autoStart: true,
					loop: true,
					delay: 100,
					cursor: "|",
					deleteSpeed: 50,
				}}
			/>
		</div>
	);
};

const Options = ({ options, selectedOptionIndex, onOptionClick, inputValue }) => {
	const [hoveredOptionIndex, setHoveredOptionIndex] = useState(null);

	// Función para resaltar texto
	const highlightText = (text, query) => {
		if (!query.trim()) return text;
		const parts = text.split(new RegExp(`(${query})`, "gi"));
		return parts.map((part, index) =>
			part.toLowerCase() === query.toLowerCase() ? (
				<span key={index}>{part}</span>
			) : (
				<span key={index} style={{ fontWeight: "bold" }}>
					{part}
				</span>
			)
		);
	};

	// Estilos
	const optionsListStyle = {
		listStyleType: "none",
		padding: 6,
		margin: 0,
		position: "absolute",
		top: "58px",
		width: "100%",
		backgroundColor: "#fcfcfd",
		borderRadius: "10px",
		boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
		transform: "translateY(-4px)",
		color: "black",
	};

	const optionItemStyle = {
		padding: "8px 16px",
		cursor: "pointer",
		borderRadius: "4px",
	};

	const hoverStyle = {
		backgroundColor: "#e1e3e5",
	};

	const selectedStyle = {
		backgroundColor: "#e1e3e5",
	};

	return (
		<ul style={optionsListStyle}>
			{options.map((option, index) => (
				<li
					style={{
						...optionItemStyle,
						...(index === selectedOptionIndex && selectedStyle ),
						...(index === hoveredOptionIndex && hoverStyle ),
					}}
					key={option.id}
					onClick={() => onOptionClick(index)}
					onMouseEnter={() => setHoveredOptionIndex(index)}
					onMouseLeave={() => setHoveredOptionIndex(null)}
				>
					{highlightText(option.value, inputValue)}
				</li>
			))}
		</ul>
	);
};

export default Autocomplete;
