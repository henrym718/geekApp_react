import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "default";
}

export default function Input({ variant, className, ...props }: InputProps) {
  const baseStyles = "w-full border rounded-lg pl-3";

  const variantStyles: Record<string, string> = {
    default: "border-black border-opacity-15",
  };

  const inputClassName = clsx(baseStyles, variantStyles[variant], className);

  return <input className={inputClassName} autoComplete="off" {...props} />;
}
