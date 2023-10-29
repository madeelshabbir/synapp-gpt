import React from "react";
import { ASSETS } from "../../../../../assets/path";
import { PlaceholderImg } from "../../../../Text/Images";
import ChatList from "./ChatList";
import Button from "../../../../Button/Button";
const SideNavConversation = () => {
  return (
    <div className="bg-bgCremo w-1/5">
      {/* header button  */}

      <div className="flex justify-center">
        <Button text="Conversations" />
      </div>
      {/* search and pin icons  */}

      <div className="flex flex-col my-5 gap-3 mx-5">
        <div className="flex gap-2">
          <img className="h-8 w-8" src={ASSETS.DESKTOP.SEARCH_ICON} />
          <img className="h-8 w-8" src={ASSETS.DESKTOP.PIN_ICON} />
        </div>
        {/* profiles div  */}

        <div>
          <h1 className="pb-3 text-xs">Raccourcis contacts</h1>
          <div className="flex gap-3 items-center justify-between">
            {PlaceholderImg?.map((item, index) => (
              <div key={index} className="flex gap-2 flex-col">
                <div className="rounded-full overflow-hidden w-8 h-8 relative flex justify-center">
                  <img src={item?.img} />
                  <div className="rounded-full bg-circleGreen w-2 h-2 -bottom-1 right-0 absolute"></div>
                </div>
                <h2 className="text-[10px] text-center">{item?.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChatList />
    </div>
  );
};

export default SideNavConversation;
