import NavBtn from "../../../Components/Button/NavBtn";
import Notes from "../../../Components/Notes/Notes";
import { InputWithIcon } from "../../../Components/InputTag/InputWithLabel";
import Navbar from "../../../Components/navbar/Navbar";
import { ASSETS } from "../../../assets/path";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
//import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
//import {login} from '../../../redux/actions/LoginActions'

import React, { useEffect, useState } from "react";
//import  {Client ,Account,Databases ,ID}  from  'appwrite';

import { useAuth } from '../../../utils/AuthContext'

export const LoginEmail = () => {
  const navigate = useNavigate();
  const {error,user, loginUser} = useAuth();

//   const client = new Client();

// client
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('64b4cb0d1b60dd5e3a99');

   
// useEffect(()=>{


//   const account = new Account(client);
                
//   // const result = account.create(
//   //   ID.unique(), 
//   //   'hussain@example.com',
//   //   'password123',
//   //   "hussain"
//   // );
  
//   // result.then(function (response) {
//   //    console.log("kuch to hai",response);
//   //    console.log("manzoor")
//   // }, function (error) {
//   //    console.log("error hai",error);
     
//   // });
 
                    
//   //account.createOAuth2Session('google');

// },[]);


  
  //const dispatch = useDispatch();
  //const userLogin = useSelector((state) => state.userLogin);
  //const { access_token } = userLogin;
 // const { username } = userLogin
  // const username = useSelector((state) => state.userLogin);
  // const { username } = username;
  
  //const {error} = useSelector(state => state.userLogin);
  //const username=localStorage.getItem("username")


  // useEffect(()=>{
  //   const bytesData="{\'keywords\': {\'key_words\': [\'laptops\', \'laptop computer\', \'laptop\', \'group gathering\', \'group of people\', \'conference table\', \'people in a row\', \'computer room\', \'notebook\', \'laptop screen\', \'desks\', \'desk setup\', \'table\', \'group activity\', \'tables\', \'tablet computer\', \'table top\', \'social gathering\', \'tabletop\', \'large table\', \'wooden tables\', \'long table\', \'group discussion\', \'tablet computing\', \'yellow chairs\', \'wooden table\', \'yellow desks\', \'food table\', \'computer screens\', \'desktop computer\', \'office setting\', \'chairs\', \'conference room\', \'table talk\', \'meeting room\', \'desk\', \'office room\', \'marble table\', \'computers\', \'group\', \'computer screen\', \'tablet\', \'office environment\', \'cubicles\', \'wooden desk\', \'workplace technology\', \'outdoor seating\', \'monitors\', \'mouse pad\', \'outdoor meeting\'], \'score\': [0.83297133, 0.95296526, 0.962473, 1.0002253, 1.0198127, 1.0444791, 1.0468609, 1.0726049, 1.0926585, 1.1149294, 1.118609, 1.1191263, 1.1281695, 1.1405693, 1.1598382, 1.1602677, 1.1765904, 1.1917654, 1.1965237, 1.2064519, 1.2175739, 1.2369962, 1.2386554, 1.239548, 1.240392, 1.2477784, 1.2528805, 1.2531426, 1.2548802, 1.2597609, 1.2618104, 1.2636606, 1.2708759, 1.2861352, 1.2910142, 1.302363, 1.3195952, 1.3266721, 1.3274238, 1.3339766, 1.351773, 1.3549824, 1.3566437, 1.3595825, 1.3616662, 1.3659186, 1.3737687, 1.3749545, 1.3832562, 1.3883383]}, \'category\': [\'Social Responsibility\', \'Culture & Values\', \'Events\']}"
  //   const jsonString = decodeURIComponent(escape(atob(bytesData)));

  //       // Parse the JSON string to get the JavaScript object
  //       const dataObject = JSON.parse(jsonString);

  //       // Now you can access the data from the object
  //       console.log(dataObject.keywords.key_words); // Array of keywords
  //       console.log(dataObject.keywords.score); // Array of scores
  //       console.log(dataObject.category); // Array of categories
   







  // },[])
  function bytesToJson(bytes) {
    const decodedString = new TextDecoder().decode(new Uint8Array(bytes.split(',').map(Number)));
    return decodedString;
}
//   useEffect(()=>{
//     const bytesData="{"caption\\": \\"a group of people sitting around a table with laptops\\", \\"keywords\\": {\\"key_words\\": [\\"laptops\\", \\"laptop computer\\", \\"laptop\\", \\"group gathering\\", \\"group of people\\", \\"conference table\\", \\"people in a row\\", \\"computer room\\", \\"notebook\\", \\"laptop screen\\", \\"desks\\", \\"desk setup\\", \\"table\\", \\"group activity\\", \\"tables\\", \\"tablet computer\\", \\"table top\\", \\"social gathering\\", \\"tabletop\\", \\"large table\\", \\"wooden tables\\", \\"long table\\", \\"group discussion\\", \\"tablet computing\\", \\"yellow chairs\\", \\"wooden table\\", \\"yellow desks\\", \\"food table\\", \\"computer screens\\", \\"desktop computer\\", \\"office setting\\", \\"chairs\\", \\"conference room\\", \\"table talk\\", \\"meeting room\\", \\"desk\\", \\"office room\\", \\"marble table\\", \\"computers\\", \\"group\\", \\"computer screen\\", \\"tablet\\", \\"office environment\\", \\"cubicles\\", \\"wooden desk\\", \\"workplace technology\\", \\"outdoor seating\\", \\"monitors\\", \\"mouse pad\\", \\"outdoor meeting\\"], \\"score\\": [0.83297133, 0.95296526, 0.962473, 1.0002253, 1.0198127, 1.0444791, 1.0468609, 1.0726049, 1.0926585, 1.1149294, 1.118609, 1.1191263, 1.1281695, 1.1405693, 1.1598382, 1.1602677, 1.1765904, 1.1917654, 1.1965237, 1.2064519, 1.2175739, 1.2369962, 1.2386554, 1.239548, 1.240392, 1.2477784, 1.2528805, 1.2531426, 1.2548802, 1.2597609, 1.2618104, 1.2636606, 1.2708759, 1.2861352, 1.2910142, 1.302363, 1.3195952, 1.3266721, 1.3274238, 1.3339766, 1.351773, 1.3549824, 1.3566437, 1.3595825, 1.3616662, 1.3659186, 1.3737687, 1.3749545, 1.3832562, 1.3883383]}, \\"category\\": [\\"Social Responsibility\\", \\"Culture & Values\\", \\"Events\\"]}";
//     //const jsonString = bytesData.replace(/'/g, "\"");
//     console.log(bytesToJson(bytesData))
//     //const dataObject = JSON.parse(jsonString);

// // Now you can access the data from the object
// // console.log(dataObject.keywords.key_words); // Array of keywords
// // console.log(dataObject.keywords.score); // Array of scores
// // console.log(dataObject.category); // Arr
//         console.log("manzoor hussain")
//         // for (let key in dataObject) {
//         //   console.log("check kar")
//         //            // Print the property name ("keywords", "category", etc.)
//         //   console.log("key",dataObject[key]); // Access the value of each property
//         //   console.log(dataObject[key]['key_words'])
//         //   console.log(dataObject[key]['key_words'],"    between ",dataObject[key]['score'])
//         // }
   







//   },[])
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
   
   
  },[user])
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
      //dispatch(login(values.email, values.password));

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
