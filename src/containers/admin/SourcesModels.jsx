import { useState, useEffect } from "react";
import Button from "../../Components/Button/Button";
import NavBtn from "../../Components/Button/NavBtn";
import Navbar from "../../Components/navbar/Navbar";
import AttentionNote from "../../Components/AttentionNote/AttentionNote";
import {
  InputWithIcon,
  SimpleInput,
} from "../../Components/InputTag/InputWithLabel";
import { SideBtn } from "./SideBtn";
import React, { useRef } from 'react';
import { AddFileAction, UpdateSubcriberAction } from "../../redux/actions/AdminActions";
import { useLocation } from "react-router-dom";
import { SubUnsubUsers } from "../chat/SubUnsubUsers";
import { SubscriptionModal } from "../../Components/modal/SubscriptionModal";
import { ApiServer } from "../../ApiConstant";




import { Client, Databases, Query } from "appwrite";


import axios from "axios";
import { saveAs } from 'file-saver';

const SourcesModels = () => {
  //const [trainAndGenerate, setTrainAndGenerate] = useState(false);
  const [temperatureValue, setTemperatureValue] = useState(0.7);
  const [MaximumLength, setMaximumLength] = useState(672);
  const [topP, settopP] = useState(0);
  const [frequencyPenalty, setfrequencyPenalty] = useState(2);
  const [presencePenalty, setpresencePenalty] = useState(2);
  const [modelName, setmodelName] = useState();
  const fileInputRef = useRef(null);
  
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [NumberofSubcriber, setNumberofSubcriber] = useState("10");
  const [NumberofUnsubcriber, setNumberofUnsubcriber] = useState("3");
  const [showModal, setShowModal] = useState(false);
  const [subscribed, setSubscribed] = useState(null);
  const [subsInfoModal, setSubsInfoModal] = useState(true);
  const [filePath, setFilePath] = useState("");
  const [fileExists, setFileExists] = useState(false);
  const [showDiv, setShowDiv] = useState(false);

  
const [showFaqs, setShowFaqs] = useState(false);
const [showUserProfile, setShowUserProfile] = useState(false);
const [showAboutUs, setShowAboutUs] = useState(false);
 


  const progressBar = document.getElementById('progress-bar-fill');
  const client = new Client();

  client 
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('64b4cb0d1b60dd5e3a99');

  const databases = new Databases(client);

 






// Function to trigger the export process

  const exportUsersToCSV = async () => {

  const access_token = localStorage.getItem('access_token');
  axios.get(ApiServer+'/api/admin/user-export-csv/', { responseType: 'blob' },
  
  )
    .then(response => {
      
      const blob = new Blob([response.data], { type: 'text/csv' });
      saveAs(blob, 'users.csv');
    })
    .catch(error => {
      // Handle the error
      //alert("error",error)
      console.error()
    });
}




useEffect(() => {
  if (showAboutUs || showFaqs || showUserProfile) {
    setShowModal(false);
  }
}, [showAboutUs, showFaqs, showUserProfile]);
useEffect(() => {
  if (showModal) {
    // setShowAboutUs(false);
    setShowFaqs(false);
    setShowUserProfile(false);
  }
}, [showModal]);



  const checkFilePath = () => {
    // Use the fs module to check the file existence
    const fs = require("fs");

    // Check if the file path exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File path does not exist
        setFileExists(false);
      } else {
        // File path exists
        setFileExists(true);
      }
    });
  };
  const handleInputChangee = (event) => {
    setFilePath(event.target.value);
  };

  const handleBrowseClickk = () => {
    checkFilePath();
  };


  useEffect(() => {
    const value = localStorage.getItem("access_token");

    if (value != null) {
      setSubscribed(true);
      setSubsInfoModal(false);
    }
  }, [subscribed]);



  useEffect(() => {
    if (showModal) {
      // setShowAboutUs(false)
      // setShowFaqs(false)
      // setShowUserProfile(false)
    }

  }, [showModal])
  useEffect(() => {
    const fetchparameterData = async () => {
      const access_token = localStorage.getItem('access_token');

     
    
      try {
        const response = await axios.get(ApiServer + '/api/admin/parameter/', 
       
        );
       

        const parameterdata = response.data;
        if (parameterdata) {
          setTemperatureValue(parameterdata[0].temperature);
          setMaximumLength(parameterdata[0].max_length);
          settopP(parameterdata[0].top_p);
          setfrequencyPenalty(parameterdata[0].frequency_penalty);
          setpresencePenalty(parameterdata[0].presence_penalty);
          setmodelName(parameterdata[0].model_name);


        }




        // ... do something with the response data
      } catch (error) {
        // Handle error
        console.error(error);
        console.log("Parameter load  error");
       // alert(error)
        // ... handle the error
      }
    };

    fetchparameterData();
  }, []);


  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const fileNames = Array.from(selectedFiles).map((file) => file.name);
    setSelectedFileNames(fileNames);



    // Do something with the selected files

  };
  const AddFilesData = async (formData) => {
    const access_token = localStorage.getItem('access_token');

    try {
      const response = await axios.post(
        ApiServer + '/api/admin/upload-file/',
        formData,
      );

      const responseDat = response.data;
      if (responseDat) {
        alert("submitted Your Files Data successfully")
        //window.location.reload();
        setSelectedFileNames([]);
      
        //setSelectedFileNames('');

      }

      
      
    } catch (error) {
      // Handle error
      console.error(error);
      // alert("Error")
      console.log("files error");
      // ... handle the error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fileInput = document.querySelector('input[name="file"]');
    const selectedFiles = fileInput.files;
 
    

    const selectedFilesLength = selectedFiles.length;
    if (selectedFilesLength!=0 && selectedFiles!=null)
    {
     
      AddFilesData(selectedFiles)
    }
    const fileInputt = document.querySelector('input[name="file"]');
    fileInputt.value = null;


  };


  useEffect(() => {

    const promise = databases.getDocument('64b5432b9e32fda9235a', '64b6a57a8ca13cf4ab29', '1');
    promise.then(function (response) {
      setNumberofSubcriber(response.subcriber);
      setNumberofUnsubcriber(response.unsubcriber);
  }, function (error) {
      console.log(error); // Failure
  });
    // const fetchDataa = async () => {
    //   const access_token = localStorage.getItem('access_token');

    //   try {
    //     const response = await axios.get(ApiServer + '/api/admin/subcriber/', {
    //       headers: {
    //         Authorization: `Bearer ${access_token}`,
    //       },
    //     });

    //     const responseDat = response.data;
    //     if (responseDat) {
    //       setNumberofSubcriber(responseDat[0].subcriber);
    //       setNumberofUnsubcriber(responseDat[0].unsubcriber)


    //     }




    //     // ... do something with the response data
    //   } catch (error) {
    //     // Handle error
    //     console.error(error);
    //     console.log("Subcribwer load  error");
    //     // ... handle the error
    //   }
    // };

    //fetchDataa();
  }, []);

  // const fetchData = async (formData) => {
  //   const access_token = localStorage.getItem('access_token');

  //   try {
  //     const response = await axios.put(
  //       ApiServer + "/api/admin/subcriber/",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       }
  //     );

  //     const responseDat = response.data;
  //     if (responseDat) {
  //       alert("submitted", responseDat)
  //     }

  //     console.log("profile data",);
  //     // ... do something with the response data
  //   } catch (error) {
  //     // Handle error
  //     console.error(error);
  //     //alert("Error")
  //     console.log("profilebb error");
  //     // ... handle the error
  //   }
  // };

  const handleSubmitForSubcriber = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const subcriber = formData.get('subcriber');
    const unsubcriber = formData.get('unsubcriber');
    databases.updateDocument('64b5432b9e32fda9235a', '64b6a57a8ca13cf4ab29', '1',{"subcriber":subcriber,"unsubcriber":unsubcriber});
   
    //fetchData(formData);
  };
  function setProgressBar(progress) {
    const fillElement = document.querySelector('.progress-bar-fill');
    const textElement = document.querySelector('.progress-bar-text');

    fillElement.style.transform = `rotate(${360 * progress}deg)`;
    textElement.textContent = `${Math.round(progress * 100)}%`;
  }

  // Example usage: Set progress to 0.75 (75%)



  const putDataforparameter = async (formData) => {
    const access_token = localStorage.getItem('access_token');
   
    //setProgressBar(0.75);
     setShowDiv(true);
   

    
    try {
      const response = await axios.put(
        ApiServer + '/api/admin/parameter/',
        formData,
       
      );

      const responseDat = response.data;
      if (responseDat) {
        //progressBar.style.width = '0%';
        setShowDiv(false);
        alert("Your Model has been  Trainied successfully")
      }

      console.log("profile data",);
      // ... do something with the response data
    } catch (error) {
      // Handle error
      // progressBar.style.width = '0%';
      setShowDiv(false);
      console.error(error);

      //alert("Error")
      console.log("profilebb error");
      // ... handle the error
    }
  };





  const handleSubmitForParameter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    putDataforparameter(formData)

  };


  return (
    <div>
      <div className="flex flex-col ">
        <Navbar
          onOpenModal={() => setShowModal(!showModal)}
          // onOpenUserProfile={() => setShowUserProfile(!showUserProfile)}
          // text="0/20 messages restants"
        />

        <div className="flex w-full h-[88vh] space-x-4 bg-bgCremo">
          <div className="w-64 flex flex-col justify-center space-y-44 p-2">
            <div className=" flex flex-col justify-center items-center">
              <Button text="Nouvelle question" />
              <div>
                <SideBtn />
              </div>
            </div>
            <AttentionNote />
          </div>

          <div className="w-full mt-4 px-8">
            <div className="w-full p-2 space-y-3">
              <div className="flex justify-end">
                <NavBtn
                  text="Export users in CSV"
                  bgcolor="#A1FEDA"
                  onFunctionCalled={exportUsersToCSV}
                />
              </div>

              {/* inputs and buttons  */}
              <div className="flex flex-col space-y-2">
                <div>
                  {showDiv && (
                    <div className="my">
                      <div class="progress-bar">
                        <div class="progress-bar-text">Train models</div>
                        <div class="progress-bar-circle">
                          <div class="progress-bar-fill"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <div className="flex gap-1">
                <InputWithIcon placeholder="Documents (PDF, doc, docx...etc)" />
                <NavBtn text="Browse"  type="file" bgcolor="#A1FEDA" width="150px" />
                <NavBtn text="Upload" bgcolor="#A1FEDA" width="150px" />
              </div> */}

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

                      <button type="button" onClick={handleBrowseClick}>
                        <NavBtn text="Browse" bgcolor="#A1FEDA" width="150px" />
                      </button>

                      <NavBtn
                        text="Upload"
                        type="submit"
                        bgcolor="#A1FEDA"
                        width="150px"
                      />
                    </div>
                  </form>
                </div>
                <div>
                  {/* <div className="flex gap-1">
                    <InputWithIcon placeholder="path to fodlers" />
                    <NavBtn text="Browse" bgcolor="#A1FEDA" width="150px" />
                    <NavBtn text="Validate" bgcolor="#A1FEDA" width="150px" />
                  </div> */}
                  {/* <div className="flex gap-1">
                  <input
                    type="text"
                    placeholder="Path to folders"
                    value={filePath}
                    onChange={handleInputChangee}
                  />
                  <NavBtn text="Browse" bgcolor="#A1FEDA" width="150px" onClick={handleBrowseClickk} />
                  <NavBtn text="Validate" bgcolor="#A1FEDA" width="150px" />
                </div>
                {fileExists && <p>File path exists!</p>}
                {!fileExists && <p>File path does not exist!</p>} */}
                </div>
              </div>

              {/* dropdown inputs and timeline  */}

              <form id="myForm" onSubmit={handleSubmitForParameter}>
                <div className="flex space-x-6 pt-3">
                  <div className="flex gap-2">
                    <div className="bg-white w-56 space-y-2 p-2">
                      <div className="space-y-1">
                        <label
                          htmlFor="default-range"
                          className="flex justify-between space-x-4 mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                        >
                          <div>Temperature</div>
                          <div>{temperatureValue}</div>
                        </label>

                        <input
                          id="default-range"
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          name="temperture"
                          value={temperatureValue}
                          onChange={(e) => setTemperatureValue(e.target.value)}
                          className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-lightGraybg"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="max-length-range"
                          className="flex justify-between space-x-4 mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                        >
                          <div>Maximum Length</div>
                          <div>{MaximumLength}</div>
                        </label>
                        <input
                          id="max-length-range"
                          type="range"
                          min="0"
                          max="2000"
                          step="1"
                          name="max_length"
                          value={MaximumLength}
                          onChange={(e) => setMaximumLength(e.target.value)}
                          className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-lightGraybg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white w-56 space-y-2 p-2 ">
                    <div className="space-y-1">
                      <label
                        htmlFor="topP-range"
                        className="flex justify-between space-x-4 mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                      >
                        <div>Top P</div>
                        <div className="border border-gray-200 p-0.5">
                          {topP}
                        </div>
                      </label>
                      <input
                        id="topP-range"
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        name="top_p"
                        value={topP}
                        onChange={(e) => settopP(e.target.value)}
                        className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-lightGraybg"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="frequency-penalty-range"
                        className="flex justify-between space-x-4 mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                      >
                        <div>Frequency Penalty</div>
                        <div>{frequencyPenalty}</div>
                      </label>
                      <input
                        id="frequency-penalty-range"
                        type="range"
                        min="0.0"
                        max="2"
                        step="0.1"
                        name="frequency_penalty"
                        value={frequencyPenalty}
                        onChange={(e) => setfrequencyPenalty(e.target.value)}
                        className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-lightGraybg"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="presence-penalty-range"
                        className="flex justify-between space-x-4 mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                      >
                        <div>Presence Penalty</div>
                        <div>{presencePenalty}</div>
                      </label>
                      <input
                        id="presence-penalty-range"
                        type="range"
                        min="0.0"
                        max="2"
                        step="0.1"
                        name="presence_penalty"
                        value={presencePenalty}
                        onChange={(e) => setpresencePenalty(e.target.value)}
                        className="w-52 h-2 rounded-lg appearance-none cursor-pointer dark:bg-lightGraybg"
                      />
                    </div>
                  </div>

                  {/* dropdown  */}
                  <div className="flex flex-col">
                    <label htmlFor="fruit">Model</label>
                    <select
                      id="fruits"
                      className="outline-none border focus:border-green-600 rounded-md px-4 h-8"
                      name="model_name"
                      value={modelName}
                      onChange={(e) => setmodelName(e.target.value)}
                    >
                      <option value={modelName}>{modelName}</option>
                      <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                      <option value="text-davinci-003" disabled>
                        text-davinci-003
                      </option>

                      <option value="text-curie-001" disabled>
                        text-curie-001
                      </option>
                      <option value="text-babbage-001" disabled>
                        text-babbage-001
                      </option>
                      <option value="text-ada-001" disabled>
                        text-ada-001
                      </option>
                      <option value="text-davinci-002" disabled>
                        text-davinci-002
                      </option>
                      <option value="text-davinci-001" disabled>
                        text-davinci-001
                      </option>
                      {/* <option value="davinci-instruct-beta">
                        davinci-instruct-beta
                      </option>
                      <option value=" davinci ">davinci</option> */}
                    </select>
                  </div>
                </div>

                <div className="flex justify-center w-full relative pt-3">
                  <NavBtn
                    type="submit"
                    // onFunctionCalled={() => setTrainAndGenerate(!trainAndGenerate)}
                    text="Train and generate model"
                    bgcolor="#A1FEDA"
                    width="220px"
                  />
                </div>
              </form>

              <form id="subForm" onSubmit={handleSubmitForSubcriber}>
                <div className="flex flex-col space-y-3 mt-2">
                  <label htmlFor="fruit">Subcriber Prompt</label>
                  <input
                    className={`bg-inputBg p-2 rounded-lg text-sm`}
                    type="number"
                    style={{ width: "200px" }}
                    value={NumberofSubcriber}
                    onChange={(e) => setNumberofSubcriber(e.target.value)}
                    name="subcriber"
                  />
                  <label htmlFor="fruit">Unsubcriber Prompt</label>
                  <input
                    className={`bg-inputBg p-2 rounded-lg text-sm`}
                    type="number"
                    value={NumberofUnsubcriber}
                    style={{ width: "200px" }}
                    onChange={(e) => setNumberofUnsubcriber(e.target.value)}
                    name="unsubcriber"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <NavBtn
                    type="submit"
                    text="Save"
                    bgcolor="#A1FEDA"
                    width="150px"
                  />
                </div>
              </form>
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
    </div>
  );
};
  
//   return (
//     <div>
     




//       <div className="flex flex-col ">
//         <Navbar
//           onOpenModal={() => setShowModal(!showModal)}


//           // onOpenUserProfile={() => setShowUserProfile(!showUserProfile)}
//           // text="0/20 messages restants"

//         />


//         <div className="flex w-full h-[88vh] space-x-4 bg-bgCremo">
//           <div className="w-72 flex flex-col justify-between  items-center bg-bgCremo p-5">
//             <div className="w-64  flex flex-col justify-center space-y-44 p-2">
//               <div className=" flex flex-col justify-center items-center">
//                 <Button text="Nouvelle question" />
//                 <div>
//                   <SideBtn />
//                 </div>
//               </div>
//               <AttentionNote />
//             </div>


//           </div>





//           <div className="w-full  mt-5">


//             <div className="w-full p-2 space-y-3">
//               <div className="flex justify-end">
//                 <NavBtn text="Export users in CSV" bgcolor="#A1FEDA" onFunctionCalled={exportUsersToCSV}/>

//               </div>


//               {/* inputs and buttons  */}
//               <div className="flex flex-col space-y-3 ">


//                 <div>
//                 {showDiv && <div className="my">
//                 <div class="progress-bar">
//                       <div class="progress-bar-text">Train  models</div>
//                       <div class="progress-bar-circle">
//                         <div class="progress-bar-fill"></div>
//                       </div>

//                     </div>
                  
                  
                  
//                   </div>}
                  
//                   {/* <div className="flex gap-1">
//                 <InputWithIcon placeholder="Documents (PDF, doc, docx...etc)" />
//                 <NavBtn text="Browse"  type="file" bgcolor="#A1FEDA" width="150px" />
//                 <NavBtn text="Upload" bgcolor="#A1FEDA" width="150px" />
//               </div> */}

//                   <form onSubmit={handleSubmit}>
//                     <div className="flex gap-1">
//                       <input
//                         id="file-input"
//                         name='file'
//                         ref={fileInputRef}
//                         type="file"
//                         style={{ display: 'none' }}
//                         onChange={handleFileChange}
//                         multiple
//                       />
//                       <InputWithIcon
//                         placeholder="Documents (PDF, doc, docx...etc)"
//                         value={selectedFileNames.join(', ')}
//                         readOnly

//                       />

//                       <button type="button" onClick={handleBrowseClick}>
//                         <NavBtn text="Browse" bgcolor="#A1FEDA" width="150px" />
//                       </button>

//                       <NavBtn text="Upload" type="submit" bgcolor="#A1FEDA" width="150px" />


//                     </div>
//                   </form>
//                 </div>
//                 <div>
//                   {/* <div className="flex gap-1">
//                     <InputWithIcon placeholder="path to fodlers" />
//                     <NavBtn text="Browse" bgcolor="#A1FEDA" width="150px" />
//                     <NavBtn text="Validate" bgcolor="#A1FEDA" width="150px" />
//                   </div> */}
//                   {/* <div className="flex gap-1">
//                   <input
//                     type="text"
//                     placeholder="Path to folders"
//                     value={filePath}
//                     onChange={handleInputChangee}
//                   />
//                   <NavBtn text="Browse" bgcolor="#A1FEDA" width="150px" onClick={handleBrowseClickk} />
//                   <NavBtn text="Validate" bgcolor="#A1FEDA" width="150px" />
//                 </div>
//                 {fileExists && <p>File path exists!</p>}
//                 {!fileExists && <p>File path does not exist!</p>} */}
//                 </div>
//               </div>

//               {/* dropdown inputs and timeline  */}



//               <form id="myForm" onSubmit={handleSubmitForParameter}>

//                 <div className="flex space-x-6 pt-3">


//                   <div className="flex gap-2">


//                     <div className="bg-white w-56 space-y-2 p-2">
//                       <div className="space-y-1">
//                         <label
//                           htmlFor="default-range"
//                           className="flex justify-between space-x-4 mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
//                         >
//                           <div>Temperature</div>
//                           <div>{temperatureValue}</div>
//                         </label>

//                         <input
//                           id="default-range"
//                           type="range"
//                           min="0"
//                           max="1"
//                           step="0.1"
//                           name="temperture"
//                           value={temperatureValue}
//                           onChange={(e) => setTemperatureValue(e.target.value)}
//                           className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-lightGraybg"
//                         />
//                       </div>
//                       <div className="space-y-1">
//                         <label
//                           htmlFor="max-length-range"
//                           className="flex justify-between space-x-4 mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
//                         >
//                           <div>Maximum Length</div>
//                           <div>{MaximumLength}</div>
//                         </label>
//                         <input
//                           id="max-length-range"
//                           type="range"
//                           min="0"
//                           max="2000"
//                           step="1"
//                           name="max_length"
//                           value={MaximumLength}
//                           onChange={(e) => setMaximumLength(e.target.value)}
//                           className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-lightGraybg"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-white w-56 space-y-2 p-2 ">
//                     <div className="space-y-1">
//                       <label
//                         htmlFor="topP-range"
//                         className="flex justify-between space-x-4 mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
//                       >
//                         <div>Top P</div>
//                         <div className="border border-gray-200 p-0.5">{topP}</div>
//                       </label>
//                       <input
//                         id="topP-range"
//                         type="range"
//                         min="0"
//                         max="2"
//                         step="0.1"
//                         name="top_p"
//                         value={topP}
//                         onChange={(e) => settopP(e.target.value)}
//                         className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-lightGraybg"
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <label
//                         htmlFor="frequency-penalty-range"
//                         className="flex justify-between space-x-4 mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
//                       >
//                         <div>Frequency Penalty</div>
//                         <div>{frequencyPenalty}</div>
//                       </label>
//                       <input
//                         id="frequency-penalty-range"
//                         type="range"
//                         min="0.0"
//                         max="2"
//                         step="0.1"
//                         name="frequency_penalty"
//                         value={frequencyPenalty}
//                         onChange={(e) => setfrequencyPenalty(e.target.value)}
//                         className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-lightGraybg"
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <label
//                         htmlFor="presence-penalty-range"
//                         className="flex justify-between space-x-4 mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
//                       >
//                         <div>Presence Penalty</div>
//                         <div>{presencePenalty}</div>
//                       </label>
//                       <input
//                         id="presence-penalty-range"
//                         type="range"
//                         min="0.0"
//                         max="2"
//                         step="0.1"
//                         name="presence_penalty"
//                         value={presencePenalty}
//                         onChange={(e) => setpresencePenalty(e.target.value)}
//                         className="w-52 h-2 rounded-lg appearance-none cursor-pointer dark:bg-lightGraybg"
//                       />
//                     </div>
//                   </div>

//                   {/* dropdown  */}
//                   <div className="flex flex-col">
//                     <label htmlFor="fruit">Model</label>
//                     <select
//                       id="fruits"
//                       className="outline-none border focus:border-green-600 rounded-md px-4 h-8"
//                       name="model_name"
//                       value={modelName}
//                       onChange={(e) => setmodelName(e.target.value)}
//                     >
                     
                     
//                         <option value={modelName}>{modelName}</option>
//                         <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
//                       <option value="text-davinci-003" disabled>text-davinci-003</option>
                    
//                       <option value="text-curie-001" disabled>text-curie-001</option>
//                       <option value="text-babbage-001" disabled>text-babbage-001</option>
//                       <option value="text-ada-001" disabled>text-ada-001</option>
//                       <option value="text-davinci-002" disabled>text-davinci-002</option>
//                       <option value="text-davinci-001" disabled>text-davinci-001</option>
//                       {/* <option value="davinci-instruct-beta">
//                         davinci-instruct-beta
//                       </option>
//                       <option value=" davinci ">davinci</option> */}





//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex justify-center w-full relative pt-3">
//                   <NavBtn
//                     type="submit"
//                     // onFunctionCalled={() => setTrainAndGenerate(!trainAndGenerate)}
//                     text="Train and generate model"
//                     bgcolor="#A1FEDA"
//                     width="220px"
//                   />
//                 </div>

//               </form>


//               <form id="subForm" onSubmit={handleSubmitForSubcriber}>
//                 <div className="flex flex-col space-y-3 mt-2">
//                   <label htmlFor="fruit">Subcriber Prompt</label>
//                   <input className={`bg-inputBg p-2 rounded-lg text-sm`}

//                     type="number"
//                     style={{ width: "200px" }}

//                     value={NumberofSubcriber}
//                     onChange={(e) => setNumberofSubcriber(e.target.value)}
//                     name='subcriber'

//                   />
//                   <label htmlFor="fruit">Unsubcriber Prompt</label>
//                   <input className={`bg-inputBg p-2 rounded-lg text-sm`}
//                     type="number"
//                     value={NumberofUnsubcriber}
//                     style={{ width: "200px" }}

//                     onChange={(e) => setNumberofUnsubcriber(e.target.value)}
//                     name='unsubcriber'
//                   />
//                 </div>
//                 <div className="flex items-center justify-center">
//                   <NavBtn type="submit" text="Save" bgcolor="#A1FEDA" width="150px" />
//                 </div>
//               </form>
//             </div>




//           </div>
//           {!subscribed && showModal ? (
//             <SubUnsubUsers
//               onOpenModal={() => setShowModal(!showModal)}
//               type={2}

//             />
//           ) : (
//             subscribed &&
//             showModal && (
//               <SubUnsubUsers
//                 onOpenModal={() => setShowModal(!showModal)}
//                 type={1}

//               />
//             )
//           )}



//         </div>

//       </div>

//     </div>




//   );
// };

export default SourcesModels;
