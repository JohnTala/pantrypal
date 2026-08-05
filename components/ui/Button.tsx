import { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700",

    secondary:
      "border border-green-600 text-green-600 hover:bg-green-50",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };


  return (
    <button
      className={`rounded-lg px-5 py-3 font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}