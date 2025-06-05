import React from "react";

const SkeletonLoader = () => {
  return (
  <div
    role="status"
    className="animate-pulse space-y-6 max-w-3xl mx-auto p-4"
  >
    {/* Section Header */}
    <div className="h-6 bg-gray-300 rounded-md w-1/2" />

    {/* Paragraph */}
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-11/12"></div>
      <div className="h-3 bg-gray-200 rounded w-10/12"></div>
      <div className="h-3 bg-gray-200 rounded w-9/12"></div>
    </div>

    {/* Card / Block */}
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2 shadow-sm hover:shadow-md shadow-gray-200 transition">
      <div className="h-2.5 bg-gray-200 rounded w-3/4"></div>
      <div className="h-2.5 bg-gray-200 rounded w-2/3"></div>
      <div className="h-2.5 bg-gray-200 rounded w-1/2"></div>
    </div>

    {/* Another Section */}
    <div className="h-4 bg-gray-300 rounded-md w-1/2 mt-10" />
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-11/12"></div>
      <div className="h-3 bg-gray-200 rounded w-10/12"></div>
      <div className="h-3 bg-gray-200 rounded w-9/12"></div>
    </div>

    {/* Reuse Card Style */}
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2 shadow-sm hover:shadow-md shadow-gray-200 transition">
      <div className="h-2.5 bg-gray-200 rounded w-3/4"></div>
      <div className="h-2.5 bg-gray-200 rounded w-2/3"></div>
    </div>

    {/* Final Section */}
    <div className="h-4 bg-gray-300 rounded-md w-1/2 mt-8" />
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-11/12"></div>
      <div className="h-3 bg-gray-200 rounded w-10/12"></div>
      <div className="h-3 bg-gray-200 rounded w-9/12"></div>
    </div>
  </div>
);

};

export default SkeletonLoader;
