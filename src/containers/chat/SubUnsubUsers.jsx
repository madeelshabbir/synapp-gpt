import React from "react";
import NavBtn from "../../Components/Button/NavBtn";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
//import {Logout} from '../../redux/actions/LoginActions'
//import { useDispatch, useSelector } from "react-redux";
import { useAuth } from '../../utils/AuthContext'
export const SubUnsubUsers = ({
  type,
  onOpenModal,
  onOpenSignUp,
  onOpenFaqs,
  onOpenAboutUs,
}) => {

  const access_token = localStorage.getItem('access_token');
  const {user, logoutUser} = useAuth()
 
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  
 
  // const navigate = useNavigate();
  const onSignOut = async () => {

    //dispatch(Logout())
    navigate("/");
    
    
  };

  return (
    <div className="flex flex-col w-3/12 space-y-2  py-4 -mt-4 pr-2">
      <div className="self-end">
        <AiOutlineClose
          className="self-end text-xs cursor-pointer"
          onClick={onOpenModal}
        />
      </div>
      {/* subscribed  */}
      {access_token != null && (
        <div className="flex flex-col space-y-2">
          <NavBtn
            text="Settings"
            width="200px"
            bgcolor="#F4F2F2"
            onFunctionCalled={onOpenSignUp}
          />
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
            // onFunctionCalled={onOpenAboutUs}
            onFunctionCalled={logoutUser}
          />

          <NavBtn
            text="Sign out"
            width="200px"
            bgcolor="#F4F2F2"
            onFunctionCalled={logoutUser}
          />
        </div>
      )}

      {/* unsubscribe  */}
      {access_token == null && (
        <div className="flex flex-col space-y-2">
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
