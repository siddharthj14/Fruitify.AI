import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Link } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center pt-23 pb-45 px-4">
      <h2 className="text-8xl font-bold mb-15 bg-gradient-to-r from-cyan-200 to-green-600 text-transparent bg-clip-text">
      Revolutionizing Export Fruit Quality Control
      </h2>
      <p className="text-[#e0e0e0] mt-4 max-w-2xl mx-auto text-[1.25rem]">
      Meet FruitifyAI, the next-gen automated inspection system designed to enhance quality assessment with AI-driven defect detection, seamless integration, and real-time sorting for optimized export standards.

      </p>
      <div className="mt-20 space-x-4">
        <Link to="/demo">
          <button className="cursor-pointer px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-700 hover:to-green-500 rounded-3xl font-semibold transition-all duration-300">
            Watch Now
          </button>
        </Link>
        <Button text="Learn More" outlined={true} />
      </div>
    </div>
  );
};

export default Hero;