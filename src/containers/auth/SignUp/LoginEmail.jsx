import NavBtn from "../../../Components/Button/NavBtn";
import Notes from "../../../Components/Notes/Notes";
import { InputWithIcon } from "../../../Components/InputTag/InputWithLabel";
import Navbar from "../../../Components/navbar/Navbar";
import { ASSETS } from "../../../assets/path";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import React, { useEffect } from "react";

import { useAuth } from '../../../utils/AuthContext'

export const LoginEmail = () => {
  const navigate = useNavigate();
  const {error,user, loginUser} = useAuth();

  useEffect(() => {
    if (user){
      if (user.email == "admin@example.com" )
      {
        navigate('/sourcesmodels')
      }
      else  if (user.email == "admin_sacha@example.com" )
      {
        navigate('/sourcesmodels')
      }
      else  if (user.email == "admin@synapp-messaging.com" )
      {
        navigate('/sourcesmodels')
      }
      else{
        console.log("user dat",user.email)
        navigate('/chat')
      }
    }
  },[user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email")
        .required("L’adresse email n’est pas conforme"),
      password: Yup.string().required("Password Required"),
    }),
    onSubmit: async (values) => {
      const email = values.email;
      const password = values.password
      const userInfo = { email,password}
      loginUser(userInfo)
    },
  });

  return (
    <div className="h-screen overflow-hidden">
      <Navbar signup={true} />
      <div className="flex">
        <form onSubmit={formik.handleSubmit} className="w-1/2 py-20 pt-20">
          <div className="flex justify-center items-center">
            <img src={ASSETS.EMOJI.HANDS} className="h-10 w-10" />
          </div>

          <h1 className="text-3xl text-center font-bold">
            Ravi de vous revoir !
          </h1>
          {error && <p className="text-3xl text-center style={{ color: 'red' }}">{error}</p>}

          {/* form  */}
          <div className="flex flex-col gap-5 pt-6 items-center">
            <InputWithIcon
              type="email"
              placeholder="Adresse email"
              icon={true}
              name="email"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.email}
              errors={formik?.errors?.email}
              touched={formik?.touched?.email}
            />
            <InputWithIcon
              type="password"
              placeholder="Mot de passe"
              icon={false}
              pass={true}
              name="password"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.password}
              errors={formik?.errors?.password}
              touched={formik?.touched?.password}
            />
            <div className="flex justify-end w-[400px]">
              <NavLink
                to="/newpass"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "bg-aqua rounded-xl" : ""
                }
              >
                <span className="text-xs text-textgray">
                  Mot de passe oublié
                </span>
              </NavLink>
            </div>
          </div>

          {/* button  */}
          <div className="flex justify-center py-10">
            <NavBtn text="Je me connecte" bgcolor="#A1FEDA" type="submit" />
          </div>
        </form>
        {/* image  */}
        <div className="w-1/2">
          <Notes
            image={ASSETS.PROFILES.SIGN_UP}
            bgColor="#EDFAFA"
            notebgColor="#DCF5F5"
            color="#004A54"
            text="La seule messagerie instantanée conçue par et pour les professionnels de santé"
          />
        </div>
      </div>
    </div>
  );
};
