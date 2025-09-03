import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react"; // ✅ Import LogOut icon
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { removeUser } from "../utils/UserSlice";

const Header = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async () => {
    // 🔁 Implement your logout logic here
    const logout = await fetch(BASE_URL + "/logout", {
      credentials: "include",
    });

    const data = await logout.json();
    dispatch(removeUser(data))
    navigate("/login");
  };

  const authNavItems = [
    { path: "/", label: "Home" },
    { path: "/feed", label: "Feed" },
    { path: "/connection", label: "Connections" },
    { path: "/requests", label: "Requests" },
  ];

  const guestNavItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
  ];

  const navItems = user ? authNavItems : guestNavItems;

  return (
    <nav className="sticky top-0 z-20 w-full h-[80px] bg-black backdrop-blur-sm border-b border-amber-300/20 text-white px-6 md:px-10 shadow-md">
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
              className={`hover:text-amber-300 transition ${pathname === path ? "text-amber-300 font-semibold" : ""
                }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
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
              {/* ✅ Logout button */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="text-amber-300 hover:text-red-400 transition"
              >
                <LogOut size={22} />
              </button>
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

          {/* Mobile Menu Toggle */}
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
        <div className="md:hidden absolute top-[80px] left-0 w-full bg-black/95 backdrop-blur-md border-t border-amber-300/20 flex flex-col items-center gap-6 py-6 shadow-lg">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={`hover:text-amber-300 transition ${pathname === path ? "text-amber-300 font-semibold" : ""
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
              <span className="text-amber-300 text-lg">Hi, {user.firstname}</span>
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
              {/* ✅ Logout in mobile view */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
