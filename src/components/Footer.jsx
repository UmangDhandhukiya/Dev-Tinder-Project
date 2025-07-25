import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="w-full p-7 bg-black flex justify-around items-center text-white">
        <div className="w-1/4 flex flex-col items-start flex-wrap">
          <h1 className="Logo text-amber-200 text-3xl">Dev Tinder</h1>
          <p>Not Just Networking. It's DevBonding.</p>
        </div>
        <div className="w-1/4 flex flex-col items-start flex-wrap">
          <h1 className="text-amber-200 text-2xl">Quick Links</h1>
          <ul className="flex flex-col">
            <Link to={"/"} className="hover:underline cursor-pointer">
              Home
            </Link>
            <Link to={"/job"} className="hover:underline cursor-pointer">
              Jobs
            </Link>
            <Link to={"/about"} className="hover:underline cursor-pointer">
              About
            </Link>
          </ul>
        </div>
        <div className="w-1/4 flex flex-col items-start flex-wrap">
          <h1 className="text-amber-200 text-3xl">Contact</h1>
          <p>Mail</p>
          <p>whatsapp</p>
          <p>instagram</p>
        </div>
      </div>
      <hr />
      <div className="bg-black flex justify-around items-center text-white">
        <h1 className="pb-3">DevTinder All right reserved</h1>
      </div>
    </div> 
  );
};

export default Footer;
