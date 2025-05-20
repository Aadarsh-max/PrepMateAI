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
    <div className="bg-[#0A081A] rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-glow border border-[#DD3EFF]/50 group">
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex items-start gap-3.5">
          <span className="text-xs md:text-[15px] font-semibold text-[#3FE1FF] leading-[18px]">
            Q
          </span>

          <h3
            className="text-xs md:text-[14px] font-medium bg-gradient-to-r from-[#3FE1FF] via-[#9378FF] to-[#DD3EFF] bg-clip-text text-transparent mr-0 md:mr-20"
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
              className="flex items-center gap-2 text-xs font-medium text-white bg-[#0A081A] px-3 py-1 mr-2 rounded border border-[#3FE1FF] hover:bg-[#3FE1FF] hover:text-[#000822] shadow-[0_0_8px_#3FE1FF] transition"
              onClick={onTogglePin}
            >
              {isPinned ? (
                <LuPinOff className="text-xs" />
              ) : (
                <LuPin className="text-xs" />
              )}
            </button>

            <button
              className="flex items-center gap-2 text-xs font-medium text-white bg-[#0A081A] px-3 py-1 mr-2 rounded border border-[#DD3EFF] hover:bg-[#DD3EFF] hover:text-[#000822] shadow-[0_0_8px_#DD3EFF] transition"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <LuSparkles />
              <span className="hidden md:block"> Learn More </span>
            </button>
          </div>

          <button
            className="text-[#3FE1FF] hover:text-[#DD3EFF] cursor-pointer transition-colors"
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
          className="mt-4 text-[#B0B0C0] bg-[#0A081A]/80 px-5 py-3 rounded-lg shadow-[0_0_8px_#3FE1FF]"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  </>
);


}

export default QuestionCard;