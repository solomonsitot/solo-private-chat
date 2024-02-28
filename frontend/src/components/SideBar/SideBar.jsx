import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { useParams } from "react-router-dom";
import contact from "../../assets/contact.png";
import plus from "../../assets/plus_bubble_fill@2x.png";
import menu from "../../assets/menu.png";
function SideBar() {
  const { id } = useParams();
  const [allusers, setAllusers] = useState([]);
  const [userList, setUsersList] = useState(false);
  const [myInfo, setMyInfo] = useState([]);
  const [cInfo, setCinfo] = useState(false);
  function showcontactinfo() {
    setCinfo(!cInfo);
    setUsersList(false);
  }
  useEffect(() => {
    fetch(`http://localhost:8000/users/getAll/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAllusers(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/users/myinfo/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setMyInfo(data);
      });
  }, []);
  function show() {
    setUsersList(!userList);
    setCinfo(false);
  }
  return (
    <>
      <div
        className={`${cInfo ? "d-block contact-info" : "d-none contact-info"}`}
      >
        <img className="my-profile" src={contact} alt="" />
        <br />
        <div className="infos d-flex">
          <span className="Q">Name</span>
          <span className="A">{myInfo.name}</span>
        </div>
        
        <div className="infos d-flex">
          <span className="Q">username</span>
          <span className="A">@{myInfo.username}</span>
        </div>
        <div className="logout-box">
          {" "}
          <a className="logout" href="/">
            logout
          </a>
        </div>
      </div>

      <div className="contact">
        <ul className="menu-list">
          <li className="contact-icon-holder" onClick={showcontactinfo}>
            <img className="contact-icon" src={menu} alt="" />
          </li>
          <li className="contact-icon-holder" onClick={show}>
            <img className="contact-icons" src={contact} alt="" />
          </li>
          <li className="contact-icon-holder">
            <a href={`/myposts/${id}`}>
              <img className="contact-icon" src={plus} alt="" />
            </a>
          </li>
        </ul>
      </div>
      <div className={`${userList ? "d-block" : "d-none"}  contacts`}>
        {allusers.map((user, index) => (
          <a
            className="contact-link"
            href={`/chatfrom/${myInfo._id}/to/${user._id}`}
          >
            <div className="contact-lists" key={index}>
              {user.name}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

export default SideBar;
