import React from "react";
import { ASSETS } from "../../../../../assets/path";
import { ChatText } from "../../../../Text/Text";
import { BsThreeDots } from "react-icons/bs";

const ChatList = () => {
  return (
    <div
      className={`${
        ChatText?.length > 4 ? "overflow-y-scroll" : ""
      } rounded-lg mx-5 flex flex-col gap-3 p-2`}
    >
      {ChatText?.map((item, index) => (
        <div className={` ${item?.bg ? "bg-chatBg" : "bg-white "} rounded-lg`}>
          <div key={index} className="py-2 flex gap-2">
            {/* image  */}
            <div className="rounded-full overflow-hidden w-8 h-8 flex justify-center m-2">
              <img src={ASSETS.PROFILES.PROFILE_IMG4} />
              <div className="rounded-full bg-circleGreen w-2 h-2 -bottom-1 right-0 absolute"></div>
            </div>

            {/* name and text  */}
            <div className="p-1">
              <h1 className="text-xs">{item?.name}</h1>
              <p className="text-[10px] text-textgray">{item?.text}</p>
            </div>

            {/* time and dots  */}
            <div className="flex flex-col justify-between pr-1">
              <div className="text-[8px] text-textgray"> 12:20 </div>
              {!item?.bg && (
                <div className="rounded-full w-3 flex justify-center text-[8px] text-white bg-alertPink">
                  2
                </div>
              )}
              <span className="flex justify-center">
                <BsThreeDots />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
