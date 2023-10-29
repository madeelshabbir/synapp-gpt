import React from "react";
import { NavLink } from "react-router-dom";
import NavBtn from "../../Components/Button/NavBtn";
//import { useDispatch } from "react-redux";



export const SideBtn = () => {

  //const dispatch =new useDispatch()
  const handleClick = () => {
    // Perform actions on button click
   
    console.log("Button clicked");
   // dispatch(ListUserAction());
  };
  return (
    <div>
      <div className="flex flex-col gap-3 my-5">
        <NavLink
          to="/sourcesmodels"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-aqua rounded-xl" : ""
          }
        >
          <NavBtn text="Sources & Model" width="180px" />
        </NavLink>
        <NavLink
          to="/usertable"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-aqua rounded-xl" : ""
          }
         
        >
          <NavBtn text="Users" width="180px" />
        </NavLink>
     
        <NavLink
          to="/statistics"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-aqua rounded-xl" : ""
          }
        >
          <NavBtn text="Statistics" width="180px" />
        </NavLink>
      </div>
    </div>
  );
};
