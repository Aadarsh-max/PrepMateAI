import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
    question,
    answer,
    onLearnMore,
    isPinned,
    onTogglePin
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        if(isExpanded) {
            const contentHeight = contentRef.current.scrollHeight;
            setHeight(contentHeight + 10);
        }else{
            setHeight(0);
        }
    }, [isExpanded]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
return (
  <>
    <div className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-sm hover:shadow-md shadow-gray-200 group transition">
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex items-start gap-3.5">
          <span className="text-xs md:text-sm font-semibold text-gray-700 leading-[18px]">
            Q
          </span>

          <h3
            className="text-xs md:text-sm font-medium text-gray-900 mr-0 md:mr-20"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        <div className="flex items-center justify-end ml-4 relative">
          <div
            className={`flex transition-opacity ${
              isExpanded ? "md:flex" : "md:hidden group-hover:flex"
            }`}
          >
            <button
              className="flex items-center gap-2 text-xs font-medium text-black bg-white px-3 py-1 mr-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              onClick={onTogglePin}
            >
              {isPinned ? (
                <LuPinOff className="text-xs" />
              ) : (
                <LuPin className="text-xs" />
              )}
            </button>

            <button
              className="flex items-center gap-2 text-xs font-medium text-black bg-white px-3 py-1 mr-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <LuSparkles />
              <span className="hidden md:block">Learn More</span>
            </button>
          </div>

          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  </>
);



}

export default QuestionCard;