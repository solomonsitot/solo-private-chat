import React, { useEffect, useState } from "react";
import "./MyPosts.css";
import newpost from "../../assets/newpost.png";
import back from "../../assets/back.png";
import { useParams } from "react-router-dom";
import contact from "../../assets/Contact2.png";

function MyPosts() {
  const id = useParams();
  const [myPost, setMyposts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/posts/mine/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setMyposts(data);
        console.log(data);
      });
  }, []);
  return (
    /* /post/new/${id} */

    <div className="my-post-wrapper">
      <div className="my-post-top">
        
        
        <h3>My posts</h3>
        <a href={`/post/new/${id}`}>
          <img className="contact-icons" src={newpost} alt="" />
        </a>
      </div>
      <div className="posts-container">
        {myPost
          .slice()
          .reverse()
          .map((post, index) => {
            return (
              <div key={index} className=" col-9 post">
                <div className="post-info">
                  <div className="d-flex">
                    <img className="contact-icon2" src={contact} alt="" />
                    <h6> you posted this on</h6>
                    <span className="mt-1 m-2 ">{post.date}</span>
                  </div>

                  <h6>{post.caption}</h6>
                </div>

                <img
                  className="posted-image"
                  src={`http://localhost:8000/posts/${post.image}`}
                  alt=""
                />
                {/* <div className="reaction-box">
                  <img
                    onClick={()=>{like(post._id, post.poster.id)}}
                    className={`${allLikes.includes(post._id)?'liked':'heart'}`}
                    src={heart}
                    alt=""
                  />
                  <input
                    className="comment-bar"
                    type="text"
                    name=""
                    id=""
                    placeholder="comment . . ."
                  />
                  <img className="send" src={send} alt="" />
                </div> */}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MyPosts;
