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
import { account } from "../../appwriteConfig";
export const UserUpdate = ({ onOpenUserProfile, handleCloseProfile }) => {

  const [responseData, setResponseData] = useState({
    occupation: "",
    specialty: "",
    email: "",
    cgu: "True",
    pdp: "True",
    password: "",
    password2: "",
  });

  const apiServer = import.meta.env.VITE_REACT_APP_API_URL;

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
        console.log(error);
      });
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
      const response = await axios.put(`${apiServer}/api/admin/update-profile/`, formData, {});
      const responseDat = response.data;
      if (responseDat) {
        alert("Profile is Updated");
      }
    } catch (error) {
      alert("Your old Password Wrong");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const access_token = localStorage.getItem("access_token");

    const formData = {
      occupation: event.target.occupation.value,
      specialty: event.target.specialty.value,
      password_old: formik.values.current_password,
      password: formik.values.password,
      password2: formik.values.password,
      userid:access_token,
    };

    updateProfileData(formData);
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
        .required("Password Required"),

      confirm_password: Yup.string()
        .required("Confirm Password")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: async (values) => {
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
    <div className="flex flex-col w-3/12 space-y-2  py-4 -mt-4 pr-2 bg-white">
       <div className="flex flex-row">
        <h3 className="flex-1 text-center m-0">Edit Settings</h3>
        <div className="flex-1 flex justify-end">
          <AiOutlineClose
            className="self-end text-xs cursor-pointer"
            onClick={onOpenUserProfile}
          />
        </div>
      </div>
      <div className=" flex flex-col items-start  space-y-5  bg-white px-5 py-8">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 justify-start w-full "
        >
          <InputWithIcon
            type="password"
            placeholder="Choisissez votre mot de passe"
            icon={true}
            pass={true}
            width="w-full"
            name="current_password"
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
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
