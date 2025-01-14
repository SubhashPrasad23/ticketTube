import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="py-5 px-5 w-full bg-[#0A1E5E] text-white">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">BooknWatch</div>

          <ul className="hidden md:flex font-semibold gap-5">
            <li className="text-xl">
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className="text-xl">
              <NavLink to={"/watch"}>Watch</NavLink>
            </li>
          </ul>

          <button className="hidden md:block  text-white tracking-wide bg-[#30A586] px-4 py-1.5 shadow-inner shadow-[#a1d8ca]">
            Signup
          </button>

          <div className="md:hidden" onClick={toggleMenu}>
            <div className="w-8 h-1 bg-white mb-1"></div>
            <div className="w-8 h-1 bg-white mb-1"></div>
            <div className="w-8 h-1 bg-white"></div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed z-50 top-0 right-0 h-full w-full bg-[#0A1E5E]  shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <button
          className="absolute top-5 left-5 text-gray-700 text-xl"
          onClick={toggleMenu}
        >
          <RxCross2 size={30} color="white" />
        </button>

        <ul className="mt-20 space-y-6 text-lg font-semibold text-white pl-10 h-full w-full place-content-center place-items-center">
          <li>
            <NavLink to={"/"} onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/watch"} onClick={toggleMenu}>
              Watch
            </NavLink>
          </li>

          <li>
            <button className=" text-white tracking-wide bg-[#30A586] px-4 py-1.5 shadow-inner shadow-[#a1d8ca]">
              Signup
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
