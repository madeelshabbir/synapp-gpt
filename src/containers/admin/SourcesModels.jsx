import { useState, useEffect } from "react";
import axios from "axios";

import NavBtn from "../../Components/Button/NavBtn";
import Navbar from "../../Components/navbar/Navbar";
import AttentionNote from "../../Components/AttentionNote/AttentionNote";
import { SideBtn } from "./SideBtn";
import React, { useRef } from 'react';
import { SubUnsubUsers } from "../chat/SubUnsubUsers";
import { Faq } from "../chat/faq";
import { AboutUs } from "../chat/aboutUs";

const SourcesModels = () => {
  const [temperatureValue, setTemperatureValue] = useState(0.7);
  const [maximumLength, setMaximumLength] = useState(672);
  const [topP, settopP] = useState(0);
  const [frequencyPenalty, setfrequencyPenalty] = useState(2);
  const [presencePenalty, setpresencePenalty] = useState(2);
  const [modelName, setmodelName] = useState();
  const [NumberofSubcriber, setNumberofSubcriber] = useState("10");
  const [NumberofUnsubcriber, setNumberofUnsubcriber] = useState("3");
  const [showModal, setShowModal] = useState(false);
  const [subscribed, setSubscribed] = useState(null);
  const [subsInfoModal, setSubsInfoModal] = useState(true);
  const [showDiv, setShowDiv] = useState(false);

  const [showFaqs, setShowFaqs] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const apiServer = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    if (showAboutUs || showFaqs || showUserProfile) {
      setShowModal(false);
    }
  }, [showAboutUs, showFaqs, showUserProfile]);

  useEffect(() => {
    if (showModal) {
      setShowFaqs(false);
      setShowUserProfile(false);
    }
  }, [showModal]);

  useEffect(() => {
    const value = localStorage.getItem("access_token");

    if (value != null) {
      setSubscribed(true);
      setSubsInfoModal(false);
    }
  }, [subscribed]);

  useEffect(() => {
    const fetchparameterData = async () => {
      const access_token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`${apiServer}/api/admin/parameter/`);
        const parameterdata = response.data.parameter;
        if (parameterdata) {
          setTemperatureValue(parameterdata.temperature);
          setMaximumLength(parameterdata.maximumLength);
          settopP(parameterdata.topP);
          setfrequencyPenalty(parameterdata.frequencyPenalty);
          setpresencePenalty(parameterdata.presencePenalty);
          setmodelName(parameterdata.modelName);
        }
      } catch (error) {
        console.log(error);
        console.log("Parameter load  error");
      }
    };

    fetchparameterData();
  }, []);

  useEffect(() => {
    const fetchPermissionData = async() => {
      try {
        const response = await axios.get(`${apiServer}/api/admin/permissions/?timestamp=${Date.now()}`);
        const permissionData = response.data.permissions;
        if (permissionData) {
          setNumberofSubcriber(permissionData.subscriber);
          setNumberofUnsubcriber(permissionData.unsubscriber);
        }
      } catch (error) {
        console.log(error);
        console.log("Parameter load  error");
      }
    }
    fetchPermissionData();
  }, []);

  const handleSubmitForSubcriber = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const requestBody = new FormData();
    requestBody.append('subscriber', formData.get('subcriber'));
    requestBody.append('unsubscriber', formData.get('unsubcriber'));
    try {
      const response = await axios.put(`${apiServer}/api/admin/permissions/`, requestBody);
      const permissionData = response.data.permissions;
      if (permissionData) {
        setNumberofSubcriber(permissionData.subscriber);
        setNumberofUnsubcriber(permissionData.unsubscriber);
      }
      alert('Data updated successfully')
    } catch (error) {
      console.log(error);
      alert('Something went wrong while updating the data')
    }
  };

  const putDataforparameter = async (e) => {
    const formData = new FormData();
    formData.append('topP', topP);
    formData.append('temperature', temperatureValue);
    formData.append('maximumLength', maximumLength);
    formData.append('frequencyPenalty', frequencyPenalty);
    formData.append('presencePenalty', presencePenalty);
    formData.append('modelName', modelName);

    const access_token = localStorage.getItem('access_token');
    let button = document.getElementById('trainModelDiv').querySelector('button')
    button.disabled = true;
    setShowDiv(true);
    try {
      const response = await axios.put(
        `${apiServer}/api/admin/parameter/`,
        formData
      );

      const responseDat = response.data;
      if (responseDat) {
        setShowDiv(false);
        alert("Your model has been trained successfully")
        button.disabled = false;
      }
    } catch (error) {
      setShowDiv(false);
      console.log(error);
      button.disabled = false;
    }
  };

  const handleSubmitForParameter = (e) => {
    e.preventDefault();
    putDataforparameter(e.target)
  };

  const handleCloseProfile = (id) => {
    setShowUserProfile(false);
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col ">
        <Navbar
          onOpenModal={() => setShowModal(!showModal)}
        />
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
            <div className="w-full p-2 space-y-3 d-flex justify-center">
              <div className="bg-white w-9/12 p-3">
                <h3 className="text-center">Model Setting</h3>
                <form id="myForm" onSubmit={handleSubmitForParameter}>
                  <div className="flex space-x-6 pt-3">
                    <div className="flex gap-2">
                      <div className="bg-white w-56 space-y-2 p-2">
                        <div className="space-y-1">
                          <label
                            htmlFor="default-range"
                            className="flex justify-between space-x-4 mb-2 text-xs font-medium"
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
                            className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div className="space-y-1">
                          <label
                            htmlFor="max-length-range"
                            className="flex justify-between space-x-4 mb-2 text-xs font-medium"
                          >
                            <div>Maximum Length</div>
                            <div>{maximumLength}</div>
                          </label>
                          <input
                            id="max-length-range"
                            type="range"
                            min="0"
                            max="2000"
                            step="1"
                            name="max_length"
                            value={maximumLength}
                            onChange={(e) => setMaximumLength(e.target.value)}
                            className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white w-56 space-y-2 p-2 ">
                      <div className="space-y-1">
                        <label
                          htmlFor="topP-range"
                          className="flex justify-between space-x-4 mb-2 text-xs font-medium"
                        >
                          <div>Top P</div>
                          <div className="p-0.5">
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
                          className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="frequency-penalty-range"
                          className="flex justify-between space-x-4 mb-2 text-xs font-medium"
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
                          className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="presence-penalty-range"
                          className="flex justify-between space-x-4 mb-2 text-xs font-medium"
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
                          className="w-52 h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                        />
                      </div>
                    </div>

                    {/* dropdown  */}
                    <div className="flex flex-col">
                      <label htmlFor="fruit" className="text-xs font-medium pb-2">Model</label>
                      <select
                        id="model_name"
                        className="outline-none border focus:border-green-600 rounded-md px-4 h-8"
                        name="model_name"
                        value={modelName}
                        onChange={(e) => setmodelName(e.target.value)}
                      >
                        <option value={modelName}>{modelName}</option>
                        <option value="gpt-3">gpt-3</option>
                        <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                        <option value="gpt-4">gpt-4</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end w-full relative pt-3" id="trainModelDiv">
                    <NavBtn
                      type="submit"
                      text="Train and generate model"
                      bgcolor="#A1FEDA"
                      width="220px"
                    />
                  </div>
                </form>
              </div>

              <div className="bg-white w-9/12 p-3">
                <h3 className="text-center">Prompt Setting</h3>
                <form id="subForm" onSubmit={handleSubmitForSubcriber}>
                  <div className="flex flex-col space-y-3 mt-2">
                    <label htmlFor="fruit" className="text-xs font-medium">Subcriber Prompt</label>
                    <input
                      className={`bg-inputBg p-2 rounded-lg text-sm`}
                      type="number"
                      style={{ width: "200px" }}
                      value={NumberofSubcriber}
                      onChange={(e) => setNumberofSubcriber(e.target.value)}
                      name="subcriber"
                    />
                    <label htmlFor="fruit" className="text-xs font-medium">Unsubcriber Prompt</label>
                    <input
                      className={`bg-inputBg p-2 rounded-lg text-sm`}
                      type="number"
                      value={NumberofUnsubcriber}
                      style={{ width: "200px" }}
                      onChange={(e) => setNumberofUnsubcriber(e.target.value)}
                      name="unsubcriber"
                    />
                  </div>
                  <div className="flex justify-end w-full relative pt-3">
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
    </div>
  );
};

export default SourcesModels;
