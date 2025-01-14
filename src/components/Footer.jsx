import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa"; 
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0A1E5E] text-white py-6">
      <div className=" mx-auto px-4">
        <div className="flex md:flex-row flex-col justify-between gap-5">
          <NavLink to="/">
            <h3 className="text-2xl font-bold">BooknWatch</h3>
          </NavLink>
          <ul className="flex md:flex-row flex-col md:gap-6">
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Contact</li>
            <li className="cursor-pointer">Privacy Policy</li>
          </ul>
          <div className="flex gap-5 ">
            <a
              href="https://www.linkedin.com/in/subhashprasad23/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-600"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/SubhashPrasad23"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-400"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BooknWatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
