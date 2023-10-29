import NavBtn from "../../Components/Button/NavBtn";
import { ASSETS } from "../../assets/path";

export const Subscribed = ({}) => {
  return (
    <div>
      <div className=" flex justify-center m-5">
        <img src={ASSETS.PROFILES.ROBO} className="h-10 w-10" />
      </div>
      <p className="text-sm text-textgray">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
      <div className="flex gap-5 justify-center p-10 text-black">
        <NavBtn text="Inscription" bgcolor="#A1FEDA" />
        <NavBtn text="Annuler" bordercolor="black" />
      </div>
    </div>
  );
};
