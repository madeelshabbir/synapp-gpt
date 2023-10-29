import React from "react";
import { NavLink } from "react-router-dom";
import NavBtn from "../../Button/NavBtn";

const BottomDiv = () => {
  return (
    <div className="border-2 border-inputBg rounded-2xl">
      <p className="text-sm text-textgray">
        Bonjour, je suis SynApp GPT, j’ai référencé toutes les publications de
        la HAS. Pose-moi n'importe quelle question, et j'y répondrai au mieux.
      </p>
      <div className="flex justify-end p-2">
        <NavLink
          to="/home"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-aqua rounded-xl" : ""
          }
        >
          <NavBtn text="Envoyer" bgcolor="#A1FEDA" />
        </NavLink>
      </div>
    </div>
  );
};

export default BottomDiv;
