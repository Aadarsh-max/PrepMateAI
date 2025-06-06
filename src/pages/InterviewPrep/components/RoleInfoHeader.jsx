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
    <div className="bg-white relative text-black min-h-[220px]">
      <div className="container mx-auto px-10 md:px-0 relative z-20">
        <div className="h-[200px] flex flex-col justify-center">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2
                    className="text-3xl font-bold text-white"
                    style={{
                      background: "none",
                      WebkitBackgroundClip: "unset",
                      WebkitTextFillColor: "unset",
                    }}
                  >
                    {role}
                  </h2>
                  <p className="text-sm text-gray-300 mt-1">{topicsToFocus}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            {/** Minimal black & white tags with pointer cursor */}
            <div
              className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-black cursor-pointer select-none"
              title="Experience"
            >
              Experience: {experience} {experience === 1 ? "Year" : "Years"}
            </div>

            <div
              className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-black cursor-pointer select-none"
              title="Questions and Answers"
            >
              {questions} Q&A
            </div>

            <div
              className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-black cursor-pointer select-none"
              title="Last Updated Date"
            >
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-transparent overflow-hidden absolute top-0 right-0 pointer-events-none">
        <div
          className="w-20 h-20 rounded-full blur-[70px] opacity-10 bg-white"
          style={{ animation: "blob1 7s infinite" }}
        />
        <div
          className="w-20 h-20 rounded-full blur-[70px] opacity-10 bg-white"
          style={{ animation: "blob2 7s infinite" }}
        />
        <div
          className="w-16 h-16 rounded-full blur-[60px] opacity-5 bg-white"
          style={{ animation: "blob3 7s infinite" }}
        />
        <div
          className="w-16 h-16 rounded-full blur-[60px] opacity-5 bg-white"
          style={{ animation: "blob4 7s infinite" }}
        />
      </div>
    </div>
  );
};

export default RoleInfoHeader;
