import { ASSETS } from "../../assets/path";
import { RiThumbUpLine, RiThumbDownLine } from "react-icons/ri";
import { Subscribed } from "./subscribed";
import { FaRegFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBtn from "../../Components/Button/NavBtn";
//import { useDispatch, useSelector } from "react-redux";
import { Question } from "../../redux/actions/QuestionActions";
import { useEffect, useState } from "react";
//import { Tooltip } from 'react-tooltip';
import { ChatTooltip } from "../../Components/Charts/tooltip";

export const ChatBox = ({
  selectedUser,
  activeTab,
  setActiveChat,
  submitHandler,
  newMessage,
  chatWith,
  handleThumbsUp,
  handleThumbsDown,
  user,
  messagesEndRef,
  subscribed,
  setSubscribed,
  onEnterSubmit,
  handleCloseFront,
}) => {
  const navigate = useNavigate();

  // const handleThumbsUp = (id) => {
  //   setThumbsUp(!thumbsUp);
  //   setThumbsDown(false);
  //   console.log("UP id",id)

  // };

  const handleKeyDown = (e) => {
    // e.preventDefault();
    if (e.key === "Enter") {
      onEnterSubmit();
      handleCloseFront();

    }
  };

  return (
    <div className="py-4 w-full lg:h-[64vh] 2xl:h-[70vh]">
      <div className=" bg-transparent h-full flex flex-col justify-between">
        <div className=" flex flex-col pt-5 text-white Exo-Regular text-sm lg:text-normal gap-2  overflow-auto scroll-[#ccc]  scroll-smooth  px-8 ">
          {subscribed ? (
            <div>
              <div className=" flex justify-center m-5">
                <img src={ASSETS.PROFILES.ROBO} className="h-10 w-10" />
              </div>
              <p className="text-sm text-textgray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
              <div className="flex gap-5 justify-center p-10 text-black">
                <NavBtn
                  onFunctionCalled={() => navigate("/signup")}
                  text="Inscription"
                  bgcolor="#A1FEDA"
                />
                <NavBtn
                  text="Annuler"
                  bordercolor="black"
                  onFunctionCalled={setSubscribed}
                />
              </div>
            </div>
          ) : (
            <>
              {chatWith?.map((items, id) => (
                <div
                  key={id}
                  className={`flex flex-row  items-center gap-2   ${
                    items?.message_by == user
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="flex flex-col gap-1 mb-5 text-black ">
                    {items?.message && (
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-3">
                          {items?.message_by !== user && (
                            <img
                              src={ASSETS.PROFILES.ROBO}
                              alt=""
                              className="ml-2 w-7 h-7 rounded-full object-contain"
                            />
                          )}

                          <div
                            ref={messagesEndRef}
                            className={`px-4 py-1.5  rounded-md ${
                              items?.message_by !== user
                                ? "bg-textSenderBG"
                                : "bg-textUserBG"
                            }`}
                          >
                            {items?.tooltip ? (
                              <ChatTooltip
                                tooltip={items?.tooltipContent}
                                orignal={items?.message}
                              />
                            ) : (
                              // Render this block if items.tooltip is truthy

                              // Render this block if items.tooltip is falsy
                              items?.message
                            )}
                            {/* {items?.tooltip && (
                              <ExampleTool tooltip={items?.tooltip} orignal={items?.message} />
                            )} */}
                          </div>

                          {items.attachment &&
                            items?.message_by !== user && (
                              <div className="mr-2 flex items-center space-x-1">
                                {/* <RiThumbUpLine />
                              <RiThumbDownLine /> */}
                                <span
                                  className={`hover:scale-110 ${
                                    items.status == 1 ? "text-green-600" : ""
                                  }`}
                                  onClick={() => handleThumbsUp(items.id)}
                                >
                                  <RiThumbUpLine />
                                </span>
                                <span
                                  className={`hover:scale-110 ${
                                    items.status == 0 ? "text-red-500" : ""
                                  }`}
                                  onClick={() => handleThumbsDown(items.id)}
                                >
                                  <RiThumbDownLine />
                                </span>
                              </div>
                            )}
                        </div>
                        {items.sources && (
                          <div className="mr-2 flex ml-12 text-gray-500 space-x-1 font-medium">
                            <div className="flex space-x-1 ">
                              <FaRegFolderOpen className="text-xl" />{" "}
                              <span className="text-xs">Sources(s)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 text-xs">
                              {items.sources.map((item, index) => (
                                <div key={index}>
                                  <a href={items.attachment[index]} target="_blank">{item}</a>
                                  {index < items.sources.length - 1 && ', '}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <form
        onSubmit={submitHandler}
        id="messageForm"
        className=" py-10 px-5 w-full "
      >
        <div className="p-5 h-16 w-full  flex  rounded-md border border-gray-300  justify-between items-center">
          <textarea
            type="text"
            name="question"
            ref={newMessage}
            onKeyDown={handleKeyDown}
            className="outline-none w-full bg-transparent  border-0  placeholder:text-gray-extraLight text-sm Exo-Regular resize-none"
            placeholder="Write your message here..."
          />

          <button
            type="submit"
            className="cursor-pointer font-semibold rounded-md h-7 w-28 text-sm md:text-normal  bg-aqua"

          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};
