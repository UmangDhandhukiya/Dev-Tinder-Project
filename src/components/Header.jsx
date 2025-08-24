import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((store) => store.user);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/feed", label: "Feed" },
    { path: "/about", label: "About" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <nav className="sticky top-0 z-20 w-full h-[80px] bg-black text-white px-6 md:px-10 shadow-md">
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
        <h1 className="Logo text-2xl font-bold text-amber-300">Dev-Tinder</h1>

        {/* Desktop Nav */}
        {user && (
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
        )}

        {/* Desktop Auth */}
        {!user && (
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
        )}

        {user && (
          <h1 className="hidden md:block">
            Welcome, <span className="text-amber-300">{user.firstname} !</span>
          </h1>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && user && (
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

          {!user ? (
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
          ) : (
            <h1 className="text-lg">
              Welcome,{" "}
              <span className="text-amber-300">{user.firstname} !</span>
            </h1>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
