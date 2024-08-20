import TextField from "@mui/material/TextField";

export default function Input({ label, onChange, value }) {
	return (
		<TextField
			label={label}
			onChange={onChange}
			variant="outlined"
			value={value}
			sx={{
				width: "100%",
				

				// Estilos para el label
				"& .MuiInputLabel-root": {
					color: "gray", // Color del label siempre negro
				},

				// Estilos para el input
				"& .MuiOutlinedInput-root": {
					height: "45px",
					borderColor: value ? "black" : "gray", // Borde negro cuando hay valor, gris cuando está vacío
					"&:hover fieldset": {
						borderColor: "black", // Borde negro al pasar el ratón
					},
					"& input": {
						height: "100%", // Ajustar la altura del texto dentro del input
					},
					"&.Mui-focused fieldset": {
						borderColor: "black", // Borde negro al enfocar
					},
				},
				// Estilos para el label en estado de foco
				"& .MuiInputLabel-root.Mui-focused": {
					color: "black", // Color del label en estado de foco
				},
			}}
		/>
	);
}
