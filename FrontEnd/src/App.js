import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import routesConfig from "./Routes/routes";
import Privateroutes from "./Privateroutes";
import Addevent from "./Pages/AddEvents/Addevent";
import Profile from "./Pages/Profile";
import "./App.css";

const App = () => {
  const userRole = localStorage.getItem('role')
  return (
    <div></div>
  );
};

export default App;
