import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Input from "./Components/Input/Input";
import Button from "./Components/Button/Button";
import Home from "./Views/Home/Home";
import SessionList from "./Views/Session/List";
import CreateSession from "./Views/Session/CreateSession";
import Session from "./Views/Session/Session";
import MarkAttendance from "./Views/Session/MarkAttendance";
import Login from "./Views/Auth/Login";
import Add from "./Views/Members/Add";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MemberList from "./Views/Members/MemberList";
import ProtectedRoute from "./Components/Extra/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Edit from "./Views/Members/EditMember";

axios.defaults.baseURL = `https://mcicts-classes.cyclic.app/`;
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("_access-token")}`;
  return config;
});
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/class/:classType" element={<SessionList />}></Route>
            <Route path="/class/:classType/view/:id" element={<Session />}></Route>
            <Route path="/class/:classType/mark/:id" element={<MarkAttendance />}></Route>
            <Route path="/class/:classType/add-session" element={<CreateSession />}></Route>
            <Route path="/members" element={<MemberList />}></Route>
            <Route path="/members/add" element={<Add />}></Route>
            <Route path="/members/edit/:id" element={<Edit />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </React.Fragment>
  );
}

export default App;
