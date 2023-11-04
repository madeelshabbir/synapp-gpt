import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import Navbar from "../../Components/navbar/Navbar";
import AttentionNote from "../../Components/AttentionNote/AttentionNote";
import NavBtn from "../../Components/Button/NavBtn";
import { SubUnsubUsers } from "../chat/SubUnsubUsers";
import { Faq } from "../chat/faq";
import { AboutUs } from "../chat/aboutUs";
import { SideBtn } from "./SideBtn";
import { InputWithIcon } from "../../Components/InputTag/InputWithLabel";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [showFaqs, setShowFaqs] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const subscribed = localStorage.getItem('username');
  const [showDiv, setShowDiv] = useState(false);
  const fileInputRef = useRef(null);
  const apiServer = import.meta.env.VITE_REACT_APP_API_URL;
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const tlClass = "p-3 h-full ";
  const tdClass = "  p-2   ";

  useEffect(() => {
    fetchData();
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

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiServer}/api/admin/files/`);
      const data = response.data.files;
      setFiles(data);
    } catch (error) {
      console.log(error);
    }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileInput = document.querySelector('input[name="file"]');
    const selectedFiles = fileInput.files;
    const selectedFilesLength = selectedFiles.length;
    if (selectedFilesLength!=0 && selectedFiles!=null) {
      AddFilesData(selectedFiles)
    }
    const fileInputt = document.querySelector('input[name="file"]');
    fileInputt.value = null;
  };

  const AddFilesData = async (formData) => {
    setShowDiv(true);
    const access_token = localStorage.getItem('access_token');
    try {
      const response = await axios.post(
        `${apiServer}/api/admin/files/`,
        formData,
      );
      const responseData = response.data;
      if (responseData) {
        setShowDiv(false);
        alert("submitted your files data successfully")
        setSelectedFileNames([]);
        setFiles((prevFiles) => {
          return [...prevFiles, responseData.files];
        });
      }
    } catch (error) {
      setShowDiv(false);
      console.log(error);
      console.log("files error");
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const fileNames = Array.from(selectedFiles).map((file) => file.name);
    setSelectedFileNames(fileNames);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleCloseProfile = (id) => {
    setShowUserProfile(false);
  };

  return (
    <div className="h-screen">
      <Navbar onOpenModal={() => setShowModal(!showModal)} />
      <div className="flex bg-bgCremo">
        <div className="w-64 flex flex-col justify-between space-y-44 p-2">
          <div className="flex flex-col justify-center items-center">
            <div>
              <SideBtn />
            </div>
          </div>
          <AttentionNote />
        </div>

        <div className="w-full h-screen flex flex-col">
          <div className="flex flex-col space-y-2">
            <div className="d-inline">
              {showDiv && (
                <div className="my">
                  <div className="progress-bar">
                    <div className="progress-bar-text">Train models</div>
                    <div className="progress-bar-circle">
                      <div className="progress-bar-fill"></div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="flex gap-1">
                  <input
                    id="file-input"
                    name="file"
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    multiple
                  />
                  <InputWithIcon
                    placeholder="Documents (PDF, doc, docx...etc)"
                    value={selectedFileNames.join(", ")}
                    readOnly
                  />
                  <NavBtn text="Upload" type="submit" bgcolor="#A1FEDA" width="150px" disabled={!selectedFileNames.length}/>
                  <button
                    type="button"  // Change type to "button"
                    onClick={handleBrowseClick}
                  >
                    <NavBtn text="Browse" bgcolor="#A1FEDA" width="150px" />
                  </button>
                </div>
              </form>
            </div>
            <div></div>
          </div>
          <div style={{ maxHeight: '700px', overflow: 'auto' }}>
            <table id="files-table" className="p-2 mt-6 w-full rounded-lg mr-5">
              <thead className="text-normal uppercase bg-[#F0F2F3] shadow-lg">
                <tr className="font-semibold tracking-wide text-left">
                  <th className={`${tlClass}`}>#No</th>
                  <th className={`${tlClass}`}>File</th>
                </tr>
              </thead>
              <tbody className="">
                {files &&
                  files.map((file, index) => (
                    <tr
                      key={index}
                      className={`hover-bg-teal-50 cursor-pointer text-sm text-left shadow-lg`}
                    >
                      <td className={`${tdClass}`}>{index + 1}</td>
                      <td className={`${tdClass}`}>
                        <a href={file.path} target="_blank">
                          {file.name}
                        </a>
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

export default Files;
