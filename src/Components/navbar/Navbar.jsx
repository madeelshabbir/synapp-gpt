import React from "react";
import { ASSETS } from "../../assets/path";
import { BsChatDots, BsInfoCircle } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { BiSun } from "react-icons/bi";
import { TbBellRinging } from "react-icons/tb";
import NavBtn from "../Button/NavBtn";
import { AiOutlineUser } from "react-icons/ai";
import Search from "../search/Search";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Navbar = ({
  signup,
  Conversations,
  text,
  onOpenFaqs,
  onOpenUserProfile,
  onOpenModal,
  onOpenAbout,
}) => {
  const access_token = localStorage.getItem('access_token');
  const username = localStorage.getItem('username');



  const navigate = useNavigate();


  const handleClick = () => {
    navigate('/')
  };

  return (
    <div
      className={`${signup
          ? "flex justify-between md:px-4 lg:p-5"
          : "flex justify-between px-4 lg:px-8 py-5"
        } bg-bgCremo items-center`}
    >
      {/* logo  */}
      <div onClick={handleClick}>

        <img src={ASSETS.LOGO} className="h-4 sm:h-5 md:h-6 lg:h-8" />

      </div>

      {!signup && (
        <>
          {/* coversation/comunities  */}
          <div className="flex gap-10">
            <div className="text-navElement text-xs flex gap-2 font-bold items-center underline">
            {username == "admin@synapp-messaging.com"  || username == "admin@example.com"  || username == "admin_sacha@example.com" ? (
              null
            
                ) :  (
                  <span>
                  <BsChatDots className="font-extrabold text-sm sm:text-normal md:text-base" />
                </span>
                )}




              {text}
            </div>
            <div className="text-navElement flex gap-2 font-bold text-xs">
              {Conversations && (
                <>
                  <img
                    src={ASSETS.DESKTOP.COMMUNITY}
                    className="h-4 w-4 mt-1"
                  />
                  Communautés
                  <div className="rounded-full w-5 h-5 mt-1 flex justify-center text-xs text-white bg-alertPink">
                    2
                  </div>
                </>
              )}
            </div>
          </div>

          {/* searchbar  */}
          <div>
          {username == "admin@synapp-messaging.com"  || username == "admin@example.com"  || username == "admin_sacha@example.com" ? (
              null
            
                ) :  (
                  <Search></Search>
                )}

            
          </div>

          {/* icons  */}
          {Conversations && (

            <div className="flex gap-8">
              <div className="rounded-full h-6 w-6 bg-sunBg p-1">
                <BiSun size={18} />
              </div>

              <span className="text-navElement flex gap-1 justify-center">
                <TbBellRinging className="mt-1" size={20} />
                <div className="rounded-full w-5 h-5 mt-1 flex justify-center text-xs text-white bg-alertPink">
                  2
                </div>
              </span>
            </div>
          )}
          {!Conversations && (
            <div className="flex space-x-2 lg:space-x-3 items-center">
              <span>
                <BsInfoCircle
                  className="cursor-pointer text-normal sm:text-lg md:text-xl lg:text-2xl xl:text-[1.7rem]"
                  onClick={onOpenAbout}
                />
              </span>
              <span>

                <AiOutlineUser
                  className="cursor-pointer text-normal sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                  onClick={onOpenModal}
                />
              </span>
            </div>
          )}
        </>
      )}
      {/* nav button  */}
      {/* {signup && (
        <div className="flex gap-5">
          <div>
            <NavBtn text="Se connecter" bgcolor="#004A54" color="white" />
          </div>
          <div>
            <NavBtn text="S’inscrire" bgcolor="#A1FEDA" />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Navbar;
