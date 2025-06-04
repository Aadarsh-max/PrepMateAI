import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

const DeleteAlertContent = ({ content, onDelete, onCancel }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(true);

  // Close on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && !isDeleting) {
        handleCancel();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isDeleting]);

  const handleDelete = async () => {
    setIsDeleting(true);
    console.log("Deleting...");

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setVisible(false);
    onDelete();
  };

  const handleCancel = () => {
    if (isDeleting) return;
    setVisible(false);
    onCancel && onCancel();
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={handleCancel}
      ></div>

      {/* Modal */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-alert-title"
        aria-describedby="delete-alert-desc"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="p-6 bg-black rounded-lg text-white border border-red-500/30 shadow-lg max-w-md w-full animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <div className="flex-1">
              <h3
                id="delete-alert-title"
                className="text-lg font-semibold text-white"
              >
                Confirm Deletion
              </h3>
              <p id="delete-alert-desc" className="text-sm text-gray-400">
                This action cannot be undone
              </p>
            </div>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isDeleting}
              aria-label="Close"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-sm text-gray-300 mb-6 leading-relaxed">{content}</p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isDeleting}
              className="px-4 py-2 rounded-md text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isDeleting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 cursor-pointer"
              } text-white flex items-center gap-2 transition-all duration-200 shadow-md shadow-red-600/30`}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Deleting...
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
      </div>

      {/* Tailwind animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

DeleteAlertContent.propTypes = {
  content: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default DeleteAlertContent;
