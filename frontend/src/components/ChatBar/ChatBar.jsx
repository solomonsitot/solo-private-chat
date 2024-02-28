import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ChatBar.css";
import { useParams } from "react-router-dom";
import back from "../../assets/back.png";
import contact from "../../assets/Contact.png";
function ChatBar() {
  const { sid, rid } = useParams();
  const [userData, setUserData] = useState([]);
  const [message, setmessage] = useState("");
  const [convesation, setConversation] = useState([]);
  const [contacts, setcontacts] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/users/getuser/${rid}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
  }, [rid]);
  useEffect(() => {
    fetch(`http://localhost:8000/chats/chatbn/${rid}/and/${sid}`)
      .then((response) => response.json())
      .then((data) => {
        setConversation(data);
      });
  });
  function showcontactinfo() {
    setcontacts(!contacts);
  }
  async function send() {
    const cdate = new Date();
    const hour = cdate.getHours();
    const min = cdate.getMinutes();
    const formattedHour = hour % 12 || 12;

    let period = "AM";

    // Determine whether it's AM or PM
    if (hour >= 12) {
      period = "PM";
    }

    // Convert to 12-hour format
    const timeString = formattedHour + ":" + min + period;

    try {
      await fetch(`http://localhost:8000/chats/chatbn/${sid}/to/${rid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, timeString }),
      });
      setmessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <>
      <div className="chat-wrapper">
        <div className="chats">
          {userData.map((chat) => (
            <>
              <div>
                <div className="chat-header-wrapper">
                  <a href={`/users/dashboard/${sid}`}>
                    <img className="back-icon" src={back} alt="" />
                  </a>
                  <h3 className="mt-3">{chat.name}</h3>
                  <img
                    className="contact-icons m-0"
                    src={contact}
                    alt=""
                    onClick={showcontactinfo}
                  />
                </div>
              </div>
              <div
                className={`${
                  contacts ? "d-block user-infos" : "d-none user-infos"
                }`}
              >
                <img className="my-profile" src={contact} alt="" />
                <p className='Q'> {chat.name}</p> <p className="A">@{chat.username}</p>
              </div>
              <div className="chat-display">
                <ul className="chat-display">
                  {convesation.map((message, index) => {
                    return (
                      <li
                        className={`${
                          message.sender.id === sid
                            ? "float-right from-me"
                            : "float-left to-me"
                        } `}
                        key={index}
                      >
                        {message.chat}
                        <span>{message.time}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          ))}
        </div>
        <div className="sending-container">
          <input className="message-bar"
            placeholder="Write your message ..."
            type="text"
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
          />
          <button className="send-btn" onClick={send}>send</button>
        </div>
      </div>
    </>
  );
}

export default ChatBar;
