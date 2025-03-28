import React, { useState, useEffect } from "react";
import { Routes, Route, Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import Button from "../DoctorPortal/layouts/Button";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../DoctorPortal/models/Contact";
import MainNavbar from "../MainPage/MainNavbar";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const firstName = localStorage.getItem("first_name");
  const userId = localStorage.getItem("user_id");


  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const openForm = () => {
    setShowForm(true);
    setMenu(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };
  const handleFirstNameClick = () => {
    if (userId) {
      navigate(`/doctor_profile/${userId}`);
    }
  };
  return (
    <div className="fixed w-full z-10 text-white">
      <div>
        <div className="flex flex-row justify-between p-6 md:px-32 px-5 bg-backgroundColor shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className="flex flex-row items-center cursor-pointer">
            <Link to="home" spy={true} smooth={true} duration={500}>
              <h1 className="text-2xl font-semibold" onClick={()=> navigate('/')}>Diabeat</h1>
            </Link>
          </div>

          <nav className="hidden lg:flex flex-row items-center text-lg font-medium gap-16">
            <RouterLink
              to="/home"
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              Home
            </RouterLink>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              About Us
            </Link>
            <Link
              to="doctors"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              Messages
            </Link>
            <Link
              to="blog"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              Blog
            </Link>
          </nav>

          <div className="hidden lg:flex">
            <button
              className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out"
              onClick={handleFirstNameClick}
            >
              {firstName ? `Doctor ${firstName}` : "Contact Us"}
            </button>
          </div>
          {showForm && <Contact closeForm={closeForm} />}

          <div className="lg:hidden cursor-pointer flex items-center">
            {menu ? (
              <AiOutlineClose size={28} onClick={handleChange} />
            ) : (
              <AiOutlineMenu size={28} onClick={handleChange} />
            )}
          </div>
        </div>

        <div
          className={`${menu ? "translate-x-0" : "-translate-x-full"
            } lg:hidden flex flex-col absolute bg-backgroundColor text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <RouterLink
            to="/home"
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </RouterLink>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
            to="doctors"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Messages
          </Link>
          <Link
            to="blog"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Blog
          </Link>

          <div className="lg:hidden">
            <button
              className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
              onClick={handleFirstNameClick}
            >
              {firstName ? `Doctor ${firstName}` : "Contact Us"}
            </button>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/home" element={<MainNavbar />} />
      </Routes>
    </div>
  );
};

export default Navbar;
