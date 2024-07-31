import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PostPage from "./components/PostPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import { UserContextProvider } from "./components/UserContext";
import NewPostPage from "./components/NewPostPage";
import DetailPost from "./components/DetailPost";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostPage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<NewPostPage />} />
          <Route path="/posts/:id" element={<DetailPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
