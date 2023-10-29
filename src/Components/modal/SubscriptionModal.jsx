import React from "react";
import { ASSETS } from "../../assets/path";
import NavBtn from "../Button/NavBtn";
import { useNavigate } from "react-router-dom";

export const SubscriptionModal = ({ type, onClick }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed left-1/3 top-1/4 rounded-xl bg-[#FAF7F2] w-1/3">
      <div className=" flex justify-center m-5">
        <img src={ASSETS.EMOJI.EYES} className="h-10 w-10" />
      </div>
      {type === 1 && (
        <p className="text-sm text-textgray text-center p-2">
          You have reached the maximum of prommpts allowed for unsubscribed
          users. Please subscribe to ask more.
        </p>
      )}
      {type === 2 && (
        <p className="text-sm text-textgray text-center p-2">
          You have reached the maximum of prompts allowed for users. If you need
          more, please contact us support@mail.com
        </p>
      )}

      {type === 1 && (
        <div className="flex gap-5 justify-center p-10">
          <NavBtn
            text="Annuler"
            bordercolor="#053036"
            onFunctionCalled={onClick}
          />
          <NavBtn
            text="Subscribe"
            bgcolor="#A1FEDA"
            onFunctionCalled={() => navigate("/signup")}

          />
        </div>
      )}
      {type === 2 && (
        <div className="flex justify-center">
          <NavBtn text="OK" bgcolor="#A1FEDA" onFunctionCalled={onClick} />
        </div>
      )}
    </div>
  );
};
