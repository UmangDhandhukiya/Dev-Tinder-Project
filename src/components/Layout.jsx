import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/UserSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const protectRoute = async () => {
    if (userData) return;
    try {
      const response = await fetch(BASE_URL + "/profile/view", {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const user = await response.json();
        dispatch(addUser(user.data));
      }
      else{
        navigate("/login")
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    protectRoute();
  }, []);

  return (
    <>
      <div className="">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
