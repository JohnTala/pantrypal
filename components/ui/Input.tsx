import {
  InputHTMLAttributes,
} from "react";


type InputProps =
  InputHTMLAttributes<HTMLInputElement>;


export default function Input({
  className = "",
  ...props
}: InputProps) {

  return (
    <input
      className={`w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 ${className}`}
      {...props}
    />
  );
}