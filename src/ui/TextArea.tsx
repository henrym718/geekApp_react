import { clsx } from "clsx";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant: "default";
}

export default function TextArea({ variant, rows, className, ...props }: TextAreaProps) {
  const baseStyles = "w-full border rounded-lg px-2 py-2";

  const variantStyles: Record<string, string> = {
    default: "border-black border-opacity-15 ",
  };

  const textAreaClasName = clsx(baseStyles, variantStyles[variant], className);

  return <textarea className={textAreaClasName} rows={6} {...props} />;
}
