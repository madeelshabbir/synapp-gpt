import React, { useState } from "react";
import { useSelector } from "react-redux"; // Get Data from store
import LazyLoad from "react-lazyload"; // use lazyload for components and image
import { SignUp } from "./SignUp";
import { SignUpDefault } from "./SignUpDefault";
import { SignUpFinalScr } from "./SignupFinalScr";






export const FormMainControl = () => {






  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: "",
    occupation: "",
    email: "",
    password: "",
    password2:"",
    specialty:"",
    cgu:"",
    pdp:"",
      // Add more form fields as needed
  });

  const handleNextStep = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Perform form submission logic with the final form data
    console.log("in main files",formData);
  };

  return (
    <>
      {step === 1 && (
        <SignUpDefault
          formData={formData}
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      )}
      {step === 2 && (
        <SignUp
          formData={formData}
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      )}
      {step === 3 && (
        <SignUpFinalScr
          formData={formData}
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};
  






