import NavBtn from "../../../Components/Button/NavBtn";
import Notes from "../../../Components/Notes/Notes";
import {
  InputWithIcon,
  InputWithCheckbox,
} from "../../../Components/InputTag/InputWithLabel";
import Navbar from "../../../Components/navbar/Navbar";
import { ASSETS } from "../../../assets/path";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import React, { useRef } from "react";

export const SignUpDefault = ({ formData, onNextStep }) => {
  const inputRef = useRef("");

  const handleNext = () => {
    const form = document.getElementById("myform");
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    formData.email=email
    formData.password=password
    const fullName = email.split("@")[0];
    formData.full_name=fullName;
    onNextStep(formData);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email")
        .required("L’adresse email n’est pas conforme"),
      password: Yup.string()
        .matches(/[A-Z]/, "At least one uppercase letter is required.")
        .matches(/[0-9]/, "At least one digit is required.")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "At least one special character is required."
        )
        .min(8, "Minimum 8 characters required.")
        .required("Password Required"),

      confirm_password: Yup.string()
        .required("Confirm Password")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: async (values) => {
      const email = values.email;
      const password = values.password;
      handleNext()
    },
  });

  const validateUpperCaseLetter = () => {
    if (formik.values.password && !/[A-Z]/.test(formik.values.password)) {
      return true;
    }
    return false;
  };

  const validateSpecialCharacter = () => {
    if (
      formik.values.password &&
      !/[!@#$%^&*(),.?":{}|<>]/.test(formik.values.password)
    ) {
      return true;
    }
    return false;
  };

  const validateDigits = () => {
    if (formik.values.password && !/[0-9]/.test(formik.values.password)) {
      return true;
    }
    return false;
  };

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
      <div className="flex ">
        <div className="w-1/2 flex flex-col justify-between space-y-8 xl:space-y-10 max-h-[85vh] py-5 ">
          {/* heading and description  */}
          <div className="flex flex-col space-y-2 items-center">
            <div className="text-sm text-center text-textgray">1/3</div>
            <div className="text-3xl text-center font-bold">
              Entrez votre adresse email
            </div>
            <div className="text-textgray text-center text-md w-8/12">
              Les communications seront associées à cette adresse et vous
              permettra de vous connecter.
            </div>
          </div>

          {/* form  */}
          <div className="px-5 space-y-4 mx-auto">
            <form id="myform"
              // onSubmit={formik.handleSubmit}
              className="flex flex-col space-y-2 px-10"
            >
              <InputWithIcon
                type="email"
                placeholder="Adresse email"
                icon={true}
                name="email"
                ref={inputRef}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.email}
                errors={formik?.errors?.email}
                touched={formik?.touched?.email}
              />
              <InputWithIcon
                type="password"
                placeholder="Choisissez votre mot de passe"
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
            <div className="flex flex-col px-10 text-sm">
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

          {/* line bar  */}
          <div className="bg-inputBg rounded-lg">
            <div className="h-2 w-32 bg-alertPink"></div>
          </div>

          {/* button  */}
          <div className="flex justify-center">
            <NavBtn
              text="Continuer"
              // type="submit"
              onFunctionCalled={formik.handleSubmit}


              bgcolor={
                formik.values.password.length < 1 ||
                formik.values.confirm_password.length < 1 ||
                formik.values.email.length < 1 ||
                !isFormValid()
                  ? "#F0F2F3" // Set the default color when conditions are true
                  : "#A1FEDA" // Set the desired color when conditions are false
              }
              color={
                formik.values.password.length < 1 ||
                formik.values.confirm_password.length < 1 ||
                formik.values.email.length < 1 ||
                !isFormValid()
                  ? "#CDD6D7" // Set the default color when conditions are true
                  : "#053036" // Set the desired color when conditions are false
              }
              disabled={
                formik.values.password.length < 1 ||
                formik.values.confirm_password.length < 1 ||
                formik.values.email.length < 1
                  ? true
                  : !isFormValid()
              }
              // onFunctionCalled={() => navigate("/signup")}
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
