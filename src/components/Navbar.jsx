import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { enqueueSnackbar } from "notistack";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogOut = () => {
    logOut();
    navigate("/");
    enqueueSnackbar("User logged out successfully", {
      variant: "success",
      autoHideDuration: 1500,
    });
  };
  return (
    <div>
      <nav className="relative bg-white shadow">
        <div className="max-w-screen-xl px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <Link className="font-bold text-2xl" to="/">
              Task Sync Pro
            </Link>
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 "
                aria-label="toggle menu"
              >
                {isOpen ? <IoClose className="text-2xl" /> : <FaBars />}
              </button>
            </div>
          </div>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:flex md:items-center md:w-auto md:space-x-6`}
          >
            <div className="flex flex-col md:flex-row md:gap-5 md:mx-6">
              <NavLink
                className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500  lg:mx-4 lg:my-0"
                to="/"
              >
                Home
              </NavLink>
              {user && (
                <NavLink
                  className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 lg:mx-4 lg:my-0"
                  to="/tasks/todo"
                >
                  Task Management
                </NavLink>
              )}
              <NavLink
                className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500  lg:mx-4 lg:my-0"
                to="/about"
              >
                About Us
              </NavLink>
              <NavLink
                className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500  lg:mx-4 lg:my-0"
                to="/contact"
              >
                Contact
              </NavLink>
            </div>

            {user ? (
              <div className="flex gap-2 items-center">
                {" "}
                <img
                  className="w-14 h-14 rounded-full hidden md:block"
                  src={user.photoURL}
                  alt=""
                />{" "}
                <button
                  onClick={handleLogOut}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg text-sm md:text-base font-semibold"
                >
                  Log Out
                </button>{" "}
              </div>
            ) : (
              <>
                <div className="lg:block mb-2 md:mb-0">
                  <Link to="signIn">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg text-sm md:text-base font-semibold">
                      Sign In
                    </button>
                  </Link>
                </div>
                <div className="lg:block">
                  <Link to="signUp">
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded-lg text-sm md:text-base font-semibold">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
