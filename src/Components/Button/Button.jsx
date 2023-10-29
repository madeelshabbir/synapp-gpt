import { BsChatDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

const Button = ({ text, onClick }) => {
  return (
    <div onClick={onClick}>
      <div className="bg-navElement rounded-2xl p-2 flex items-center justify-between w-44 md:w-48 lg:w-52 text-xs lg:text-sm xl:text-normal">
        <div className="text-white flex gap-2  items-center">
          <span>
            <BsChatDots className="text-xs md:text-sm lg:text-normal" fill="white" />
          </span>
          <span className="whitespace-nowrap"> {text}</span>
        </div>
        <button className="bg-circleGreen rounded-full h-4 w-4 lg:w-5 lg:h-5 border-2 border-white text-navElement text-xs flex items-center justify-center ">
          <FaPlus className="text-[0.5rem] lg:text-[0.7rem]"/>
        </button>
      </div>
    </div>
  );
};

export default Button;
