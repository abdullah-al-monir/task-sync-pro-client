import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="relative bg-white shadow">
        <div className="max-w-screen-xl px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <Link to="/">Task Sync Pro</Link>
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
            } md:flex md:items-center md:w-auto md:space-x-6 space-y-2`}
          >
            <div className="flex flex-col md:flex-row md:gap-5 md:mx-6">
              <NavLink
                className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500  lg:mx-4 lg:my-0"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 lg:mx-4 lg:my-0"
                to="/"
              >
                Shop
              </NavLink>
              <a
                className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500  lg:mx-4 lg:my-0"
                to="/"
              >
                Contact
              </a>
              <a
                className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500  lg:mx-4 lg:my-0"
                to="/"
              >
                About
              </a>
            </div>

            <div className="lg:block">
              <Link to="signIn">
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-2 py-1 rounded-lg text-sm md:text-base">
                  Sign In
                </button>
              </Link>
            </div>
            <div className="lg:block">
              <Link to="signUp">
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-2 py-1 rounded-lg text-sm md:text-base">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
