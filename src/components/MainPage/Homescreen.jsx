import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import MainHome from './MainHome';
import MainAbout from './mainabout';
import MainBlogs from './mainblogs';
import MainSignUp from './MainSignUp';
import MainServices from './MainServices';
import App from '../../App';

const Homescreen = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);

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

  return (
    <>
      <div className="fixed w-full z-10 bg-[#00CCCD]">
        <div className='flex justify-around p-5'>
          <div>
            <Link to='/' className='text-white text-2xl font-semibold cursor-pointer'>Diabeat</Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex text-white text-lg font-medium flex-row items-center gap-14 cursor-pointer">
            <Link
              to="/home"
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              Services
            </Link>
            <Link
              to="/app"
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              Doctors
            </Link>
            <Link
              to="/blog"
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              Blog
            </Link>
          </nav>

          <div className="hidden lg:flex">
            <button
              className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out"
              onClick={openForm}
            >
              Sign In
            </button>
          </div>
          {showForm && <MainSignUp closeForm={closeForm} />}
          <div className="lg:hidden flex items-center cursor-pointer text-white">
            {menu ? (
              <AiOutlineClose size={28} onClick={handleChange} />
            ) : (
              <AiOutlineMenu size={28} onClick={handleChange} />
            )}
          </div>
        </div>
        <div className={`${menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-backgroundColor text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300 cursor-pointer`}>
          <Link
            to="/home"
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Services
          </Link>
          <Link
            to="/app"
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Doctors
          </Link>
          <Link
            to="/blog"
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Blog
          </Link>
          <div className="lg:hidden">
            <button
              className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
              onClick={openForm}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <Routes>
        <Route path='/app' element={<App />} />
        <Route path='/home' element={<MainHome />} />
        <Route path='/about' element={<MainAbout />} />
        <Route path='/blog' element={<MainBlogs />} />
        <Route path='/services' element={<MainServices />} />
      </Routes>
    </>
  );
};

export default Homescreen;
