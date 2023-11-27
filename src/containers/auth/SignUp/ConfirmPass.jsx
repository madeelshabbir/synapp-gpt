import NavBtn from "../../../Components/Button/NavBtn";
import Notes from "../../../Components/Notes/Notes";
import {
  InputWithIcon,
  InputWithCheckbox,
} from "../../../Components/InputTag/InputWithLabel";
import { HiArrowNarrowRight } from "react-icons/hi";
import Navbar from "../../../Components/navbar/Navbar";
import { ASSETS } from "../../../assets/path";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
//import { useDispatch ,useSelector} from "react-redux";
//import {forgetpassword} from '../../../redux/actions/RegisterAction'
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import { Client, Account } from "appwrite";

export const ConfirmPass = () => {
  const location = useLocation();
  const [userid,setuserid] =useState(null)
  const [secretid,setsecretid]=useState(null)

  const navigate = useNavigate()

const client = new Client();
useEffect(() => {
  // Call the function to extract userid and secretid when the component mounts
  extractUserIdAndSecretId(location.search);
}, [location.search]);

const extractUserIdAndSecretId = (search) => {
  search = search.split('&')
  const userId = search[0].split('=')[2];
  const secretId = search[1].split('=')[1]
  setuserid(userId);
  setsecretid(secretId);
};


const account = new Account(client);

client
      .setEndpoint(import.meta.env.VITE_REACT_APP_APPWRITE_API_URL)
      .setProject(import.meta.env.VITE_REACT_APP_APPWRITE_PROJECT_ID);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {

      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({

      password: Yup.string()
        .matches(/[A-Z]/, "At least one uppercase letter is required.")
        .matches(/[0-9]/, "At least one digit is required.")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "At least one special character is required."
        )
        .min(8, "Minimum 8 characters required.")
        .max(12, "Maximum 12 characters.")
        .required("Password Required"),

      confirm_password: Yup.string()
        .required("Confirm Password")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: async (values) => {
      console.log(values);

      // const form = document.getElementById("forgetpass");
      // const formData = new FormData(form);

      const password=values.password
      const password2=values.confirm_password


      alert('hi')
      const promise = account.updateRecovery(userid, secretid,password, password);

      promise.then(function (response) {
          console.log("updated",response); // Success
          localStorage.removeItem('passwordid');
          localStorage.removeItem('passworduserid');
          console.log("Password has been Changed");
          alert("Password has been Changed")
          navigate('/login')


      }, function (error) {
          console.log(error); // Failure
      });

     //dispatch_(forgetpassword(email,password,password2));

    },
  });

  const validateUpperCaseLetter = () => {
    if (formik.values.password && !/[A-Z]/.test(formik.values.password)) {
      return true;
    }
    return false; // Return undefined if validation passes
  };

  const validateSpecialCharacter = () => {
    if (
      formik.values.password &&
      !/[!@#$%^&*(),.?":{}|<>]/.test(formik.values.password)
    ) {
      return true;
    }
    return false; // Return undefined if validation passes
  };

  const validateDigits = () => {
    if (formik.values.password && !/[0-9]/.test(formik.values.password)) {
      return true;
    }
    return false; // Return undefined if validation passes
  };

  // Custom validation function to check form validity
  // Custom validation function to check form validity
  const isFormValid = () => {
    const { errors, touched, dirty, isValid } = formik;
    const isAnyFieldError = Object.keys(errors).some(
      (fieldName) => touched[fieldName]
    );

    return (
      (isValid && !isAnyFieldError) ||
      (!dirty && Object.keys(touched).length === 0)
    );
  };
  return (
    <div className="h-screen overflow-hidden">
      <Navbar signup={true} />
      <div className="flex">
        <div className="flex flex-col  space-y-8 w-1/2 py-10">
          {/* heading and discription  */}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl text-center font-bold w-1/2">
              Réinitialiser votre mot de passe
            </h1>
            <p className="text-textgray text-center text-lg py-5">
              Il vous sera demander pour vous connecter.
            </p>
            {/* <p className="text-textgray text-center text-lg py-5">

            </p> */}
            {/* {error && <p className="text-textgray text-center text-lg py-5 style={{ color: 'red' }}">{error.non_field_errors}</p>} */}

          </div>

          {/* form  */}
          <div className="px-5 space-y-4 mx-auto flex flex-col items-start">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col items-center space-y-3"
            >

              <InputWithIcon
                type="password"
                placeholder="Nouveau mot de passe"
                icon={true}
                pass={true}
                name="password"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.password}
                errors={formik?.errors?.password}
                touched={formik?.touched?.password}
              />
              <InputWithIcon
                type="password"
                placeholder="Confirmez votre mot de passe"
                icon={true}
                pass={true}
                name="confirm_password"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.confirm_password}
                errors={formik?.errors?.confirm_password}
                touched={formik?.touched?.confirm_password}
              />

            </form>

            {/* checkbox  */}
            <div className="flex flex-col text-sm">
              <InputWithCheckbox
                SignUpDefault={true}
                label="Au moins 8 caractères"
                validate={formik.values.password.length < 8}
                touched={formik.values.password.length > 1}
              />

              <InputWithCheckbox
                SignUpDefault={true}
                label="1 lettre en majuscule"
                validate={validateUpperCaseLetter()}
                touched={formik?.values?.password.length > 1}
              />
              <InputWithCheckbox
                SignUpDefault={true}
                label="1 chiffre"
                validate={validateDigits()}
                touched={formik.values.password.length > 1}
              />
              <InputWithCheckbox
                SignUpDefault={true}
                label="1 caractère spécial"
                validate={validateSpecialCharacter()}
                touched={formik.values.password.length > 1}
              />
            </div>
          </div>

          {/* button  */}
          <div className="flex justify-center">
            {/* <NavLink
               to="/login"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-aqua rounded-xl" : ""
              }
            > */}
              <NavBtn
                text="Valider"
                bgcolor="#F0F2F3"
                color="#CDD6D7"
              onFunctionCalled={formik.handleSubmit}
                icon={<HiArrowNarrowRight size={25} />}
              />

          </div>
        </div>

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
