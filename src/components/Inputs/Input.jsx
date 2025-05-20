import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-[13px] font-medium text-[#B0B0C0] mb-1">
          {label}
        </label>
      )}

      <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-md border border-[#3FE1FF] bg-[#0A081A] shadow-md transition focus-within:ring-1 focus-within:ring-[#DD3EFF]">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full text-sm bg-transparent text-white placeholder:text-[#666c7a] focus:outline-none"
        />

        {isPassword &&
          (showPassword ? (
            <FaRegEye
              size={18}
              className="text-[#3FE1FF] cursor-pointer transition hover:text-[#DD3EFF]"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaRegEyeSlash
              size={18}
              className="text-[#9378FF] cursor-pointer transition hover:text-[#DD3EFF]"
              onClick={() => setShowPassword(true)}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
