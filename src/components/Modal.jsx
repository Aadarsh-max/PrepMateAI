import React from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50">
      {/* Modal Container */}
      <div className="relative flex flex-col bg-black text-white shadow-xl rounded-lg overflow-hidden max-w-lg w-full">
        {/* Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-base md:text-lg font-medium">{title}</h3>
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 flex justify-center items-center transition"
          aria-label="Close modal"
        >
          <svg
            className="w-3.5 h-3.5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l12 12M13 1L1 13"
            />
          </svg>
        </button>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
