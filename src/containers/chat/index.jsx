import { useEffect, useRef, useState } from "react";
import { Client, Databases, Query } from "appwrite";

import { ChatBox } from "./chatbox";
import Navbar from "../../Components/navbar/Navbar";
import AttentionNote from "../../Components/AttentionNote/AttentionNote";
import Button from "../../Components/Button/Button";
import { Faq } from "./faq";
import { AboutUs } from "./aboutUs";
import { UserUpdate } from "./userProfile";
import { SubUnsubUsers } from "./SubUnsubUsers";
import { SubscriptionModal } from "../../Components/modal/SubscriptionModal";
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { ApiServer } from "../../ApiConstant";
import axios from "axios";
import { ChatTooltip } from "../../Components/Charts/tooltip";
export const ChatComponent = () => {
  const username = localStorage.getItem("username");
  const messagesEndRef = useRef(null);
  const promptRef = useRef(null);
  const newMessage = useRef(null);
  const [showFaqs, setShowFaqs] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [PromtLimitmodal, setPromtLimitmodal] = useState(false);
  const [chatWith, setChatWith] = useState([]);
  const [promptchat, setPromptChat] = useState([]);
  const [user, setUser] = useState({
    email: "rimsha@gmail.com",
  });
  const [subscribed, setSubscribed] = useState(null);
  const [subsInfoModal, setSubsInfoModal] = useState(true);
  const [prompts, setPrompts] = useState([]);
  const [promptSelected, setPromptSelected] = useState();
  const [editPromptSelected, setEditPromptSelected] = useState(false);
  const [editPromptText, setEditPromptText] = useState();
  const [NumberofSubcriber, setNumberofSubcriber] = useState("20");
  const [NumberofUnsubcriber, setNumberofUnsubcriber] = useState(2);
  const [question, setQuestion] = useState(0);
  const [textt, setTextt] = useState(null);
  const [check, setCheck] = useState(4);
  const [ipAddress, setIPAddress] = useState("");
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);
  const [count, setcount] = useState(0);

  const access_token = localStorage.getItem("access_token");
  const client = new Client();

  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64b4cb0d1b60dd5e3a99');

  const databases = new Databases(client);
  const SubmitQuestion = async (formData) => {
    try {
      const response = await axios.post(ApiServer + '/api/admin/question/',
        formData,
      );
      const answer = response.data;
      if (answer) {
        const newMessage = {
          DateAndtime: Date.now(),
          message: answer.data,
          sources: answer.sources,
          message_by: answer.message_by,
          attachment: answer.attachments,
          status: -1,
          id: answer.id,
        };
        setChatWith((prevState) => [...prevState, newMessage]);

        let myquestion = answer.question;
        let clone = [...prompts];
        const MAX_WORDS = 5;
        const words = myquestion.split(" ").filter(Boolean);
        const wordCount = words.length;
        let truncatedAnswer = "";
        let remainingWords = "";
        if (wordCount <= MAX_WORDS) {
          truncatedAnswer = myquestion
            .split(" ")
            .slice(0, MAX_WORDS)
            .join(" ");
        } else {
          truncatedAnswer =
            myquestion.split(" ").slice(0, MAX_WORDS).join(" ") +
            "...";
          remainingWords = myquestion
            .split(" ")
            .slice(MAX_WORDS)
            .join(" ");
        }

        const question = {
          DateAndtime: Date.now(),
          message: truncatedAnswer,
          message_by: user?.email,
          attachment: false,
          tooltipContent: remainingWords,
          tooltip: true,
          status: -1,
          id: answer.id,
          truncatedAnswer: truncatedAnswer,
          answer: answer.data,
          question: myquestion
        };

        let cont_check = false;
        const newItem = clone.find(item => item.truncatedAnswer === "New Prompt");

        if (newItem) {
          newItem.DateAndtime = Date.now();
          newItem.message = truncatedAnswer;
          newItem.message_by = user?.email;
          newItem.attachment = false;
          newItem.tooltipContent = remainingWords;
          newItem.tooltip = true;
          newItem.status = -1;
          newItem.id = answer.id;
          newItem.truncatedAnswer = truncatedAnswer;
          newItem.answer = answer.data;
          newItem.question = myquestion;
          cont_check = true;
        }
        if (!cont_check) {
          clone.push(question);
          setPrompts(clone);
        }
      }
    }
    catch (error) {
      console.error(error);
      console.log("profilebb error");
    }
  };

  function formatToISO(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+00:00`;
  }


  useEffect(() => {
    const fetchChatData = async () => {
      const username = localStorage.getItem("username");
      let search = localStorage.getItem("username");
      //await account.deleteSession('current');
      //setUser(null)
      if (username == null) {
        if (!ipAddress) {
          fetchIPAddress();

        }


        search = ipAddress
      }


      var bodyFormData = new FormData();
      const client = new Client();

      client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('64b4cb0d1b60dd5e3a99');

      const databases = new Databases(client);



      let promise = databases.listDocuments(
        '64b5432b9e32fda9235a', '64b641e090dc4b18246a',

        [
          Query.equal('user_info', search),

        ]
      );





      promise.then(function (response) {

        let data = []

        if (username) {
          const currentDate = new Date();
          const currentISOString = formatToISO(currentDate);

          let today = currentISOString.split('T')[0] + 'T00:00:00.000+00:00'
          const dataList = response['documents']
          data = dataList.filter((obj) => {
            const objDate = obj.created_at.split('T')[0]; // Get only the date part of the object's 'created_at' (YYYY-MM-DD)
            return obj.created_at === today;
          });
        }
        else {
          data = response['documents'];
        }





        const length = data.length;
        setcount(length);

        const arry = [];
        let arr = [...chatWith];
        let myarr = [...promptchat];
        let clone = [...prompts];
        data.forEach((item) => {
          const MAX_WORDS = 5; // Maximum number of words to show

          const myquestion = item.question;
          const words = myquestion.split(" ").filter(Boolean); // Split the string by spaces and remove empty strings
          const wordCount = words.length;
          let truncatedAnswer = "";
          let remainingWords = "";
          if (wordCount <= 5) {
            truncatedAnswer = item.question
              .split(" ")
              .slice(0, MAX_WORDS)
              .join(" ");
          } else {
            truncatedAnswer =
              item.question.split(" ").slice(0, MAX_WORDS).join(" ") + "...";
            remainingWords = item.question
              .split(" ")
              .slice(MAX_WORDS)
              .join(" ");
          }

          //const truncatedAnswer = item.question.split(' ').slice(0, MAX_WORDS).join(' ')+"...";

          // const remainingWords = item.question.split(' ').slice(MAX_WORDS).join(' ');
          const question = {
            DateAndtime: item.created_at,
            message: truncatedAnswer,
            message_by: user?.email,
            attachment: false,
            tooltipContent: remainingWords,
            tooltip: true,
            status: item.status,
            id: item.$id,
            truncatedAnswer: truncatedAnswer,
            answer: item.answer,
            question: item.question,
            // message_by: "hussain@gmail.com",
            // attachment: false,
          };

          // clone.push(`Prompt ${index}`);
          clone.push(question);
        });

        setPrompts(clone);


      }, function (error) {
        console.log(error);
      });



    };

    fetchChatData();
  }, [ipAddress]);

  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org/?format=json");
        const data = await response.json();

        if (data) {
          setIPAddress(data.ip);
        }
      } catch (error) {
        //console.error('Error fetching IP address:', error);
        console.log("");
      }
    };

    fetchIPAddress();
  }, []);
  const fetchIPAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org/?format=json");
      const data = await response.json();

      if (data) {
        setIPAddress(data.ip);
      }
    } catch (error) {
      //console.error('Error fetching IP address:', error);
      console.log("");
    }
  };



  const fetchDataa = async () => {


    const promise = databases.getDocument('64b5432b9e32fda9235a', '64b6a57a8ca13cf4ab29', '1');

    promise.then(function (response) {
      setNumberofSubcriber(response.subcriber);
      setNumberofUnsubcriber(response.unsubcriber);
    }, function (error) {
      console.log(error); // Failure
    });

  };

  useEffect(() => {
    // setChatWith([]);

    if (!subscribed) {
      setChatWith([]);
      fetchDataa();
      setTextt(`${count}/${NumberofUnsubcriber} messages restants`);
      setCheck(NumberofUnsubcriber);
    } else {
      setChatWith([]);
      fetchDataa();
      setCheck(NumberofSubcriber);
      setTextt(`${count}/${NumberofSubcriber} messages restants`);
    }
  }, [subscribed]);

  // const access_token=localStorage.getItem("access_token");

  useEffect(() => {
    if (access_token) {
      setCheck(NumberofSubcriber);
      setTextt(`${count}/${NumberofSubcriber} messages restants`);
    } else {
      setTextt(`${count}/${NumberofUnsubcriber} messages restants`);
      setCheck(NumberofUnsubcriber);
    }
  }, [NumberofUnsubcriber]);
  useEffect(() => {
    if (access_token) {
      setCheck(NumberofSubcriber);
      setTextt(`${count}/${NumberofSubcriber} messages restants`);
    } else {
      setTextt(`${count}/${NumberofUnsubcriber} messages restants`);
      setCheck(NumberofUnsubcriber);
    }
  }, [count]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newMessage.current.value === "") {
      return alert("Please enter message to submit");
    } else {
      setSubsInfoModal(false);
      let index = prompts.length + 1;
      if (
        prompts.length >= NumberofUnsubcriber &&
        !subscribed
      ) {
        setPromtLimitmodal(!PromtLimitmodal);
      } else if (prompts.length >= NumberofSubcriber && subscribed) {
        alert("Your are reached Your limits for today Come back Tomorrow");
      } else {
        if (index <= check) {
          //   let clone = [...prompts];
          // clone.push(`Prompt ${index}`);
          // setPrompts(clone);
        }

        let arr = [...chatWith];
        var bodyFormData = new FormData();
        bodyFormData.append("question", newMessage.current.value);
        if (!subscribed && localStorage.getItem("username") == null) {
          bodyFormData.append("ip_address", ipAddress);
        } else if (subscribed && localStorage.getItem("username") != null) {
          bodyFormData.append("username", localStorage.getItem("username"));
        }

        //dispatch(Question(newMessage.current.value));
        if (
          !subscribed &&
          localStorage.getItem("username") == null &&
          count >= NumberofUnsubcriber
        ) {
          setPromtLimitmodal(!PromtLimitmodal);
        } else {
          //dispatch(Question(bodyFormData));
          setQuestion(question + 1);

          arr.push({
            DateAndtime: Date.now(),
            message: newMessage?.current?.value,
            message_by: user?.email,
            attachment: false,
          });
          setcount(count + 1);
          setSubsInfoModal(false);

          setChatWith(arr);

          SubmitQuestion(bodyFormData);

        }
      }
    }
    newMessage.current.value = "";


  };

  const onEnterSubmit = () => {
    if (newMessage.current.value === "") {
      return alert("Please enter message to submit");
    } else {
      let index = prompts.length + 1;
      if (
        prompts.length >= NumberofUnsubcriber &&
        !subscribed

      ) {
        setPromtLimitmodal(!PromtLimitmodal);
      } else if (prompts.length >= NumberofSubcriber && subscribed) {
        alert("Your are reached Your limits for today Come back Tomorrow");
      } else {
        if (index <= check) {
          //   let clone = [...prompts];
          // clone.push(`Prompt ${index}`);
          // setPrompts(clone);
        }

        let arr = [...chatWith];
        var bodyFormData = new FormData();
        bodyFormData.append("question", newMessage.current.value);
        if (!subscribed && localStorage.getItem("username") == null) {
          bodyFormData.append("ip_address", ipAddress);
        } else if (subscribed && localStorage.getItem("username") != null) {
          bodyFormData.append("username", localStorage.getItem("username"));
        }

        //dispatch(Question(newMessage.current.value));
        if (
          !subscribed &&
          localStorage.getItem("username") == null &&
          count >= NumberofUnsubcriber
        ) {
          setPromtLimitmodal(!PromtLimitmodal);
        } else {

          // dispatch(Question(bodyFormData));

          setQuestion(question + 1);

          arr.push({
            DateAndtime: Date.now(),
            message: newMessage?.current?.value,
            message_by: user?.email,
            attachment: false,
          });

          setcount(count + 1);

          setChatWith(arr);

          SubmitQuestion(bodyFormData);

        }
      }
    }
    newMessage.current.value = "";
  };

  const updatethubstatus = async (id, status) => {


    const promise = databases.updateDocument('64b5432b9e32fda9235a', '64b641e090dc4b18246a', id, { "status": status });

  };
  const handleThumbsUp = (id) => {
    if (!thumbsDown && !thumbsUp || thumbsDown && !thumbsUp) {
      setThumbsUp(true);
      setThumbsDown(false);
      setChatWith((prevChatWith) =>
        prevChatWith.map((message) =>
          message.id === id ? { ...message, status: 1 } : message
        )
      );
      const formData = new FormData();
      formData.append("messageid", id);
      formData.append("status", 1);
      updatethubstatus(id, 1);
    }

    else if (thumbsUp) {
      setThumbsUp(false);
      setChatWith((prevChatWith) =>
        prevChatWith.map((message) =>
          message.id === id ? { ...message, status: -1 } : message
        )
      );
      const formData = new FormData();
      formData.append("messageid", id);
      formData.append("status", -1);
      updatethubstatus(id, -1);

    }

    //setThumbsUp(!thumbsUp);
    //setThumbsDown(false);



  };
  const handleCloseProfile = (id) => {
    setShowUserProfile(false);

  };
  const handleCloseFront = (id) => {
    setSubsInfoModal(false);


  };

  const handleThumbsDown = (id) => {



    if (!thumbsDown && !thumbsUp || !thumbsDown && thumbsUp) {
      setThumbsDown(true);
      setThumbsUp(false);
      setChatWith((prevChatWith) =>
        prevChatWith.map((message) =>
          message.id === id ? { ...message, status: 0 } : message
        )
      );
      const formData = new FormData();
      formData.append("messageid", id);
      formData.append("status", 0);
      updatethubstatus(id, 0);
      // updatethubstatus(formData);
    }
    else if (thumbsDown) {
      setThumbsDown(false);
      setChatWith((prevChatWith) =>
        prevChatWith.map((message) =>
          message.id === id ? { ...message, status: -1 } : message
        )
      );
      const formData = new FormData();
      formData.append("messageid", id);
      formData.append("status", -1);
      updatethubstatus(id, -1);

    }

    //setThumbsUp(!thumbsUp);
    // setThumbsDown(false);

    // setChatWith((prevChatWith) =>
    //   prevChatWith.map((message) =>
    //     message.id === id ? { ...message, status: -1 } : message
    //   )
    // );
    // const formData = new FormData();
    // formData.append("messageid", id);
    // formData.append("status", 0);
    // updatethubstatus(formData);
  };
  const HandleClick = (index) => {
    if (prompts.length >= NumberofUnsubcriber && !subscribed) {
      setPromtLimitmodal(!PromtLimitmodal);
    } else if (prompts.length >= NumberofSubcriber && subscribed) {
      setPromtLimitmodal(!PromtLimitmodal);
    } else {
      let clone = [...prompts];
      const question = {
        DateAndtime: "",
        message: "",
        message_by: user?.email,
        attachment: false,
        tooltipContent: "",
        tooltip: true,
        status: 1,
        id: clone.length,
        truncatedAnswer: "New Prompt",
        answer: "",
        question: "New Prompt",

        // message_by: "hussain@gmail.com",
        // attachment: false,
      };


      //clone.push(`Prompt ${index}`);
      clone.push(question);

      //clone.push(`Prompt ${index}`);

      setPrompts(clone);
    }
  };

  useEffect(() => {
    const value = localStorage.getItem("access_token");

    if (value != null) {
      setSubscribed(true);
      setSubsInfoModal(false);
    }
  }, [subscribed]);

  useEffect(() => {
    if (location?.pathname === "/chat") {
      setSubsInfoModal(false);
    }
  }, [location?.pathname]);

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
  //const userQuestion = useSelector((state) => state.userQuestion);
  //const { answer } = userQuestion;


  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behaviour: "smooth" });
  };
  useEffect(scrollToBottom, [chatWith]);
  const scrollToBottomPrompt = () => {
    promptRef?.current?.scrollIntoView({ behaviour: "smooth" });
  };
  useEffect(scrollToBottomPrompt, [prompts]);

  const onSelectPrompt = (item) => {
    setSubsInfoModal(false);
    let arr = [];
    const check_value = item.truncatedAnswer;

    if (check_value == 'New Prompt') {

    }
    else {

      const question = {
        DateAndtime: item.created_at,
        message: item.question,
        message_by: user?.email,
        attachment: false,
      };
      arr.push(question);

      const answer = {
        DateAndtime: item.created_at,
        message: item.answer,
        message_by: "manzooor@gmail.com",
        attachment: true,
        status: item.status,
        id: item.id,
      };
      arr.push(answer);
      setChatWith(arr);

    }



    //setPromptSelected(index);
  };

  const onDeleteSelectedPrompt = () => {
    const filteredPrompts = prompts.filter(
      (item, index) => index !== promptSelected
    );
    setPrompts(filteredPrompts);
  };

  const onEditSelectedPrompt = () => {
    setEditPromptSelected(!editPromptSelected);
  };

  const onEditPrompt = () => {
    const clone = [...prompts];
    clone[promptSelected] = editPromptText;
    setPrompts(clone);
    setEditPromptSelected(!editPromptSelected);
  };
  return (
    <div className="flex flex-col ">
      {!subscribed && PromtLimitmodal && (
        <SubscriptionModal
          type={1}
          onClick={() => setPromtLimitmodal(!PromtLimitmodal)}
        />
        // ) : (
        //   subscribed &&
        //   PromtLimitmodal && (
        //     <SubscriptionModal
        //       type={2}
        //       onClick={() => setPromtLimitmodal(!PromtLimitmodal)}
        //     />
        //   )
      )}
      <Navbar
        onOpenModal={() => setShowModal(!showModal)}
        onOpenAbout={() => setShowAboutUs(!showAboutUs)}
        // onOpenUserProfile={() => setShowUserProfile(!showUserProfile)}
        text={textt}
      />

      <div className="flex w-full h-[88vh] space-x-4 bg-bgCremo">
        <div className="w-72 flex flex-col justify-between  items-center bg-bgCremo p-5">
          <div>
            <Button
              onClick={() => HandleClick(prompts.length + 1)}
              text="Nouvelle question"
            />
            <div
              className={`flex flex-col space-y-4 w-full py-4 ml-3 ${prompts.length > 2 && "h-72 overflow-y-scroll"
                }`}
            >
              {prompts?.map((item, index) => (
                <div
                  ref={promptRef}
                  key={index}
                  onClick={() => onSelectPrompt(item)}
                  className={`text-sm w-full font-medium px-4 bg-white py-2 rounded-md flex space-x-2`}
                >
                  {index === promptSelected && editPromptSelected ? (
                    <div className="flex space-x-1">
                      <input
                        type="text"
                        className="outline-none h-full w-full"
                        onChange={(e) => setEditPromptText(e.target.value)}
                      />
                      <div className="flex space-x-1">
                        <FaCheck
                          className="cursor-pointer"
                          onClick={onEditPrompt}
                        />
                        <FaTimes
                          className="cursor-pointer"
                          onClick={() => setEditPromptSelected(false)}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      {item?.tooltip ? (
                        <ChatTooltip
                          tooltip={item?.tooltipContent}
                          orignal={item?.truncatedAnswer}
                        />
                      ) : (
                        // Render this block if items.tooltip is truthy

                        // Render this block if items.tooltip is falsy
                        <span className="w-32 line-clamp-1">
                          {" "}
                          {item.message}
                        </span>
                      )}
                      {index === promptSelected && (
                        <div className="flex items-center space-x-1 text-textgray">
                          <FaEdit onClick={onEditSelectedPrompt} />
                          <ImBin onClick={onDeleteSelectedPrompt} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              {/* <div
                className="bg-textSenderBG text-sm w-full py-2 font-medium px-4 rounded-md "
              >
                Current Prompt
              </div>

              <div className="text-sm w-full font-medium px-4 bg-white py-2 rounded-md">
                Prompt 2
              </div>
              <div className="text-sm w-full font-medium px-4 bg-white py-2 rounded-md">
                Prompt 3
              </div> */}
            </div>
          </div>
          <div className="ml-3">
            <AttentionNote />
          </div>
        </div>
        <div className="w-full bg-white mt-5">
          <ChatBox
            newMessage={newMessage}
            messagesEndRef={messagesEndRef}
            submitHandler={submitHandler}
            onEnterSubmit={onEnterSubmit}
            chatWith={chatWith}
            handleThumbsUp={handleThumbsUp}
            handleThumbsDown={handleThumbsDown}
            user={user}
            subscribed={subsInfoModal}
            setSubscribed={() => setSubsInfoModal(!subsInfoModal)}
            handleCloseFront={handleCloseFront}
          />
        </div>

        {/* user icon and about us  */}
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
