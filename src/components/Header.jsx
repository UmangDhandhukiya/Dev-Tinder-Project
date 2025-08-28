import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  // Navigation items if user is logged in
  const authNavItems = [
    { path: "/", label: "Home" },
    { path: "/feed", label: "Feed" },
    { path: "/connection", label: "Connections" },
    { path: "/requests", label: "Requests" },
  ];

  // Navigation items if user is not logged in
  const guestNavItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
  ];

  const navItems = user ? authNavItems : guestNavItems;

  return (
    <nav
      className="sticky top-0 z-20 w-full h-[80px] 
      bg-black backdrop-blur-sm border-b border-amber-300/20
      text-white px-6 md:px-10 shadow-md"
    >
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
        {/* Logo */}
        <h1
          className="Logo text-2xl font-bold text-amber-300 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Dev-Tinder
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`hover:text-amber-300 transition ${
                pathname === path ? "text-amber-300 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-sm text-amber-300">
                Hi, {user.firstname}
              </span>
              <img
                src={
                  user.imageUrl ||
                  "/placeholder.svg?height=40&width=40&query=profile"
                }
                alt="profile"
                onClick={() => navigate("/profile")}
                className="w-10 h-10 rounded-full object-cover border-2 border-amber-300 cursor-pointer hover:scale-105 transition-transform"
              />
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link
                to="/login"
                className="px-4 py-1 border border-amber-300 rounded hover:bg-amber-300 hover:text-black transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 bg-amber-300 text-black rounded hover:bg-amber-400 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute top-[80px] left-0 w-full 
          bg-black/95 backdrop-blur-md border-t border-amber-300/20
          flex flex-col items-center gap-6 py-6 shadow-lg"
        >
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={`hover:text-amber-300 transition ${
                pathname === path ? "text-amber-300 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          ))}

          {!user ? (
            <div className="flex flex-col gap-4 w-full px-6">
              <Link
                to="/login"
                className="px-4 py-2 border border-amber-300 text-center rounded hover:bg-amber-300 hover:text-black transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-amber-300 text-black text-center rounded hover:bg-amber-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <span className="text-amber-300 text-lg">
                Hi, {user.firstname}
              </span>
              <img
                src={
                  user.imageUrl ||
                  "/placeholder.svg?height=80&width=80&query=profile"
                }
                alt="profile"
                onClick={() => {
                  navigate("/profile");
                  setIsMenuOpen(false);
                }}
                className="w-20 h-20 rounded-full object-cover border-2 border-amber-300 cursor-pointer hover:scale-105 transition-transform"
              />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
