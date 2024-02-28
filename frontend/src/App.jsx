import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import "./bootstrap.css";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import TopNav from "./components/TopNav/TopNav";
import ChatBar from "./components/ChatBar/ChatBar";
import SideBar from "./components/SideBar/SideBar";
import PostsBar from "./components/PostsBar/PostsBar";
import PostingBar from "./components/PostingBar/PostingBar";
import MyPosts from "./components/MyPosts/MyPosts";
function Dashboard() {
  return (
    <>
      {/* <TopNav /> */}
      <SideBar />
      <PostsBar/>
      <Outlet />
    </>
  );
}
function App() {
  return (
    <>
      <Routes>
        <Route path="/users/dashboard/:id?" element={<Dashboard />} />
        <Route path="/post/new/:id?" element={<PostingBar />} />
        <Route path="/myposts/:id?" element={<MyPosts />} />
        <Route path="/chatfrom/:sid?/to/:rid?" element={<ChatBar />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
