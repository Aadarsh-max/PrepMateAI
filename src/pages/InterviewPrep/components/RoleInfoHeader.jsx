import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white text-black sticky top-0 z-50 shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">{role}</h2>
            <p className="text-sm text-gray-600 mt-1">{topicsToFocus}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <span
              className="px-3 py-1 rounded-full bg-gray-100 text-black border cursor-default"
              title="Experience"
            >
              Experience: {experience} {experience === 1 ? "Year" : "Years"}
            </span>

            <span
              className="px-3 py-1 rounded-full bg-gray-100 text-black border cursor-default"
              title="Questions and Answers"
            >
              {questions} Q&A
            </span>

            <span
              className="px-3 py-1 rounded-full bg-gray-100 text-black border cursor-default"
              title="Last Updated"
            >
              Last Updated: {lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
