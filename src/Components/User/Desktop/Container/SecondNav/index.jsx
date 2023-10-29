import React from "react";
import SideNav from "./SideNav";
import Navbar from "../../../../navbar/Navbar";
import { ChatBox } from "../../../../../containers/chat/chatbox";

const SecondNav = () => {
  return (
    <div>
      <Navbar text="Conversations" Conversations={true} />
      <div className="flex">
      <SideNav />
      <ChatBox />
      </div>
    </div>
  );
};

export default SecondNav;
