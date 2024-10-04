import React from "react";
import Button from "../DoctorPortal/layouts/Button";  // Corrected the path
import { FaArrowUp } from "react-icons/fa";
import Input from "../DoctorPortal/layouts/Input";

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
        <div className="flex gap-3 flex-col">
        <Input/>
        <Button
        className='p-5'
        title='Submit'
        />
        </div>
        {/* Use the Button component */}
        <FaArrowUp
          onClick={scrollToTop}
        />
      </div>
    </>
  );
};

export default MainHome;
