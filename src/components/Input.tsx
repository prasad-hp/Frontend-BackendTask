import { ChangeEvent } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type, placeholder, value, onChange }: InputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-11/12 max-w-md h-12 m-2 border rounded-md pl-2"
      />
    </div>
  );
}

export default Input;
