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
import { useEffect } from "react";

import { Client, Account } from "appwrite";

export const NewPass = () => {


  const navigate = useNavigate()
  const client = new Client();

  const account = new Account(client);

  client
    .setEndpoint(import.meta.env.VITE_REACT_APP_APPWRITE_API_URL)
    .setProject(import.meta.env.VITE_REACT_APP_APPWRITE_PROJECT_ID);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",

    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email")
        .required("L’adresse email n’est pas conforme"),



    }),
    onSubmit: async (values) => {
      const email = values.email
      const promise = account.createRecovery(email, `${import.meta.env.VITE_REACT_APP_APPWRITE_API_URL}/confirm-password`);
      promise.then(function (response) {
        alert("Check Your Email");
      }, function (error) {
        alert("Your Email Does Not Exist or Invalid")
      });
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
          <div className="flex flex-col items-center">
            <h1 className="text-3xl text-center font-bold w-1/2">
              Réinitialiser votre mot de passe
            </h1>
            <p className="text-textgray text-center text-lg py-5">
              Il vous sera demander pour vous connecter.
            </p>
          </div>

          <div className="px-5 space-y-4 mx-auto flex flex-col items-start">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col items-center space-y-3"
            >
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

            </form>
          </div>

          {/* button  */}
          <div className="flex justify-center">
            <NavBtn
              text="Valider"
              bgcolor={isFormValid() ? "#a1feda" : "#F0F2F3"}
              color={isFormValid() ? "black" : "#CDD6D7"}
              disabled={!formik.dirty || formik.isSubmitting|| !formik.isValid}
              onFunctionCalled={formik.handleSubmit}
              icon={<HiArrowNarrowRight size={25}
               />}
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
