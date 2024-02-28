import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
function Signup() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  async function signup(e) {
    e.preventDefault();
    fetch("http://localhost:8000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullName,
        password: password,
        username: userName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/users/dashboard/${data}`);
      });
    // await fetch("http://localhost:8000/users/register", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       name: fullName,
    //       password: password,
    //       username: userName,
    //     }),
    // }).then((response) => response.json())
    //     .then((res) => {
    //       setUserdata(res)
    //   })

    //   const id = userdata._id;

    //   navigate(`/users/dashboard/${id}`);
  }

  return (
    <>
      <div className="signup-wrapper">
        <form className="signup-form" action="">
          <h1>sign up</h1>
          <br />
          <label htmlFor="">Full Name:</label>
          <input
            className="input-bar"
            type="text"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="">username:</label>
          <input
            className="input-bar"
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          
          <label htmlFor="">password:</label>
          <input
            className="input-bar"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
         
          <button className="send-btn" onClick={signup}>
            sign up
          </button>
          <p>
            have an account, <a href="/"> login</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
