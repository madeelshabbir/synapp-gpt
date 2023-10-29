import { AiOutlineClose } from "react-icons/ai";
import {
  InputWithEmoji,
  InputWithIcon,
  InputWithCheckbox,
} from "../../Components/InputTag/InputWithLabel";
import { ASSETS } from "../../assets/path";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApiServer } from "../../ApiConstant";
// import { Client } from "appwrite";
import { account } from "../../appwriteConfig";
export const UserUpdate = ({ onOpenUserProfile, handleCloseProfile }) => {



//   const sdk = require('node-appwrite');

// // Init SDK
// const client = new sdk.Client();

// const users = new sdk.Users(client);
  // const [responseData, setResponseData] = useState(null);
  const [responseData, setResponseData] = useState({
    occupation: "",
    specialty: "",
    email: "",
    cgu: "True",
    pdp: "True",
    password: "",
    password2: "",
  });
  // setShowUserProfile(!showUserProfile)


  


  useEffect(() => {
    const fetchData = async () => {
      
      const promise = account.get();

      promise.then(function (response) {
          setResponseData({
          email: response.email,
          occupation:response.prefs['profession'],
          specialty:response.prefs['specialty'],

         
        });
      }, function (error) {
        console.log(error); // Failure
      });



      // const access_token = localStorage.getItem("access_token");

      // try {
      //   const response = await axios.get(ApiServer + "/api/profile/", {
      //     headers: {
      //       Authorization: `Bearer ${access_token}`,
      //     },
      //   });

      //   const responseDat = response.data;
      //   setResponseData({
      //     email: responseDat.email,
      //     occupation: responseDat.occupation,
      //     specialty: responseDat.specialty,
      //   });
      //   console.log("profile data", responseData);

      //   // ... do something with the response data
      // } catch (error) {
      //   // Handle error
      //   console.error(error);
      //   console.log("profile error");
      //   // ... handle the error
      // }
    };

    fetchData();
  }, []);
  const handleChange = (e) => {
    setResponseData({
      ...responseData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfileData = async (formData) => {
   
    
    let  password = formData['password']
   
    

    try {
      const response = await axios.put(ApiServer + "/api/admin/update-profile/", formData, {
  
      });

      const responseDat = response.data;
      if (responseDat) {

       
        alert("Profile is Updated");
        //handleCloseProfile()



      }

      console.log("profile data");
      // ... do something with the response data
    } catch (error) {
      // Handle error
      // console.error(error);
      alert("Your old Password Wrong");
      // console.log("profilebb error",error.data);
      // ... handle the error
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Extract form data from event.target or formik.values
    console.log("submit clieck", formik.values.password);
    const access_token = localStorage.getItem("access_token");


    const formData = {
      occupation: event.target.occupation.value,
      specialty: event.target.specialty.value,
      password_old: formik.values.current_password,
      password: formik.values.password,
      password2: formik.values.password,
      userid:access_token,


      // ...other form fields
    };

    updateProfileData(formData);
    console.log("Final profiel data", formData);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      current_password: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email")
        .required("L’adresse email n’est pas conforme"),
      current_password: Yup.string().required("Please enter current password"),

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
      console.log("all_values_data", values);
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
  return (
    <div className="flex flex-col w-6/12 space-y-2  py-0 -mt-0 pr-5">
      <div className="self-end">
        <AiOutlineClose
          className="self-end text-xs cursor-pointer"
          onClick={onOpenUserProfile}
        />
      </div>
      <div className=" flex flex-col items-start  space-y-5  bg-white px-5 py-8">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 justify-start w-full "
        >
          <InputWithIcon
            type="email"
            icon={true}
            placeholder="Adresse email"
            width="w-full"
            name="email"
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            //value={formik?.values?.email}
            value={responseData?.email || ""}
            errors={formik?.errors?.email}
            touched={formik?.touched?.email}
          />
          <InputWithIcon
            type="password"
            placeholder="Choisissez votre mot de passe"
            icon={true}
            pass={true}
            width="w-full"
            name="current_password"
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            //value={responseData?.current_password || ""}
            value={formik?.values?.current_password}
            errors={formik?.errors?.current_password}
            touched={formik?.touched?.current_password}
          />
          <InputWithIcon
            type="password"
            placeholder="Choisissez votre mot de passe"
            icon={true}
            pass={true}
            width="w-full"
            name="password"
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            //value={responseData?.password || ""}
            value={formik?.values?.password}
            errors={formik?.errors?.password}
            touched={formik?.touched?.password}
          />
          <InputWithIcon
            type="password"
            placeholder="Confirmez votre mot de passe"
            icon={true}
            pass={true}
            width="w-full"
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

        <h2 className="font-bold ">Vous exercez en tant que :</h2>

        {/* form  */}
        <form
          className="flex flex-col gap-4 justify-center  items-center w-full"
          onSubmit={handleSubmit}
        >
          <InputWithEmoji
            image={ASSETS.EMOJI.FACE}
            value={responseData?.occupation || ""}
            onChange={handleChange}
            bgcolor="#E3FFF4"
            width="w-full"
            name="occupation"
          />
          <InputWithEmoji
            image={ASSETS.EMOJI.SHOCK}
            placeholder="Spécialité"
            onChange={handleChange}
            value={responseData?.specialty || ""}
            bgcolor="#FDF4F3"
            name="specialty"
            width="w-full"
          />

          {/* <div className="flex flex-col gap-3 text-xs">
          <InputWithCheckbox text="J’ai lu et j’accepte les conditions générales (CGU) "  checked="True" />
          <InputWithCheckbox text="J’ai lu et j’accepte la Politique de confidentialité des données personnelles "checked="True" />
        </div> */}
          <button type="submit" className="bg-aqua py-1.5 w-full rounded-md">
            Mettre à jour mon profil
          </button>
        </form>
      </div>
    </div>
  );
};
