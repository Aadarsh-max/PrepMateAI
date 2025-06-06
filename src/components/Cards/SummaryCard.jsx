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
  showDeleteOnMobile = false, 
}) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md shadow-gray-200 transition-all duration-200 group ${colors}`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-md flex items-center justify-center mr-3">
            <span className="text-sm font-bold text-gray-900">GU</span>
          </div>

          <div className="flex-grow">
            <h2 className="text-base font-semibold text-gray-900">{role}</h2>
            <p className="text-sm text-gray-700 mt-1">{topicsToFocus}</p>
          </div>
        </div>

        <button
          className={`p-2 bg-red-600 hover:bg-red-700 rounded-md transition-all duration-200 cursor-pointer
          ${showDeleteOnMobile ? "block" : "hidden md:block group-hover:block"}`}
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
          <span className="text-xs px-2 py-1 border border-gray-200 rounded text-gray-700 bg-gray-50">
            {experience} {experience === 1 ? "Year" : "Years"}
          </span>
          <span className="text-xs px-2 py-1 border border-gray-200 rounded text-gray-500 bg-gray-50">
            {questions} Q&A
          </span>
        </div>

        <div className="text-xs text-gray-500">
          Last Updated: {lastUpdated}
        </div>
      </div>

      <p className="text-sm text-gray-700 mt-3 line-clamp-2">
        {description}
      </p>
    </div>
  );
};

export default SummaryCard;
