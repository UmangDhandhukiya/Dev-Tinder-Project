import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-evenly 
      px-4 sm:px-6 md:px-16 py-6 md:py-12 md:justify-between bg-black text-white">
      
      <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2 mb-4 md:mb-0">
        <div className="bg-gray-900 p-2 sm:p-3 md:p-4 rounded-xl shadow-lg w-[70%] sm:w-[55%] md:w-auto">
          <img
            src="/side.jpg"
            alt="Developers bonding"
            className="w-full object-contain rounded-lg"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start 
        gap-3 sm:gap-4 order-2 md:order-1 text-center md:text-left px-2 sm:px-0">
        
        <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl leading-snug text-amber-300">
          Looking for more than a job?
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-md">
          Not just another networking site — it's{" "}
          <strong className="text-amber-400">DevBonding</strong>.  
          Find your coding soulmate. Build real software with real people.
        </p>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-md">
          Create your dev profile today and find your perfect project partner!
        </p>

        <Link to="/register">
          <button className="mt-3 sm:mt-4 px-6 sm:px-8 py-2 sm:py-3 
            bg-amber-400 text-black font-semibold rounded-lg shadow 
            hover:bg-amber-500 transition text-sm sm:text-base md:text-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
