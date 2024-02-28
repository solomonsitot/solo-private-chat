import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login .css";
function Login() {
    const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
    async function login(e) {
        e.preventDefault();
        await fetch(`http://localhost:8000/users/login/${password}/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   password: password,
      //   username: username,
      // }),
    }).then((response) => response.json())
        .then((data) => {
          if (!data._id){
            setPassword('')
            setUserName('')
          }
          else { 
            navigate(`/users/dashboard/${data._id}`);

         }
          
      })
        
    }
  return (
    <>
      <div className="login-wrapper">
        <form className="login-form" action="">
          <h1>login page</h1>
          <br />
          <label htmlFor="">username:</label>
          <input className="input-bar" type="text" value={username} onChange={(e)=>{setUserName(e.target.value)}} />
          <br />
          <label htmlFor="">password:</label>
          <input className="input-bar" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          <br />
          <button className="send-btn" onClick={login}>Login</button>
          <p>
            have no account yet, <a href="/signup">sign up</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
