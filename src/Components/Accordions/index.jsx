import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded-md">
      <button
        className="w-full px-4 py-2 bg-gray-200 flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <div
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 transform ${
            isOpen ? "rotate-0" : "rotate-0"
          }`}
        >
          {isOpen ? <FaArrowUp /> : <FaArrowDown />}
        </div>
      </button>
      {isOpen && <div className="p-4 shadow-md">{content}</div>}
    </div>
  );
};

export default Accordion;
