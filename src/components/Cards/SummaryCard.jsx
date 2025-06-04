import React from "react";

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
      className="bg-black border border-white/10 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-md relative group transition-shadow duration-300"
      onClick={onSelect}
    >
      <div className="rounded-lg p-4 relative bg-neutral-900">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-neutral-800 rounded-md flex items-center justify-center mr-4">
            <span className="text-lg font-semibold text-white">GU</span>
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[17px] font-medium text-white">{role}</h2>
                <p className="text-xs font-medium text-gray-400">
                  {topicsToFocus}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="hidden group-hover:flex items-center gap-2 text-xs font-medium bg-neutral-800 px-3 py-1 rounded border border-white/20 text-gray-200 absolute top-0 right-0 transition"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#1a1a1a";
            e.currentTarget.style.color = "#e5e5e5";
          }}
        >
          delete
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <div className="text-[10px] font-medium px-3 py-1 border rounded-full text-white border-white/20 bg-neutral-800">
            Experience: {experience} {experience === 1 ? "Year" : "Years"}
          </div>
          <div className="text-[10px] font-medium px-3 py-1 border rounded-full text-gray-400 border-white/10 bg-neutral-800">
            {questions} Q&A
          </div>
          <div className="text-[10px] font-medium px-3 py-1 border rounded-full text-white border-white/20 bg-neutral-800">
            Last Updated: {lastUpdated}
          </div>
        </div>

        <p className="text-[12px] font-medium line-clamp-2 mt-3 text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
