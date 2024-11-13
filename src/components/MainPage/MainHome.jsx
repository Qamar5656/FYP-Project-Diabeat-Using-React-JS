import React from "react";
// Corrected the path
import { FaArrowUp } from "react-icons/fa";


const MainHome = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scrolling
    });
  };

  return (
    <>
      <div>

      </div>
      <div className="min-h-screen flex flex-col justify-center text-center text-black bg-[url('assets/img/foodimg.jpeg')]">
       
        </div>
        {/* Use the Button component */}
        <FaArrowUp
          onClick={scrollToTop}
        />
      
    </>
  );
};

export default MainHome;
