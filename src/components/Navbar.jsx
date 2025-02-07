import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="flex flex-wrap justify-between items-center p-4 max-w-7xl mx-auto">
        <Link to="/">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-500 text-transparent bg-clip-text">
            Fruitify.ai
          </h1>
        </Link>
        <div className="flex items-center space-x-6">
          <a
            href="#features"
            className="hover:text-green-400 transition-colors duration-300"
          >
            Features
          </a>
          <a
            href="#about"
            className="hover:text-green-400 transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-green-400 transition-colors duration-300"
          >
            Contact
          </a>
          <a
            href="#contact"
            className="hover:text-green-400 transition-colors duration-300 underline"
          >
            Login
          </a>
          <Button text="Sign up" className="ml-4" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;