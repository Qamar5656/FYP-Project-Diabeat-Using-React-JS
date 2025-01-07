import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import MainHome from './MainHome';
import SugarInputForm from './SugarInputForm';
import SevenDayMealPlan from './SevenDayMealPlan';
import SignUp from './Authentication/SignUp';
import MainServices from './MainServices';
import GlycemicLoadRecommendations from './GlycemicLoadRecommendations';
import Appointment from './DoctorAppointment/Appointment';
import Login from './Authentication/Login';
import Doctors from './DoctorAppointment/Doctors';
import DoctorDetail from './DoctorAppointment/DoctorDetail'
import Messages from '../DoctorPortal/Messages';
import App from '../../App'

const MainNavbar = () => {
  const [menu, setMenu] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [userType, setUserType] = useState(null); // State to hold the user type

  useEffect(() => {
    const name = localStorage.getItem("user_type");
    setUserType(name); // Set the user type based on localStorage
  }, []);

  const navigate = useNavigate();

  const openSignUpForm = () => setShowSignUpForm(true);
  const closeSignUpForm = () => setShowSignUpForm(false);

  const openLoginForm = () => setShowLoginForm(true);
  const closeLoginForm = () => setShowLoginForm(false);

  const handleMenuToggle = () => setMenu(!menu);

  const handleLogoutConfirmation = () => setShowLogoutConfirmation(true); // Show the confirmation dialog

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      });

      if (response.ok) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_type');
        localStorage.removeItem('first_name');
        setIsLoggedIn(false);
        navigate('/');
        window.location.reload()
      } else {
        console.error('Logout failed:', response.statusText);
        alert('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred during logout. Please try again.');
    }
  };

  const handleConfirmLogout = () => {
    handleLogout(); // Proceed with logout
    setShowLogoutConfirmation(false); // Hide confirmation dialog
  };

  const handleCancelLogout = () => setShowLogoutConfirmation(false); // Hide confirmation dialog

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className="fixed w-full z-10">
        <div className="flex justify-between items-center bg-gray-800 bg-opacity-95 p-5 shadow-lg">
          <div>
            <Link to='/' className='text-orange-400 text-2xl font-semibold cursor-pointer'>Diabeat</Link>
          </div>

          {/* Navbar Links for Large Screens */}
          <nav className="hidden lg:flex font-bold text-white text-lg flex-row items-center gap-14">
            {userType !== 'doctor' && (
              <>
                <Link to="/" className="hover:text-yellow-300 transition-all cursor-pointer">Home</Link>
                <Link to="/sugarlevel" className="hover:text-yellow-300 transition-all cursor-pointer">Meal Recommendation</Link>
                <Link to="/services" className="hover:text-yellow-300 transition-all cursor-pointer">Meal Suggestion</Link>
                <Link to="/doctors" className="hover:text-yellow-300 transition-all cursor-pointer">Doctors</Link>
                <Link to="/weekplan" className="hover:text-yellow-300 transition-all cursor-pointer">Generate Meal Plan</Link>
              </>
            )}
            {userType === 'doctor' && (
              <>
                <button
                  className="py-2 font-bold hover:text-yellow-300"
                  onClick={() => {
                    if (!isLoggedIn) {
                      alert("Please log in to access Patient Appointments."); // Or show a modal
                    } else {
                      navigate("/app"); // Navigate only if the user is logged in
                      setMenu(false);   // Close the menu
                    }
                  }}
                >
                  Patient Appointments
                </button>
              </>
            )}
          </nav>

          {/* Login / SignUp / Logout Button */}
          <div className="hidden lg:flex space-x-4">
            {!isLoggedIn ? (
              <>
                <button className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out" onClick={openSignUpForm}>Sign Up</button>
                <button className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out" onClick={openLoginForm}>Log In</button>
              </>
            ) : (
              <button className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out" onClick={handleLogoutConfirmation}>Log Out</button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center cursor-pointer text-white">
          {menu ? (
          <AiOutlineClose
            size={28}
            onClick={handleMenuToggle}
            className="text-white opacity-80 hover:opacity-100 transition duration-300"
          />
        ) : (
          <AiOutlineMenu
            size={28}
            onClick={handleMenuToggle}
            className="text-white opacity-80 hover:opacity-100 transition duration-300"
          />
        )}
      </div>
        </div>

        {/* Mobile Menu */}
        <div
        className={`lg:hidden flex flex-col items-center py-5 absolute bg-gray-800 text-white left-0 z-50 top-16 w-full transition-transform duration-300 ${
          menu ? "translate-x-0" : "-translate-x-full"
        }`}
        >
            {/* Links for Non-Doctor Users */}
            {userType !== 'doctor' && (
              <>
                <Link to="/" className="py-2 font-bold hover:text-yellow-300" onClick={() => setMenu(false)}>
                  Home
                </Link>
                <Link to="/services" className="py-2 font-bold hover:text-yellow-300" onClick={() => setMenu(false)}>
                  Meal Suggestion
                </Link>
                <Link to="/sugarlevel" className="py-2 font-bold hover:text-yellow-300" onClick={() => setMenu(false)}>
                  Meal Recommendation
                </Link>
                <Link to="/weekplan" className="py-2 font-bold hover:text-yellow-300" onClick={() => setMenu(false)}>
                  Generate Meal Plan
                </Link>
                <Link to="/doctors" className="py-2 font-bold hover:text-yellow-300" onClick={() => setMenu(false)}>
                  Doctors
                </Link>
              </>
            )}

             {userType === 'doctor' && (
              <>
                <button
                  className="py-2 font-bold hover:text-yellow-300"
                  onClick={() => {
                    if (!isLoggedIn) {
                      alert("Please log in to access Patient Appointments."); // Or show a modal
                    } else {
                      navigate("/app"); // Navigate only if the user is logged in
                      setMenu(false);   // Close the menu
                    }
                  }}
                >
                  Patient Appointments
                </button>
              </>
            )}


            {/* Authentication Buttons */}
            {!isLoggedIn ? (
              <>
                <button
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out mt-4 sm:hidden md:hidden lg:block"
                  onClick={openSignUpForm}
                >
                  Sign Up
                </button>
                <button
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out mt-2 sm:hidden md:hidden lg:block"
                  onClick={openLoginForm}
                >
                  Log In
                </button>
              </>
            ) : (
              <button
                className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out mt-4"
                onClick={handleLogoutConfirmation}
              >
                Log Out
              </button>
            )}
        </div>

        {/* Show Forms Conditionally */}
        {showSignUpForm && <SignUp closeForm={closeSignUpForm} />}
        {showLoginForm && <Login closeForm={closeLoginForm} setIsLoggedIn={setIsLoggedIn} />}

        {/* Logout Confirmation Modal */}
        {showLogoutConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg z-60">
              <h3 className="text-lg font-semibold text-gray-900">Are you sure you want to log out?</h3>
              <div className="flex items-center ml-5 space-x-4 mt-5">
                <button
                  className="bg-red-500 text-white px-12 py-3 rounded-md hover:bg-red-600 transition duration-300"
                  onClick={handleConfirmLogout}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-500 text-white px-12 py-3 rounded-md hover:bg-gray-600 transition duration-300"
                  onClick={handleCancelLogout}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Routes>
        <Route path='/app' element={<App />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/:id" element={<DoctorDetail />} />
        <Route path='/' element={<MainHome />} />
        <Route path='/home' element={<MainHome />} />
        <Route path='/sugarlevel' element={<SugarInputForm />} />
        <Route path='/weekplan' element={<SevenDayMealPlan />} />
        <Route path='/services' element={<MainServices />} />
        <Route path='/meal_insights' element={<GlycemicLoadRecommendations />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path="/ws/appointments/:doctorId/:patientId/messages" element={<Messages />} />
      </Routes>
    </>
  );
};

export default MainNavbar;