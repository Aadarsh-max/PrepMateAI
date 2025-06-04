import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] w-full md:w-[40vw] p-4 overflow-y-auto bg-black border-l border-gray-800 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5
          id="drawer-right-label"
          className="text-base font-semibold text-white"
        >
          {title}
        </h5>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1 transition"
          aria-label="Close drawer"
        >
          <LuX className="text-xl" />
        </button>
      </div>

      {/* Content */}
      <div className="text-sm text-gray-400">{children}</div>
    </div>
  );
};

export default Drawer;
