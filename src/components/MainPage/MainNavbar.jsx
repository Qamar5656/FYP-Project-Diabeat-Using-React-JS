import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import MainHome from './MainHome';
import MainAbout from './MainAbout';
import SugarInputForm from './SugarInputForm';
import SevenDayMealPlan from './SevenDayMealPlan';
import MainSignUp from './MainSignUp';
import MainServices from './MainServices';
import GlycemicLoadRecommendations from './GlycemicLoadRecommendations';
import Doctors from '../DoctorPortal/Doctors';
import DoctorDetail from '../DoctorPortal/DoctorDetail';

import App from '../../App';
import MainLogin from './MainLogin';
// import Doctors from './DoctorAppointment/Doctors';
// import DoctorDetail from './DoctorAppointment/DoctorDetail'


const MainNavbar = () => {
  const [menu, setMenu] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const navigate = useNavigate();

  const openSignUpForm = () => setShowSignUpForm(true);
  const closeSignUpForm = () => setShowSignUpForm(false);

  const openLoginForm = () => setShowLoginForm(true);
  const closeLoginForm = () => setShowLoginForm(false);

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

  const handleMenuToggle = () => setMenu(!menu);

  const handleLogout = async () => {
    try {
      // Make a POST request to the logout endpoint
      const response = await fetch('http://127.0.0.1:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      });

      if (response.ok) {
        // Clear the tokens from localStorage or sessionStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Update the login status
        setIsLoggedIn(false);

        // Redirect to the home page
        navigate('/home');
      } else {
        console.error('Logout failed:', response.statusText);
        alert('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred during logout. Please try again.');
    }
  };

  useEffect(() => {
    // Check if the user is logged in by looking for the access token in localStorage
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  return (
    <>
      <div className="fixed w-full z-10">
        <div className='flex justify-around bg-gray-800 bg-opacity-75 p-5 shadow-lg'>
          <div>
            <Link to='/home' className='text-orange-400 text-2xl font-semibold cursor-pointer'>Diabeat</Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex font-bold text-white text-lg flex-row items-center gap-14 cursor-pointer">
            <Link
              to="/home"
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/sugarlevel"
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              Meal Recommendation
            </Link>
            <Link
              to="/services"
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              Meal Suggestion
            </Link>
            <Link
              to="/app"
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              Doctors
            </Link>
            <Link
              to="/weekplan"
              className="hover:text-yellow-300 transition-all cursor-pointer"
            >
              Generate Meal Plan
            </Link>
          </nav>

          <div className="hidden lg:flex space-x-4">
            {!isLoggedIn ? (
              <>
                <button
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out"
                  onClick={openSignUpForm}
                >
                  Sign Up
                </button>
                <button
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out"
                  onClick={openLoginForm}
                >
                  Log In
                </button>
                
              </>
            ) : (
              <button
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
            )}
          </div>
        </div>

        {/* Show Forms Conditionally */}
        {showSignUpForm && <MainSignUp closeForm={closeSignUpForm} />}
        {showLoginForm && <MainLogin closeForm={closeLoginForm} setIsLoggedIn={setIsLoggedIn} />}

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center cursor-pointer text-white">
          {menu ? (
            <AiOutlineClose size={28} onClick={handleMenuToggle} />
          ) : (
            <AiOutlineMenu size={28} onClick={handleMenuToggle} />
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
          to="aboutSection" // Targeting the ID of the MainAbout component
          smooth={true} // Enable smooth scrolling
          duration={500} // Duration of the scroll
          className="text-white font-semibold text-lg cursor-pointer"
        >
          About
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
          to="/weekplan"
          className="hover:text-hoverColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          Generate Meal Plan
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
      <Routes>
        <Route path='/app' element={<App />} />
        <Route path="/doctors" element={<Doctors/>} />
        <Route path="/doctor/:id" element={<DoctorDetail />} />
        <Route path='/home' element={<MainHome />} />
        <Route path='/sugarlevel' element={<SugarInputForm />} />
        <Route path='/weekplan' element={<SevenDayMealPlan />} />
        <Route path='/services' element={<MainServices />} />
        <Route path='/meal_insights' element={<GlycemicLoadRecommendations />} />
      </Routes>
    </>
  );
};

export default MainNavbar;
