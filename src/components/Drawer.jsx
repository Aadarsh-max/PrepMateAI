import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
  <div
    className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] w-full md:w-[40vw] p-4 overflow-y-auto bg-white border-l border-gray-200 transition-transform duration-300 ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
    tabIndex="-1"
    aria-labelledby="drawer-right-label"
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h5
        id="drawer-right-label"
        className="text-base font-semibold text-gray-900"
      >
        {title}
      </h5>

      <button
        type="button"
        onClick={onClose}
        className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full p-1 transition"
        aria-label="Close drawer"
      >
        <LuX className="text-xl" />
      </button>
    </div>

    {/* Content */}
    <div className="text-sm text-gray-700">{children}</div>
  </div>
);

};

export default Drawer;
