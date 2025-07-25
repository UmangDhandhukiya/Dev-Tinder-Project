import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className="h-[80px] flex items-center bg-black text-white px-8 justify-between absolute w-full">
      <div className="flex list-none gap-18 items-center">
        <h1 className="Logo text-amber-200">Dev-Tinder</h1>
        <ul className="flex gap-8 cursor-pointer">
          <Link
            to={"/"}
            className={`border-b-2 ${
              pathname === "/" ? "border-white" : " border-black"
            } hover:border-b-2 hover:border-white`}
          >
            Home
          </Link>
          <Link
            to={"/job"}
            className={`border-b-2 ${
              pathname === "/job" ? "border-white" : " border-black"
            } hover:border-b-2 hover:border-white`}
          >
            Jobs
          </Link>
          <Link
            to={"/about"}
            className={`border-b-2 ${
              pathname === "/about" ? "border-white" : " border-black"
            } hover:border-b-2 hover:border-white`}
          >
            About
          </Link>
        </ul>
      </div>
      <div className="flex gap-8">
        <button className="cursor-pointer">Login</button>
        <button className="cursor-pointer">Register</button>
      </div>
    </div>
  );
};

export default Header;
