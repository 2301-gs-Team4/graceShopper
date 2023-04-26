import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <div id='InnerApp'>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
