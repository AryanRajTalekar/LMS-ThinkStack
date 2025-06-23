import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-[#141414] border-t border-gray-300 dark:border-gray-700 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Aryan Talekar. All rights reserved.
        </p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a
            href="https://www.linkedin.com/in/aryanrajtalekar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/AryanRajTalekarr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-black"
          >
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
