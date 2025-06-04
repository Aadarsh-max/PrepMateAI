import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-[13px] font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}

      <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-md border border-white/10 bg-black shadow-sm transition focus-within:ring-1 focus-within:ring-white/20">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full text-sm bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
        />

        {isPassword &&
          (showPassword ? (
            <FaRegEye
              size={18}
              className="text-white cursor-pointer transition hover:text-gray-300"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaRegEyeSlash
              size={18}
              className="text-white cursor-pointer transition hover:text-gray-300"
              onClick={() => setShowPassword(true)}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
