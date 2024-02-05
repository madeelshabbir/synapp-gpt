import React, { useEffect, useState } from "react";
import axios from "axios";

import NavBtn from "../../Components/Button/NavBtn";
import Navbar from "../../Components/navbar/Navbar";
import AttentionNote from "../../Components/AttentionNote/AttentionNote";
import { SideBtn } from "./SideBtn";
import { BarChart } from "../../Components/Charts/bar";
import { PieChart } from "../../Components/Charts/pie";
import { ExampleTool } from "../../Components/Charts/tooltip"
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { SubUnsubUsers } from "../chat/SubUnsubUsers";
import { Faq } from "../chat/faq";
import { AboutUs } from "../chat/aboutUs";

const Statistics = () => {
  const [duration, setDuration] = useState();
  const [lengthh, setLength] = useState(2);
  const [anonymous, setAnonymous] = useState(1);
  const [chatdata, setChatdata] = useState([]);
  const [chatdownload, setchatdownload] = useState([]);
  const [trainDocument, settrainDocument] = useState(1)
  const [untrainDocument, setuntrainDocument] = useState(1)
  const [showFaqs, setShowFaqs] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const subscribed = localStorage.getItem('username');
  const apiServer = import.meta.env.VITE_REACT_APP_API_URL;

  const exportDataToCSV = async () => {
    axios.get(`${apiServer}/api/admin/users/csv?model=question`, { responseType: 'blob' },
    ).then(response => {
      const blob = new Blob([response.data], { type: 'text/csv' });
      saveAs(blob, 'data.csv');
    }).catch(error => {
      console.log(error);
      alert("Error while exporting data, please try later.")
    });
  }

  useEffect(() => {
    const fetchAllQuestions = async () => {
      const resp = await axios.get(`${apiServer}/api/admin/questions`);
      setChatdata(resp.data.questions['documents'])

      const newDataList = chatdata.map((item, index) => ({
        id: index + 1,
        question: item.question,
        answer: item.answer,
        status: item.status,
      }));
      setLength(resp.data.questions.total)
      setAnonymous(resp.data.questions.anonymous)
      setchatdownload(newDataList)
    }
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    const fetchDocumentData = async () => {
      const access_token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`${apiServer}/api/admin/document/`);

        if (response) {
          settrainDocument(response.data['train_docx'])
          setuntrainDocument(response.data['untrain_docx'])
        }
      } catch (error) {
        console.log(error);
        console.log("Error in loading user data");
      }
    };

    fetchDocumentData();
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

  const handleCloseProfile = (id) => {
    setShowUserProfile(false);
  };

  return (
    <div className="h-screen">
      <Navbar onOpenModal={() => setShowModal(!showModal)} />
      <div className="bg-bgCremo flex">
        <div className="w-64 flex flex-col justify-between p-2">
          <div className="top-0 flex flex-col justify-center items-center">
            <div>
              <SideBtn />
            </div>
          </div>
          <AttentionNote />
        </div>

        <div className="w-full h-screen p-8 space-y-7">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xl:h-3/12">
            <div className="bg-gray-100 rounded-xl shadow-md  overflow-hidden p-5 space-y-3 col-span-2">
              <div className="flex justify-between">
                <div className="text-lg font-semibold">Prompts</div>
                <select
                  onChange={(e) => setDuration(e.target.value)}
                  className="bg-transparent cursor-pointer  text-sm outline-none px-1"
                >
                  <option value="7 Days">Weekly</option>
                  <option value="1 Month">Monthly</option>
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
          </div>
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

export default Statistics;
