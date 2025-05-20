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
    className="bg-[#0A081A] border border-[#2c2f3f] rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-lg relative group transition-shadow duration-300"
    onClick={onSelect}
  >
    <div
      className="rounded-lg p-4 relative bg-[#111827]" // Tailwind's slate-900 feel
    >
      <div className="flex items-start">
        <div
          className="flex-shrink-0 w-12 h-12 bg-[#1E293B] rounded-md flex items-center justify-center mr-4"
        >
          <span className="text-lg font-semibold text-[#60A5FA]">GU</span>
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[17px] font-medium text-white">{role}</h2>
              <p className="text-xs font-medium text-[#94A3B8]">{topicsToFocus}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        className="hidden group-hover:flex items-center gap-2 text-xs font-medium bg-[#1E293B] px-3 py-1 rounded border border-[#64748B] text-[#cbd5e1] absolute top-0 right-0 transition"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#60A5FA';
          e.currentTarget.style.color = '#000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#1E293B';
          e.currentTarget.style.color = '#cbd5e1';
        }}
      >
        delete
      </button>
    </div>

    <div className="px-3 pb-3">
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <div className="text-[10px] font-medium px-3 py-1 border rounded-full text-[#60A5FA] border-[#60A5FA] bg-[#1E293B]">
          Experience: {experience} {experience === 1 ? "Year" : "Years"}
        </div>
        <div className="text-[10px] font-medium px-3 py-1 border rounded-full text-[#94A3B8] border-[#475569] bg-[#1E293B]">
          {questions} Q&A
        </div>
        <div className="text-[10px] font-medium px-3 py-1 border rounded-full text-[#60A5FA] border-[#60A5FA] bg-[#1E293B]">
          Last Updated: {lastUpdated}
        </div>
      </div>

      <p className="text-[12px] font-medium line-clamp-2 mt-3 text-[#94A3B8]">
        {description}
      </p>
    </div>
  </div>
);


};

export default SummaryCard;