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
import { useEffect } from "react";

import { Client, Account } from "appwrite";

export const NewPass = () => {


  const navigate = useNavigate()
  const client = new Client();

  const account = new Account(client);

  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64b4cb0d1b60dd5e3a99');


  //const dispatch_ = useDispatch();
  // const {error} = useSelector(state => state.forgetPassword);
  // const navigate = useNavigate();


  //const {forgetdata} = useSelector((state) => state.forgetPassword);



  //USE-EFFECT
  // useEffect(() => {
  //   if (forgetdata) {
  //     navigate("/login");
  //     console.log("forgetdata")
  //   }

  //    else {

  //     console.log("not forget")
  //   }
  // }, [forgetdata]);
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
      console.log(values);
      console.log("passsword hai doskr")
      const email = values.email
      // const form = document.getElementById("forgetpass");
      // const formData = new FormData(form);
      console.log("email", email)
      //navigate('/confirm-password')

      const promise = account.createRecovery(email, 'http://127.0.0.1:5173/confirm-password');

      promise.then(function (response) {
        console.log("sucesss", response);
        alert("Check Your Email")

        //navigate('/confirm-password')
        // Success
      }, function (error) {
        console.log("error hai", error); // Failure
        alert("Your Email Does Not Exist or Invalid")
      });
      // dispatch_(forgetpassword(email,password,password2));

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

            {/* checkbox  */}
            {/* <div className="flex flex-col text-sm">
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
            </div> */}
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
