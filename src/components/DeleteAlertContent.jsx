import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-5 bg-black rounded-xl text-white border border-gray-800 shadow-sm">
      <p className="text-sm text-gray-400">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onDelete}
          className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition duration-200 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
