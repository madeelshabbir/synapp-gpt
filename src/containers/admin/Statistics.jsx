import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import NavBtn from "../../Components/Button/NavBtn";
import Navbar from "../../Components/navbar/Navbar";
import AttentionNote from "../../Components/AttentionNote/AttentionNote";
import { SideBtn } from "./SideBtn";
import { BarChart } from "../../Components/Charts/bar";
import { PieChart } from "../../Components/Charts/pie";
import { ExampleTool } from "../../Components/Charts/tooltip"
import Accordion from "../../Components/Accordions";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { ListUserAction } from "../../redux/actions/AdminActions";
import { useDispatch, useSelector } from "react-redux";
import { SubUnsubUsers } from "../chat/SubUnsubUsers";
import axios from "axios";
import { ApiServer } from "../../ApiConstant";
//import { Tooltip } from 'react-tooltip';
//import Tooltip from "@material-ui/core/Tooltip";
import { Client, Databases, Query } from "appwrite";
import Papa from 'papaparse';

import * as sdk from 'node-appwrite';

// or
import { require } from 'node-appwrite';
import { SomeClass, SomeFunction } from 'node-appwrite';
const Statistics = () => {
  const [duration, setDuration] = useState();
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);
  const [lengthh, setLengthh] = useState(2);
  const [anonymous, setAnonymous] = useState(1);
  const [chatdata, setChatdata] = useState([]);
  const [chatdownload, setchatdownload] = useState([]);
  const [trainDocument, settrainDocument] = useState(1)
  const [untrainDocument, setuntrainDocument] = useState(1)
  const [showFaqs, setShowFaqs] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [subscribed, setSubscribed] = useState(null);



  const client = new Client();

  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64b4cb0d1b60dd5e3a99');

  const databases = new Databases(client);


  const convertToCSV = () => {
    const csv = Papa.unparse([{ id: 'id', question: 'question', answer: 'Answer', status: 'Status' }, ...chatdownload]);
    //const csv = Papa.unparse(chatdownload);
    return csv;
  };


  const handleDownload = () => {
    const csv = convertToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'userdata.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };



  const exportDataToCSV = async () => {

    const access_token = localStorage.getItem('access_token');
    axios.get(ApiServer + '/api/admin/alldata-export-csv/', { responseType: 'blob' },
    )
      .then(response => {
        const blob = new Blob([response.data], { type: 'text/csv' });
        saveAs(blob, 'data.csv');
      })
      .catch(error => {
        // Handle the error
        //alert("error",error)
      });
  }


  useEffect(() => {
    const promise = databases.listDocuments('64b5432b9e32fda9235a', '64b641e090dc4b18246a');
    promise.then(function (response) {
      setChatdata(response['documents'])
    

      const newDataList = chatdata.map((item, index) => ({
        id: index + 1,
        question: item.question,
        answer: item.answer,
        status: item.status,
      }));
      setchatdownload(newDataList)
     

    }, function (error) {

      console.log(error); // Failure
    });

  }, []);
  useEffect(()=>{

    const ipAddressPattern = /^(\d{1,3}|0x[\da-fA-F]{1,2})(\.(\d{1,3}|0x[\da-fA-F]{1,2})){3}$/;

    let uniqueIps = new Set();

    // Assuming you have a valid 'chatdata' array with 'user_info' field
    chatdata.forEach((item, index) => {

      if (ipAddressPattern.test(item.user_info)) {
        if (!uniqueIps.has(item.user_info)) {
          uniqueIps.add(item.user_info);

        }
      }
    });

    
    const count_unique_ips = uniqueIps.size;
    setAnonymous(uniqueIps.size)
   

  },[chatdata])

  useEffect(() => {
    const fetchDocumentData = async () => {
      const access_token = localStorage.getItem('access_token');

      try {
        const response = await axios.get(ApiServer + '/api/admin/document-view/');


        if (response) {

          settrainDocument(response.data['train_docx'])
          setuntrainDocument(response.data['untrain_docx'])
          // console.log("new length",newLength)

        }
      } catch (error) {
        // Handle error
        console.error(error);
        console.log("user load  error");
        //alert(error)
        // ... handle the error
      }
    };

    fetchDocumentData();
  }, []);
  useEffect(() => {
    const fetchuserData = async () => {
      const access_token = localStorage.getItem('access_token');

      try {
        const response = await axios.get(ApiServer + '/api/admin/get-all-user/', {

        });

        const userdata = response.data;
        setLengthh(userdata ? userdata.length : 1)
        if (userdata) {
          const newLength = userdata ? userdata.length : 1
          setLengthh(newLength)
          // console.log("new length",newLength)

        }
        // ... do something with the response data
      } catch (error) {
        // Handle error
        console.error(error);
        console.log("user load  error");
        //alert(error)
        // ... handle the error
      }
    };

    fetchuserData();
  }, []);
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

  const handleThumbsUp = () => {
    setThumbsUp(!thumbsUp);
    setThumbsDown(false);
  };

  const handleThumbsDown = () => {
    setThumbsDown(!thumbsDown);
    setThumbsUp(false);
  };
  return (
    <div className="h-screen">
      <Navbar onOpenModal={() => setShowModal(!showModal)} />
      {/* main div  */}
      <div className="bg-bgCremo flex">
        {/* side bar  */}
        <div className="w-64 flex flex-col justify-center space-y-[320px] p-2">
          <div className="top-0 flex flex-col justify-center items-center">
            <Button text="Nouvelle question" />
            <div>
              <SideBtn />
            </div>
          </div>
          <AttentionNote />
        </div>

        {/* chart div  */}

        <div className="w-full p-8 space-y-7">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xl:h-3/12">
            <div className="bg-gray-100 rounded-xl shadow-md  overflow-hidden p-5 space-y-3 col-span-2">
              <div className="flex justify-between">
                <div className="text-lg font-semibold">Prompts</div>
                <select
                  onChange={(e) => setDuration(e.target.value)}
                  className="bg-transparent cursor-pointer  text-sm outline-none px-1"
                >
                  <option value="7 Days">Weekly</option>
                  <option value="1 Month">Montly</option>
                  <option value="1 Year">1 Year</option>
                </select>
              </div>
              <BarChart duration={duration} />
            </div>
            <div className="bg-gray-100 rounded-xl shadow-md  overflow-hidden p-3 object-contain">
              <PieChart
                duration={duration}
                title="Users"
                labels={["Subscribed", "Anonymous"]}
                background={["#BD6EC3", "#A1FEDA"]}
                data={[lengthh, anonymous]}
              />
            </div>
            <div className="bg-gray-100 rounded-xl shadow-md  overflow-hidden p-3 object-contain">
              <PieChart
                duration={duration}
                title="Documents"
                labels={["Trained", "Others"]}
                background={["#A1FEDA", "gray"]}
                data={[trainDocument, untrainDocument]}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <NavBtn
              text="Export data in CSV"
              bgcolor="#A1FEDA"
              onFunctionCalled={exportDataToCSV}
            />
            {/* <ReactHTMLTableToExcel
              id="questiontable"
              className="download-question-table bg-aqua whitespace-nowrap border-2 rounded-xl font-bold py-1.5 px-3 flex gap-2 justify-center text-sm"
              table="question-table"
              filename="table_questiontable"
              sheet="sheet1"
              buttonText="Export users in CSV"
            /> */}
          </div>
          {/* table  */}
          <div
            className="p-2 mt-6 w-full rounded-lg tableContainer"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <table id="question-table" className="w-full">
              <thead className="text-normal uppercase bg-[#F0F2F3] shadow-lg">
                <tr className="font-semibold tracking-wide text-center">
                  <th className="p-3">#No</th>
                  <th className="p-3">Question</th>
                  <th className="p-3">Answer</th>
                  <th className="p-3">Reaction</th>
                </tr>
              </thead>
              <tbody>
                {chatdata &&
                  chatdata.map((chat, index) => (
                    <tr key={index} className="text-sm text-center shadow-lg">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{chat.question}</td>
                      <td className="p-2">
                        {chat.answer.length > 10 ? (
                          <div data-tip={chat.answer}>
                            <ExampleTool
                              tooltip={chat.answer}
                              orignal={chat.answer.slice(0, 20)}
                            />
                          </div>
                        ) : (
                          chat.answer
                        )}
                      </td>
                      <td className="p-2 justify-center flex gap-5 items-center text-lg">
                        <span
                          className={`hover:scale-110 ${
                            chat.status === 1 ? "text-green-600" : ""
                          }`}
                        >
                          <FiThumbsUp />
                        </span>
                        <span
                          className={`hover:scale-110 ${
                            chat.status === 0 ? "text-red-500" : ""
                          }`}
                        >
                          <FiThumbsDown />
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

         
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

export default Statistics;
