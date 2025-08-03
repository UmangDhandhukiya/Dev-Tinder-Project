import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 bg-white">
      
      <div className="w-full md:w-1/2 flex flex-col items-start gap-4 mb-10 md:mb-0">
        <h1 className="font-bold text-4xl md:text-5xl leading-tight text-black">
          Looking for more than a job?
        </h1>

        <p className="text-lg md:text-xl text-gray-800">
          Not just another networking site — it's <strong className="text-amber-500">DevBonding</strong>.  
          Find your coding soulmate. Build real software with real people.
        </p>

        <p className="text-xl text-black">
          Create your dev profile today and find your perfect project partner!
        </p>

        <Link to="/register">
          <button className="mt-4 px-8 py-3 bg-amber-300 text-black font-semibold rounded-md shadow hover:bg-amber-400 transition">
            Get Started
          </button>
        </Link>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/side.jpg"
          alt="Developers bonding"
          className="w-full md:w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Home;
