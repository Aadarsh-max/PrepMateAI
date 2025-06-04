import React, { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

const DeleteAlertContent = ({ content, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    console.log("Deleting...");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    onDelete();
    setIsDeleting(false);
  };

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
          onClick={handleDelete}
          disabled={isDeleting}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            isDeleting ? "bg-gray-600" : "bg-red-600 hover:bg-red-700"
          } text-white transition-all duration-200 cursor-pointer flex items-center gap-2 hover:shadow-lg hover:shadow-red-600/25`}
        >
          {isDeleting ? (
            <>
              <span className="animate-pulse">Deleting...</span>
            </>
          ) : (
            <>
              <Trash2 size={16} />
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
