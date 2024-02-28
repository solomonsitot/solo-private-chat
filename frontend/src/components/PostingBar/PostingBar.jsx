import React, { useState } from "react";
import "../../bootstrap.css";
import "./PostingBar.css";
import plus from "../../assets/plus2.png";
import { useParams } from "react-router-dom";

function PostingBar() {
  const [image, setImage] = useState("");
  const [dimage, Setdimage] = useState("");
  const [caption, setCaption] = useState("");
  const { id } = useParams();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function Base64(e) {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      Setdimage(reader.result);
    };
  }
  function sendPost() {
    const currentDate = new Date();
    const year = currentDate.getFullYear(); // Get the current year (4 digits)
    const monthIndex = currentDate.getMonth(); // Get the current month index (0-11)
    const month = months[monthIndex]; // Get the month name from the array
    const day = currentDate.getDate(); // Get the current day of the month
    const hour = currentDate.getHours(); // Get the current hour (0-23)
    const minute = currentDate.getMinutes();
    const date = month + " " + day + ", " + year + " at " + hour + ":" + minute;
    
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("id", id);
    formData.append("date", date);
    fetch("http://localhost:8000/posts/newpost", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful response
          console.log("Post added successfully");
        } else {
          // Handle error response
          console.error("Failed to add post");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="posting-bg">
      {/* <h1>post</h1> */}
      <div className="posting-wrapper">
        <h2>Share Your Thoughts !!!</h2>
        <h4>Add new post</h4>
        <div className="plus-wrapper">
          <input
            className="file-picker"
            type="file"
            onChange={(e) => {
              Base64(e);
            }}
          />
          <img className="plus-icon" src={plus} alt="" />
        </div>

        <input
          className={`${
            dimage.length == 0 ? "d-none" : "d-inline caption-bar"
          }`}
          type="text"
          accept="image/*"
          name=""
          id=""
          placeholder="Add caption . . . "
          onChange={(e) => {
            setCaption(e.target.value);
          }}
        />
        <img
          className={`${dimage.length == 0 ? "d-none" : "d-inline image-box"}`}
          src={dimage}
          alt=""
          width={300}
          height={250}
        />
        <br />
        <button className="post-btn" onClick={sendPost}>
          {" "}
          post
        </button>
      </div>
    </div>
  );
}

export default PostingBar;
