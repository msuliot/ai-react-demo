import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import Header from "../Header/Header";
import PageTitleDescription from "../PageTitleDescription/PageTitleDescription";
import Spinner from "../Spinner/Spinner";
import FetchData from "../FetchData/FetchData";

const Chat = () => {
  // useStates
  const [chat, setChat] = useState([]);
  const [isDivVisible, setDivVisible] = useState(false);
  const [question, setQuestion] = useState("");

  // useRefs
  const endOfMessagesRef = useRef(null);
  const inputRef = useRef();

  // useEffects
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isDivVisible]);

  useEffect(() => {
    handleGreeting(true)
    setDivVisible(false);
  }, []);

  // Main Logic Handler
  const handleEnter = async () => {
    handleClearClick();
    addObjectToArray("message-right", question);
    const q = question.toLowerCase();

    if (q==="clear"){
      clearChatMessages();
      return;
    }

    setDivVisible(true);

    // The FetchData component will call the API
    FetchData(question)
    .then(response => {
        if (response) {
            //console.log(response);
            addObjectToArray("message-left", response);
            setDivVisible(false);
        }
        else {
          addObjectToArray("message-left", "That's embarrassing! I did not receive a valid response.");
          setDivVisible(false);
        }
    })
    .catch((error) => {
      //console.log(error);
      addObjectToArray("message-left", "That's embarrassing! I received an error. Please try your question again.");
      setDivVisible(false);
    });
  };

  const addObjectToArray = (side, chatText) => {
    const randomNumber = Math.floor(1 + Math.random() * 9999);
    const newObject = {
      id: randomNumber,
      side: side,
      text: chatText,
    };
    appendToChat(newObject);
  };

  const appendToChat = (newObject) => {
    setChat((prevChat) => [...prevChat, newObject]);
  };

  const clearChatMessages = () => {
    setChat([]);
    handleGreeting(true)
  };

  const handleGreeting = (intro) => {
    if(intro){
      addObjectToArray("message-left", "Hello there! I'm Michael AI... here to assist you with any questions you may have regarding the PDFs. ");
    }
  }

  const handleQuestionChange = (theQuestion) => {
    setQuestion(theQuestion);
  };

  const handleInputChange = (event) => {
    handleQuestionChange(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && isButtonDisabled === false) {
      handleEnter();
    }
  };

  const handleClearClick = () => {
    document.getElementById("question").value = "";
    setQuestion("");
  };

  const isButtonDisabled = question.length < 3;

  return (
    <>
      <Header />
      <PageTitleDescription
        pageTitle={"Chat Simulation"}
        pageDescription={""}
      />
      <div className="container">
        <div className="content">
          <div className="message-container" style={{ overflow: "auto" }}>
            {chat.map((object) => (
              <div key={object.id} className={object.side}>
                {object.text}
              </div>
            ))}
            {isDivVisible && (
              <div className="message-left">
                <Spinner />
              </div>
            )}
            <div ref={endOfMessagesRef} />
            <div className="question-container">
              <input
                id="question"
                type="text"
                ref={inputRef}
                className="question-textbox"
                placeholder="Ask your question"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              ></input>
              <button
                disabled={isButtonDisabled}
                onClick={handleEnter}
                id="questionButton"
                type="submit"
                className="button"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
