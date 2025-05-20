import React from "react";

const SkeletonLoader = () => {
  return (
    <div role="status" className="animate-pulse space-y-6 max-w-3xl mx-auto p-4">
      {/* Section Header */}
      <div className="h-6 bg-[#1E1B34] rounded-md w-1/2" />

      {/* Paragraph */}
      <div className="space-y-2">
        <div className="h-3 bg-[#1E1B34] rounded w-full"></div>
        <div className="h-3 bg-[#1E1B34] rounded w-11/12"></div>
        <div className="h-3 bg-[#1E1B34] rounded w-10/12"></div>
        <div className="h-3 bg-[#1E1B34] rounded w-9/12"></div>
      </div>

      {/* Card / Block */}
      <div className="bg-[#1A1830] rounded-md p-4 space-y-2">
        <div className="h-2.5 bg-[#2A273F] rounded w-3/4"></div>
        <div className="h-2.5 bg-[#2A273F] rounded w-2/3"></div>
        <div className="h-2.5 bg-[#2A273F] rounded w-1/2"></div>
      </div>

      {/* Another Section */}
      <div className="h-4 bg-[#1E1B34] rounded-md w-1/2 mt-10" />
      <div className="space-y-2">
        <div className="h-3 bg-[#1E1B34] rounded w-full"></div>
        <div className="h-3 bg-[#1E1B34] rounded w-11/12"></div>
        <div className="h-3 bg-[#1E1B34] rounded w-10/12"></div>
        <div className="h-3 bg-[#1E1B34] rounded w-9/12"></div>
      </div>

      {/* Reuse Card Style */}
      <div className="bg-[#1A1830] rounded-md p-4 space-y-2">
        <div className="h-2.5 bg-[#2A273F] rounded w-3/4"></div>
        <div className="h-2.5 bg-[#2A273F] rounded w-2/3"></div>
      </div>

      {/* Final Section */}
      <div className="h-4 bg-[#1E1B34] rounded-md w-1/2 mt-8" />
      <div className="space-y-2">
        <div className="h-3 bg-[#1E1B34] rounded w-full"></div>
        <div className="h-3 bg-[#1E1B34] rounded w-11/12"></div>
        <div className="h-3 bg-[#1E1B34] rounded w-10/12"></div>
        <div className="h-3 bg-[#1E1B34] rounded w-9/12"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
