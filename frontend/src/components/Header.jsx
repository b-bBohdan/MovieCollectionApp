import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import "./Header.css";
import { useUser } from "../context/UserContext";

export default function Header() {
  const location = useLocation();
  const onProfile = location.pathname === "/profile";
  const [showLogin, setShowLogin] = useState(false);
  const { user, isAuthenticated } = useUser();

  console.log(
    "USer info:",
    user,
    isAuthenticated,
    location.pathname,
    onProfile
  );

  return (
    <>
      <header className="bg-white shadow-md mb-6 rounded-2xl">
        <div className="header-container mx-auto px-4 py-3 flex justify-between items-center ">
          <div className="text-2xl font-bold text-gray-800 sm:text-xl">
            <Link to="/">Mogo</Link>
          </div>

          <nav className="flex space-x-3 sm:flex sm:space-x-2">
            <a href="#" className="text-gray-600 hover:text-amber-500">
              Service
            </a>
            <a href="#" className="text-gray-600 hover:text-amber-500">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-amber-500">
              Blog
            </a>
            <a href="#" className="text-gray-600 hover:text-amber-500">
              Work
            </a>
            {!isAuthenticated && (
              <button
                name="login"
                onClick={() => {
                  setShowLogin((prew) => !prew);
                }}
                className="ml-6 text-gray-800 font-semibold hover:text-amber-500"
              >
                Login
              </button>
            )}

            {!onProfile && isAuthenticated && (
              <Link to="/profile" className="ml-4">
                <img
                  src={user.pp_Url}
                  alt="User avatar"
                  className="relative
                  w-10 h-10 rounded-full object-cover border-2 border-amber-500 hover:scale-105 transition"
                />
              </Link>
            )}
          </nav>
        </div>
      </header>

      {!isAuthenticated && showLogin && (
        <LoginModal
          onClose={() => {
            setShowLogin((prew) => !prew);
          }}
        ></LoginModal>
      )}
    </>
  );
}
