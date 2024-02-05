import React from "react";
import NavBtn from "../../Components/Button/NavBtn";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../utils/AuthContext'
export const SubUnsubUsers = ({
  onOpenModal,
  onOpenSignUp,
  onOpenFaqs,
  onOpenAboutUs,
}) => {

  const access_token = localStorage.getItem('access_token');
  const {user, logoutUser} = useAuth()

  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-3/12 space-y-2  py-4 -mt-4 pr-2 bg-white rounded-2xl mt-[20px]">
      <div className="self-end">
        <AiOutlineClose
          className="self-end text-xs cursor-pointer"
          onClick={onOpenModal}
        />
      </div>
      {access_token != null && (
        <div className="flex flex-col space-y-2 items-center">
          <NavBtn
            text="FAQ"
            width="200px"
            bgcolor="#F4F2F2"
            onFunctionCalled={onOpenFaqs}
          />
          <NavBtn
            text="About"
            width="200px"
            bgcolor="#F4F2F2"
            onFunctionCalled={onOpenAboutUs}
          />

          <NavBtn
            text="Sign out"
            width="200px"
            bgcolor="#F4F2F2"
            onFunctionCalled={() => logoutUser(navigate)}
          />
        </div>
      )}

      {access_token == null && (
        <div className="flex flex-col space-y-2 items-center">
          <NavBtn
            text="FAQ"
            width="200px"
            bgcolor="#F4F2F2"
            onFunctionCalled={onOpenFaqs}
          />
          <NavBtn
            text="About"
            width="200px"
            bgcolor="#F4F2F2"
            onFunctionCalled={onOpenAboutUs}
          />
          <NavBtn
            text="Sign in"
            width="200px"
            bgcolor="#F4F2F2"
            onFunctionCalled={() => navigate("/login")}
          />
          <NavBtn
            text="Register"
            width="200px"
            bgcolor="#F4F2F2"
            onFunctionCalled={() => navigate("/signup")}
          />
        </div>
      )}
    </div>
  );
};
