import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-6 bg-black rounded-lg text-white border border-red-500/20 shadow-lg max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
          <AlertTriangle size={20} className="text-red-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Confirm Deletion</h3>
          <p className="text-sm text-gray-400">This action cannot be undone</p>
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-6 leading-relaxed">{content}</p>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onDelete}
          className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition-all duration-200 cursor-pointer flex items-center gap-2 hover:shadow-lg hover:shadow-red-600/25"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
