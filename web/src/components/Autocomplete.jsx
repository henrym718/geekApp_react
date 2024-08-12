import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const Autocomplete = ({ options, onChange, onSelected }) => {
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
	const [inputValue, setInputValue] = useState("");
	const [isOptionsVisible, setIsOptionsVisible] = useState(false);
	const inputRef = useRef(null);
	const containerRef = useRef(null);

	// Manejar la navegación del teclado
	const handleKeyDown = (event) => {
		if (event.key === "ArrowUp") {
			event.preventDefault();
			setSelectedOptionIndex((prevIndex) =>
				prevIndex === null ? 0 : (prevIndex - 1 + options.length) % options.length
			);
		} else if (event.key === "ArrowDown") {
			setSelectedOptionIndex((prevIndex) => (prevIndex === null ? 0 : (prevIndex + 1) % options.length));
		} else if (event.key === "Enter") {
			if (selectedOptionIndex !== null) {
				const selectedOption = options[selectedOptionIndex];
				setInputValue(selectedOption.value);
				onSelected(selectedOption.value);
				setIsOptionsVisible(false); // Ocultar opciones al presionar "Enter"
			}
		}
	};

	// Manejar la selección por clic del usuario
	const handleOptionClick = (index) => {
		const selectedOption = options[index];
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
	};

	// Estilos
	const containerStyle = {
		display: "flex",
		flexDirection: "column",
		position: "relative",
	};

	return (
		<div style={containerStyle} ref={containerRef}>
			<Input
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				onClick={handleInputClick}
				inputRef={inputRef}
			/>
			{isOptionsVisible && options.length > 0 && (
				<Options
					options={options}
					selectedOptionIndex={selectedOptionIndex}
					onOptionClick={handleOptionClick}
					inputValue={inputValue}
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
		borderRadius: "10px",
		border: "1px solid #ccc",
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
				style={inputStyle}
				placeholder="Busca tu servicio"
				type="text"
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				onClick={onClick}
				ref={inputRef}
			/>
			<FaSearch />
		</div>
	);
};

const Options = ({ options = [], selectedOptionIndex, onOptionClick, inputValue }) => {
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
		padding: 0,
		margin: 0,
		position: "absolute",
		top: "56px",
		width: "100%",
		backgroundColor: "white",
		borderRadius: "4px",
		boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
		transform: "translateY(-4px)",
	};

	const optionItemStyle = {
		padding: "8px 16px",
		cursor: "pointer",
		borderRadius: "4px",
	};

	const hoverStyle = {
		backgroundColor: "#f0f0f0",
	};

	const selectedStyle = {
		backgroundColor: "#f0f0f0",
	};

	return (
		<ul style={optionsListStyle}>
			{options.map((option, index) => (
				<li
					style={{
						...optionItemStyle,
						...(index === selectedOptionIndex ? selectedStyle : {}),
						...(index === hoveredOptionIndex ? hoverStyle : {}),
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
