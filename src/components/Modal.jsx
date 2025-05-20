import React from "react";

const Modal = ({children, isOpen, onClose, title, hideHeader}) =>{

    if(!isOpen) return null;

      return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
      {/* Modal Content */}
      <div
        className="relative flex flex-col bg-[#0A081A] shadow-2xl rounded-lg overflow-hidden max-w-lg w-full"
      >
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-[#3FE1FF]/30">
            <h3 className="md:text-lg font-medium text-white">{title}</h3>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="text-[#B0B0C0] bg-transparent hover:bg-[#0DC6FF]/20 hover:text-[#3FE1FF] rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
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

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 text-[#B0B0C0]">
          {children}
        </div>
      </div>
    </div>
  );

};

export default Modal