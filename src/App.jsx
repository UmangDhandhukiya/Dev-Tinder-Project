import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/User/Home";
import Layout from "./components/Layout";
import About from "./pages/User/About";
import Reg from "./pages/User/Reg";
import Login from "./pages/User/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./pages/User/Feed";
import Profile from "./pages/User/Profile";
import Connection from "./pages/User/Connection";
import Request from "./pages/User/Request";


const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/connection" element={<Connection />} />
              <Route path="/requests" element={<Request />} />
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
