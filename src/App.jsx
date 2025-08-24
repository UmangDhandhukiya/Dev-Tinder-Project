import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/User/Home";
import Layout from "./components/Layout";
import Job from "./pages/User/Job";
import About from "./pages/User/About";
import Reg from "./pages/User/Reg";
import Login from "./pages/User/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/job" element={<Job />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="/register" element={<Reg />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
