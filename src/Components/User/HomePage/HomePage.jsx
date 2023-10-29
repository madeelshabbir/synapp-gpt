import React from "react";
import Button from "../../Button/Button";
import NavBtn from "../../Button/NavBtn";
import { ASSETS } from "../../../assets/path";
import AttentionNote from "../../AttentionNote/AttentionNote";
import BottomDiv from "../BottomDiv/BottomTextDiv";
import Navbar from "../../navbar/Navbar";

const HomePage = () => {
  return (
    <div className="bg-bgCremo">
      <Navbar text="0/3 messages restants" />
      <div className="flex rounded-2xl ">
        {/* sidebar  */}
        <div className="w-1/3 flex flex-col justify-between items-center bg-bgCremo p-5">
          <Button text="Nouvelle question" />
          <AttentionNote />
        </div>

        {/* chat screen  */}
        <div className="m-5 bg-white text-center rounded-3xl p-10 flex flex-col gap-32">
          <div>
            <div className=" flex justify-center m-5">
              <img src={ASSETS.PROFILES.ROBO} className="h-10 w-10" />
            </div>
            <p className="text-sm text-textgray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
            <div className="flex gap-5 justify-center p-10">
              <NavBtn text="Inscription" bgcolor="#A1FEDA" />
              <NavBtn text="Annuler" bordercolor="#053036" />
            </div>
          </div>
          <BottomDiv />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
