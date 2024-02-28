import React, { useEffect, useState } from "react";
import "./PostsBar.css";
import { useParams } from "react-router-dom";
import contact from "../../assets/Contact2.png";
import heart from "../../assets/suit_heart@2x.png";
import send from "../../assets/Send.png";

function PostsBar() {
  const  id  = useParams().id;
  
  const [post, Setpost] = useState([]);
  const [pid, Setpid] = useState();
  // const likedPosts = [];
  const [user, Setuser] = useState([]);
  const [liked, Setliked] = useState(false);
  const [allLikes, SetAllLikes] = useState([]);
  // const [Id, setid] = useState();
  // setid(id)
  useEffect(() => {
    fetch("http://localhost:8000/posts/getAll", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        Setpost(data);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8000/likes/likedby/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((datas) => {
        SetAllLikes(datas);
        console.log(datas)
      });
  }, );

  async function like(postid, posterid) {
    postid = postid;
    posterid = posterid;
    if (allLikes.includes(postid) ) {
      await fetch(`http://localhost:8000/likes/remove/of/${postid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, posterid: posterid }),
      });
      Setliked(false);
      // console.log(liked)
console.log('unliked')
    } else if(!(allLikes.includes(postid))) {
      await fetch(`http://localhost:8000/likes/of/${postid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, posterid: posterid }),
      });
      Setliked(true);
      // console.log(liked)
      console.log('liked')
    }
  }

  // async function like(postid, posterid, liked, id) {
  //   try {
  //     postid = postid;
  //     posterid = posterid;
  
  //     if (liked === true) {
  //       await fetch(`http://localhost:8000/likes/remove/of/${postid}`, {
  //         method: "DELETE",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ id: id, posterid: posterid }),
  //       });
  //       await Setliked(false);
  //     } else if (liked === false) {
  //       await fetch(`http://localhost:8000/likes/of/${postid}`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ id: id, posterid: posterid }),
  //       });
  //       await Setliked(true);
  //     }
  //   } catch (error) {
  //     console.error("Error during like operation:", error);
  //     // Handle the error appropriately, maybe show a user-friendly message.
  //   }
  // }
  
  return (
    <div className="all-post-wrapper">
      {/* <h5>new posts</h5> */}
      <div className="post-wrapper">
        {post
          .slice()
          .reverse()
          .map((post, index) => {
            return (
              <div key={index} className="col-11 post">
                <div className="post-info">
                <div className="d-flex">
                  <img className="contact-icon2" src={contact} alt="" />
                    <h6 > has posted on</h6>
                    <span className="mt-1 m-2 ">{post.date}</span>
                </div>
                
                <h6>{post.caption}</h6>
                </div>
             
                <img
                  className="posted-image"
                  src={`http://localhost:8000/posts/${post.image}`}
                  alt=""
                />
                <div className="reaction-box">
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
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PostsBar;
