import React from "react";
import { Trash2 } from "lucide-react";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-black border border-white/20 rounded-lg p-4 cursor-pointer hover:border-white/40 relative group transition-all duration-200"
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-white rounded-md flex items-center justify-center mr-3">
            <span className="text-sm font-bold text-black">GU</span>
          </div>

          <div className="flex-grow">
            <h2 className="text-base font-semibold text-white">{role}</h2>
            <p className="text-sm text-gray-400 mt-1">{topicsToFocus}</p>
          </div>
        </div>

        <button
          className="opacity-0 group-hover:opacity-100 p-2 bg-red-600 hover:bg-red-700 rounded-md transition-all duration-200 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 size={14} className="text-white" />
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs px-2 py-1 border border-white/20 rounded text-white bg-white/5">
            {experience} {experience === 1 ? "Year" : "Years"}
          </span>
          <span className="text-xs px-2 py-1 border border-white/20 rounded text-gray-400 bg-white/5">
            {questions} Q&A
          </span>
        </div>
        
        <div className="text-xs text-gray-500">
          Last Updated: {lastUpdated}
        </div>
      </div>

      <p className="text-sm text-gray-300 mt-3 line-clamp-2">
        {description}
      </p>
    </div>
  );
};

export default SummaryCard;