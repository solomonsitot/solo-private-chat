import React, { useState, useEffect } from "react";
import "./TopNav.css";
import menu from "../../assets/menu.png";
import contact from "../../assets/contact.png";
import { useNavigate, useParams } from "react-router-dom";
function TopNav() {
  const { id } = useParams();
  const [cInfo, setCinfo] = useState(false);
  const [myInfo, setMyInfo] = useState([]);
  const navigate = useNavigate();
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

  function showcontactinfo() {
    setCinfo(!cInfo);
  }

  return (
    <>
      <div className="top-wrapper">
        <img
          className="contact-icon"
          src={contact}
          alt=""
          onClick={showcontactinfo}
        />
      </div>

      <div
        className={`${cInfo ? "d-block contact-info" : "d-none contact-info"}`}
      >
        <img className="contact-icon" src={contact} alt="" />
        <p>{myInfo.name}</p>
        <p>
          <span>{myInfo._id}</span>
        </p>

        <p>
          <span>@{myInfo.username}</span>
        </p>
        <a href="/">logout</a>
      </div>
    </>
  );
}

export default TopNav;
