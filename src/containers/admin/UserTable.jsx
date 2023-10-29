import React, { useState, useEffect } from "react";
import Navbar from "../../Components/navbar/Navbar";
import Button from "../../Components/Button/Button";
import AttentionNote from "../../Components/AttentionNote/AttentionNote";
import NavBtn from "../../Components/Button/NavBtn";
import { SideBtn } from "./SideBtn";
//import { ListUserAction } from "../../redux/actions/AdminActions";
//import { useDispatch, useSelector } from "react-redux";
//import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { ApiServer } from "../../ApiConstant";
import { saveAs } from 'file-saver';
import { SubUnsubUsers } from "../chat/SubUnsubUsers";
import axios from "axios";
import { Client, Databases, Query } from "appwrite";


const UserTable = () => {
  //const dispatch =new useDispatch()
  const tlClass = "p-3 h-full ";
  const tdClass = "  p-2   ";
  // useEffect(() => {
  //   dispatch(ListUserAction());
  // }, [dispatch]);
  const [alluser, setAlluser] = useState([]);
 
  const [showFaqs, setShowFaqs] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [subscribed, setSubscribed] = useState(null);

  //const ListUser = useSelector((state) => state.ListUser);
  const client = new Client();


  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64b4cb0d1b60dd5e3a99');

  const databases = new Databases(client);






  const { userdata } = [];

  // useEffect(() => {

  //   const promise = databases.getDocument('64b5432b9e32fda9235a', '64b6a57a8ca13cf4ab29', '1');
  //   promise.then(function (response) {
  //     setNumberofSubcriber(response.subcriber);
  //     setNumberofUnsubcriber(response.unsubcriber);
  // }, function (error) {
  //     console.log(error); // Failure
  // });

  // },[])

  const exportUsersToCSV = async () => {

    const access_token = localStorage.getItem('access_token');
    axios.get(ApiServer + '/api/admin/user-export-csv/', { responseType: 'blob' },
     
    )
      .then(response => {

        const blob = new Blob([response.data], { type: 'text/csv' });
        saveAs(blob, 'users.csv');
      })
      .catch(error => {
        // Handle the error
        //alert("error",error)
      });
  }
  useEffect(() => {
    if (showAboutUs || showFaqs || showUserProfile) {
      setShowModal(false);
    }
  }, [showAboutUs, showFaqs, showUserProfile]);
  useEffect(() => {
    if (showModal) {
      setShowAboutUs(false);
      setShowFaqs(false);
      setShowUserProfile(false);
    }
  }, [showModal]);
  const handleCloseProfile = (id) => {
    setShowUserProfile(false);
  };
  useEffect(() => {
    const fetchAllUserData = async () => {
      const access_token = localStorage.getItem('access_token');



      try {
        const response = await axios.get(ApiServer + '/api/admin/get-all-user/',

        );


        if (response) {
        
          setAlluser(response.data)


        }




        // ... do something with the response data
      } catch (error) {
        // Handle error
        console.error(error);
        console.log("All user load  error");
        // alert(error)
        // ... handle the error
      }
    };

    fetchAllUserData();
  }, []);

  return (
    <div className="h-screen">
      <Navbar
        onOpenModal={() => setShowModal(!showModal)}
        // onOpenAbout={() => setShowAboutUs(!showAboutUs)}
      />
      {/* main div  */}
      <div className="flex bg-bgCremo">
        {/* side bar  */}
        <div className="w-64 flex flex-col justify-between space-y-44 p-2">
          <div className=" flex flex-col justify-center items-center">
            <Button text="Nouvelle question" />
            <div>
              <SideBtn />
            </div>
          </div>
          <AttentionNote />
        </div>

        {/* table div  */}
        <div className="w-full p-10">
          <div className="flex justify-end">
          <NavBtn text="Export users in CSV" bgcolor="#A1FEDA" onFunctionCalled={exportUsersToCSV} />
            {/* <NavBtn
              text="Export users in CSV"
              bgcolor="#A1FEDA"
              onFunctionCalled={exportUsersToCSV}
            /> */}
            {/* <ReactHTMLTableToExcel
              id="usertable"
              className="download-user-table bg-aqua whitespace-nowrap border-2 rounded-xl font-bold py-1.5 px-3 flex gap-2 justify-center text-sm"
              table="user-table"
              filename="table_usertable"
              sheet="sheet1"
              buttonText="Export users in CSV"
            /> */}
          </div>
          <table id="user-table" className="p-2 mt-6 w-full rounded-lg">
            <thead className="text-normal uppercase bg-[#F0F2F3] shadow-lg">
              <tr className="font-semibold tracking-wide text-left">
                <th className={`${tlClass}`}>#No</th>
                <th className={`${tlClass}`}>Full Name</th>
                <th className={`${tlClass}`}>Email</th>
                <th className={`${tlClass}`}>Profession </th>
                <th className={`${tlClass}`}>Speciality</th>
              </tr>
            </thead>
            <tbody className="">
                {alluser && alluser.map((user, index) => (
                <tr
                  key={index}
                  className={`hover:bg-teal-50 cursor-pointer text-sm text-left shadow-lg`}
                >
                  <td className={`${tdClass}`}>{index + 1}</td>
                  <td className={`${tdClass}`}>{user.name}</td>
                  <td className={`${tdClass}`}>{user.email}</td>
                  {user.prefs ? (
                    <>
                      <td className={`${tdClass}`}>{user.prefs.profession}</td>
                      <td className={`${tdClass}`}>{user.prefs.speciality}</td>
                    </>
                  ) : (
                    <>
                      <td className={`${tdClass}`}></td>
                      <td className={`${tdClass}`}></td>
                    </>
                  )}

                </tr>
              ))}

               
          </tbody> 
          </table>
         
        </div>
        {!subscribed && showModal ? (
          <SubUnsubUsers
            onOpenModal={() => setShowModal(!showModal)}
            type={2}
            onOpenSignUp={() => setShowUserProfile(!showUserProfile)}
            onOpenFaqs={() => setShowFaqs(!showFaqs)}
            onOpenAboutUs={() => setShowAboutUs(!showAboutUs)}
          />
        ) : (
          subscribed &&
          showModal && (
            <SubUnsubUsers
              onOpenModal={() => setShowModal(!showModal)}
              type={1}
              onOpenSignUp={() => setShowUserProfile(!showUserProfile)}
              onOpenFaqs={() => setShowFaqs(!showFaqs)}
              onOpenAboutUs={() => setShowAboutUs(!showAboutUs)}
            />
          )
        )}
        {showFaqs && <Faq onOpenFaqs={() => setShowFaqs(!showFaqs)} />}
        {showAboutUs && (
          <AboutUs onOpenAboutUs={() => setShowAboutUs(!showAboutUs)} />
        )}
        {showUserProfile && (
          <UserUpdate
            onOpenUserProfile={() => setShowUserProfile(!showUserProfile)}
            handleCloseProfile={handleCloseProfile}
          />
        )}
      </div>
    </div>
  );
};



//   return (
//     <div className="h-screen">
//       <Navbar />
//       {/* main div  */}
//       <div className="flex bg-bgCremo">
//         {/* side bar  */}
//         <div className="w-64 flex flex-col justify-between space-y-44 p-2">
//           <div className=" flex flex-col justify-center items-center">
//             <Button text="Nouvelle question" />
//             <div>
//               <SideBtn />
//             </div>
//           </div>
//           <AttentionNote />
//         </div>

//         {/* table div  */}
//         <div className="w-full p-10">
//           <div className="flex justify-end">
//             <NavBtn text="Export users in CSV" bgcolor="#A1FEDA" onFunctionCalled={exportUsersToCSV} />
//           </div>
//           <table className="p-2 mt-6 w-full rounded-lg">
//             <thead className="text-normal uppercase bg-[#F0F2F3] shadow-lg">
//               <tr className="font-semibold tracking-wide text-left">
//                 <th className={`${tlClass}`}>#No</th>
//                 <th className={`${tlClass}`}>Full Name</th>
//                 <th className={`${tlClass}`}>Email</th>
//                 <th className={`${tlClass}`}>Profession </th>
//                 <th className={`${tlClass}`}>Speciality</th>
//               </tr>
//             </thead>
//             <tbody className="">
//               {alluser && alluser.map((user, index) => (
//                 <tr
//                   key={index}
//                   className={`hover:bg-teal-50 cursor-pointer text-sm text-left shadow-lg`}
//                 >
//                   <td className={`${tdClass}`}>{index + 1}</td>
//                   <td className={`${tdClass}`}>{user.name}</td>
//                   <td className={`${tdClass}`}>{user.email}</td>
//                   {user.prefs ? (
//                     <>
//                       <td className={`${tdClass}`}>{user.prefs.profession}</td>
//                       <td className={`${tdClass}`}>{user.prefs.speciality}</td>
//                     </>
//                   ) : (
//                     <>
//                       <td className={`${tdClass}`}></td>
//                       <td className={`${tdClass}`}></td>
//                     </>
//                   )}

//                 </tr>
//               ))}

//               {/* <tr
//                 className={` hover:bg-teal-50 cursor-pointer text-sm text-left shadow-lg`}
//               >
//                 <td className={`${tdClass}  `}>test</td>
//                 <td className={` ${tdClass}`}>test@test.com</td>
//                 <td className={`  ${tdClass}`}>testing </td>
//                 <td className={` ${tdClass}`}>tester</td>
//               </tr> */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div></div>
    
//     </div>
//   );
// };

export default UserTable;
