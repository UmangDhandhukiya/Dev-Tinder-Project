import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-3">
          <h1 className="Logo text-3xl font-bold text-amber-300">Dev Tinder</h1>
          <p className="text-gray-300 max-w-sm">
            Not Just Networking. It's <strong>DevBonding</strong>. Connect,
            code, and collaborate with devs who share your vision.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 w-full md:w-2/3 justify-around">
          <div>
            <h2 className="text-amber-200 text-xl mb-2">Quick Links</h2>
            <ul className="flex flex-col gap-1">
              <Link
                to="/"
                className="hover:underline hover:text-amber-300 transition"
              >
                Home
              </Link>
              <Link
                to="/job"
                className="hover:underline hover:text-amber-300 transition"
              >
                Jobs
              </Link>
              <Link
                to="/about"
                className="hover:underline hover:text-amber-300 transition"
              >
                About
              </Link>
            </ul>
          </div>

          <div>
            <h2 className="text-amber-200 text-xl mb-2">Contact</h2>
            <ul className="flex flex-col gap-1 text-gray-300">
              <li>Email</li>
              <li>WhatsApp</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Dev Tinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
