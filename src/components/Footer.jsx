import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black/95 text-white px-6 py-12 border-t border-amber-300/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-4 max-w-sm">
          <h1 className="Logo text-3xl font-bold text-amber-300">Dev Tinder</h1>
          <p className="text-gray-400 leading-relaxed">
            Not Just Networking. It’s <strong className="text-amber-300">DevBonding</strong>.  
            Connect, code, and collaborate with devs who share your vision.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 w-full md:w-2/3 justify-around">
          <div>
            <h2 className="text-amber-200 text-lg font-semibold mb-3">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-2">
              <Link
                to="/"
                className="hover:text-amber-300 hover:pl-1 transition-all"
              >
                Home
              </Link>
              <Link
                to="/job"
                className="hover:text-amber-300 hover:pl-1 transition-all"
              >
                Jobs
              </Link>
              <Link
                to="/about"
                className="hover:text-amber-300 hover:pl-1 transition-all"
              >
                About
              </Link>
            </ul>
          </div>

          <div>
            <h2 className="text-amber-200 text-lg font-semibold mb-3">
              Contact
            </h2>
            <ul className="flex flex-col gap-2 text-gray-400">
              <li className="hover:text-amber-300 cursor-pointer transition">
                Email
              </li>
              <li className="hover:text-amber-300 cursor-pointer transition">
                WhatsApp
              </li>
              <li className="hover:text-amber-300 cursor-pointer transition">
                Instagram
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm border-t border-amber-300/20 pt-4">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-amber-300 font-semibold">Dev Tinder</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
