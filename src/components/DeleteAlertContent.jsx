import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
    return (
        <div className="p-5 bg-[#0A081A] rounded-xl text-white">
            <p className="text-[14px] text-[#B0B0C0]">{content}</p>

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-[#3FE1FF] via-[#9378FF] to-[#DD3EFF] text-[#000822] hover:opacity-90 transition duration-200"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlertContent;
