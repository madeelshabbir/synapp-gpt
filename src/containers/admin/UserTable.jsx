import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from 'file-saver';

import Navbar from "../../Components/navbar/Navbar";
import AttentionNote from "../../Components/AttentionNote/AttentionNote";
import NavBtn from "../../Components/Button/NavBtn";
import { SideBtn } from "./SideBtn";
import { SubUnsubUsers } from "../chat/SubUnsubUsers";
import { Faq } from "../chat/faq";
import { AboutUs } from "../chat/aboutUs";

const UserTable = () => {
  const tlClass = "p-3 h-full ";
  const tdClass = "  p-2   ";
  const [alluser, setAlluser] = useState([]);
  const [showFaqs, setShowFaqs] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const subscribed = localStorage.getItem('username');
  const apiServer = import.meta.env.VITE_REACT_APP_API_URL;

  const exportUsersToCSV = async () => {
    axios.get(`${apiServer}/api/admin/users/csv?model=user`,
      { responseType: 'blob' },
    ).then(response => {
      const blob = new Blob([response.data], { type: 'text/csv' });
      saveAs(blob, 'users.csv');
    })
    .catch(error => {
      console.log(error);
      alert('Error in exporting users data to CSV')
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
      try {
        const response = await axios.get(`${apiServer}/api/admin/users/`);
        if (response) {
          setAlluser(response.data.users);
        }
      } catch (error) {
        console.log(error);
        alert('Error in fetching users data')
      }
    };
    fetchAllUserData();
  }, []);

  return (
    <div className="h-screen">
      <Navbar
        onOpenModal={() => setShowModal(!showModal)}
      />
      <div className="flex bg-bgCremo">
        <div className="w-64 flex flex-col justify-between space-y-44 p-2">
          <div className=" flex flex-col justify-center items-center">
            <div>
              <SideBtn />
            </div>
          </div>
          <AttentionNote />
        </div>

        <div className="w-full h-screen p-10">
          <div className="flex justify-end">
            <NavBtn text="Export users in CSV" bgcolor="#A1FEDA" onFunctionCalled={exportUsersToCSV} />
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
        ) : subscribed && showModal ? (
          <SubUnsubUsers
            onOpenModal={() => setShowModal(!showModal)}
            type={1}
            onOpenSignUp={() => setShowUserProfile(!showUserProfile)}
            onOpenFaqs={() => setShowFaqs(!showFaqs)}
            onOpenAboutUs={() => setShowAboutUs(!showAboutUs)}
          />
        ) : null}
        {showFaqs && <Faq onOpenFaqs={() => setShowFaqs(!showFaqs)} />}
        {showAboutUs && (
          <AboutUs onOpenAboutUs={() => setShowAboutUs(!showAboutUs)} />
        )}
      </div>
    </div>
  );
};

export default UserTable;
