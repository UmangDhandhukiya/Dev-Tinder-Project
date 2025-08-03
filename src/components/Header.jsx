import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/job", label: "Jobs" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-20 w-full h-[80px] bg-black text-white px-6 md:px-10 shadow-md">
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
        <h1 className="Logo text-2xl font-bold text-amber-300">Dev-Tinder</h1>
        <ul className="hidden md:flex gap-8 items-center">
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`pb-1 border-b-2 transition-all duration-200 ${
                  pathname === path ? "border-white" : "border-transparent"
                } hover:border-white`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex gap-4">
          <Link
            to={"/login"}
            className="px-4 py-1 border border-white rounded hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="px-4 py-1 bg-amber-300 text-black rounded hover:bg-amber-400 transition"
          >
            Register
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-[80px] left-0 w-full bg-black flex flex-col items-center gap-6 py-6 shadow-lg">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-lg ${
                pathname === path ? "text-amber-300" : "text-white"
              } hover:text-amber-300`}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-4">
            <Link
              to={"/login"}
              className="px-4 py-1 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="px-4 py-1 bg-amber-300 text-black rounded hover:bg-amber-400 transition"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
