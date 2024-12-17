import React from "react";
import 'animate.css';

const MainHome = () => {
  return (
    <>
      <div className="h-screen flex flex-col justify-center text-left text-black relative">
        {/* Background Image with Opacity */}
        <div
          className="absolute inset-0 bg-[url('assets/img/homepage.jpg')] bg-cover bg-center"
          style={{ opacity: 0.8 }} // Adjust the opacity level here
        ></div>

        {/* Content on Top of the Background */}
        <div className="relative z-10 px-10 flex items-start">
          <div className="bg-gray-800 bg-opacity-75 p-6 rounded-lg shadow-lg max-w-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
            <h1 className="text-3xl font-bold text-white">
              Welcome to Your Diabeat.
            </h1>
            <p className="animate__animated animate__fadeIn animate__delay-1s mt-4 text-lg text-orange-400">
              Explore healthy meal options tailored just for you.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHome;
