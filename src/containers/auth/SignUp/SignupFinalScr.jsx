import NavBtn from "../../../Components/Button/NavBtn";
import Notes from "../../../Components/Notes/Notes";
import { HiArrowNarrowRight } from "react-icons/hi";
import Navbar from "../../../Components/navbar/Navbar";
import { ASSETS } from "../../../assets/path";
import { NavLink } from "react-router-dom";

export const SignUpFinalScr = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar signup={true} />
      <div className="flex">
        <div className="w-1/2 pb-20 pt-20">
          {/* heading and description  */}
          <div className="flex flex-col items-center space-y-8">
            <div className="flex justify-center items-center">
              <img src={ASSETS.EMOJI.HANDS} className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold w-5/12 text-center">
              Merci, votre compte a bien été créé !
            </h1>
            <p className="text-textgray text-center text-lg w-5/12">
              Tout l’équipe SynApp GPT vous souhaite la bienvenue !
            </p>
          </div>

          {/* button  */}
          <div className="flex justify-center py-8">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-aqua rounded-xl" : ""
              }
            >
              <NavBtn
                text="C’est parti"
                bgcolor="#A1FEDA"
                icon={<HiArrowNarrowRight size={25} />}
              />
            </NavLink>
          </div>
        </div>
        {/* image  */}
        <div className="w-1/2">
          <Notes
            image={ASSETS.PROFILES.SIGNUP_DONE}
            bgColor="#FDF4F3"
            notebgColor="#FBE9E8"
            color="#004A54"
            text="Une architecture sécurisée : échanges cryptés, serveurs Français"
          />
        </div>
      </div>
    </div>
  );
};
