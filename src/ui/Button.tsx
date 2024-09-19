import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "black" | "green" | "white" | "transparent";
}

export function Button({ variant, children, className, ...props }: ButtonProps) {
  /** Estilos globales del button */
  const baseStyles = "rounded-lg border font-medium px-6";
  const disabledStyles = "disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-default";

  /** Estilos especificos segun su variaciòn */
  const variantStyles = {
    green: "bg-green-700 text-white",
    transparent: "bg-white !border-none text-slate-500 text-sm",
    black: "text-white bg-color3 hover:bg",
    white: "",
  };

  /** Asignaciòn de estilos en una variable */
  const buttonClassName = clsx(baseStyles, disabledStyles, variantStyles[variant], className);

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
