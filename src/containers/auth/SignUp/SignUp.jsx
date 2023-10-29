import NavBtn from "../../../Components/Button/NavBtn";
import Notes from "../../../Components/Notes/Notes";
import {
  InputWithEmoji,
  InputWithCheckbox,
} from "../../../Components/InputTag/InputWithLabel";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { ASSETS } from "../../../assets/path";
import Navbar from "../../../Components/navbar/Navbar";
import { useAuth } from '../../../utils/AuthContext'
import { Account, ID} from 'appwrite';
import { account } from "../../../appwriteConfig";

import React, { useState, useEffect } from "react";
//import { useSelector, useDispatch } from "react-redux";

export const SignUp = ({ formData, onNextStep ,onPreviousStep}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
//  const {registerUser,register} = useAuth()
  const Previous = e => {
    e.preventDefault();
    console.log("previous click")
    onPreviousStep()
  }


  const registerUser = async (userInfo) => {
   // setLoading(true)

    try{
        
      
        let response = await account.create(ID.unique(),userInfo.email, userInfo.password1,userInfo.name, {
            preferences: {
              theme: 'dark',
              language: 'en',
              notifications: true,
              profession:userInfo.profession,
              specialty:userInfo.speciality

              
            },
          })
          if (response){
            navigate("/finalscr");
          }
     
    }catch(error){
        console.error(error)
        alert("Your Account not created due to Server Issue ")
    }

    //setLoading(false)
 }

  
  
  const handleNext = () => {
   
       
      const form = document.getElementById("RegisterForm");
      const formDataa = new FormData(form);
     
    
      // Access form data
      const cgu = formDataa.get("cgu");
      const pdp = formDataa.get("pdp");

      const profession = formDataa.get("profession");
      const professionn = formDataa.get("professionn");
      const speciality = formDataa.get("speciality");
      let  cguu = formDataa.get("cgu");
      let  pdpp = formDataa.get("pdp");



      if (cguu === null || pdpp === null) {
        alert("Please select Checkbox");
        console.log("checkalert");
      }
      else{


        if (cguu=='on'){
          cguu="True"
        }
        else{
          cguu="False"
        } 
        if (pdpp=='on'){
          pdpp="True"
        }
        else{
          pdpp="False"
        } 
        formData.occupation=profession
        formData.specialty=speciality
      
        formData.cgu=cguu
        formData.pdp=pdpp
        let name =formData.full_name
        let password1= formData.password
        let password2 = formData.password2
        let email =formData.email
        const userInfo = {name, email, password1, password2,profession ,speciality}
  
        registerUser(userInfo)
      


      }
     
    
   
       
      
    
    
  };
  
  

  return (
    <div className="h-screen overflow-hidden">
      <Navbar signup={true} />
      <div className="flex">
        <div className="flex flex-col items-center justify-center w-1/2 space-y-8 pb-10">
          {/* heading and description  */}
          <div className="flex flex-col space-y-2 items-center">
            <div className="text-sm text-center text-textgray">2/3</div>
            <h1 className="text-3xl text-center font-bold w-8/12">
              Une dernière chose, dites-nous qui vous êtes
            </h1>
          </div>
          {/* form  */}
          <form className="flex flex-col space-y-4" id="RegisterForm">
            <div className="flex justify-start">
              <h2 className="font-bold text-sm">Vous exercez en tant que :</h2>
            </div>

            <InputWithEmoji
              image={ASSETS.EMOJI.FACE}
              placeholder="Profession"
              bgcolor="#E3FFF4"
              name="profession"
              type="text"

            />
        
           
            <InputWithEmoji
              image={ASSETS.EMOJI.SHOCK}
              placeholder="Spécialité"
              bgcolor="#FDF4F3"
              name="speciality"
              type="text"
            />
            <div className="flex flex-col space-y-2 ">
              <InputWithCheckbox  required ='true' name="cgu" text="J’ai lu et j’accepte les conditions générales (CGU) " />
              <InputWithCheckbox  required ='true' name="pdp" text="J’ai lu et j’accepte la Politique de confidentialité des données personnelles " />
            </div>
          </form>

          {/* checkbox  */}

          {/* line bar  */}
          <div className="bg-inputBg w-full">
            <div className="h-2 w-4/12 bg-alertPink"></div>
          </div>

          {/* button  */}
          <div className="flex justify-center">
            <div className="flex space-x-20">
              <span className="bg-inputBg rounded-xl cursor-pointer">
                <HiArrowNarrowLeft
                  //onClick={() => navigate("/signup")}
                  onClick={Previous}
                  className="mt-1 m-2"
                  size={25}
                />
              
              </span>
              {/* <button onClick={handleNext}>Next</button> */}
              {/* <NavLink
                to=""
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "bg-aqua rounded-xl" : ""
                }
              > */}
                <NavBtn
                  text="C’est terminé !"
                  bgcolor="#A1FEDA"
                  
                  onFunctionCalled={handleNext}
                  // icon={
                  //   <HiArrowNarrowRight onClick={() => ""} size={25} />
                  // }
                />
             
            </div>
          </div>
        </div>

        {/* image  */}
        <div className="w-1/2">
          <Notes
            image={ASSETS.PROFILES.SIGN_UP2}
            bgColor="#EDFAFA"
            notebgColor="#DCF5F5"
            color="#004A54"
            text="Des fonctionnalités médicales conçues sur mesure"
          />
        </div>
      </div>
    </div>
  );
};
