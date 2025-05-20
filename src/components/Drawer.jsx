import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({
    isOpen,
    onClose,
    title,
    children
}) => {
     return (
    <div
      className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] p-4 overflow-y-auto transition-transform bg-[#0A081A] w-full md:w-[40vw] shadow-2xl shadow-[#3FE1FF]/20 border-r border-[#0A081A] ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      <div className="flex items-center justify-between mb-4">
        <h5
          id="drawer-right-label"
          className="flex items-center text-base font-semibold text-[#FFFFFF]"
        >
          {title}
        </h5>

        <button
          type="button"
          onClick={onClose}
          className="text-[#B0B0C0] bg-transparent hover:bg-[#0DC6FF]/20 hover:text-[#3FE1FF] rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center transition-colors duration-200"
          aria-label="Close drawer"
        >
          <LuX className="text-lg" />
        </button>
      </div>
      <div className="text-sm mx-3 mb-6 text-[#B0B0C0]">{children}</div>
    </div>
  );

};

export default Drawer;