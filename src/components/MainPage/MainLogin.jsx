import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'; // Import icons
import Aos from 'aos';
import 'aos/dist/aos.css';

const MainLogin = ({ closeForm, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient'); // Default to 'patient'
  const [success, setSuccess] = useState(false); // Track successful login
  const [errorMessage, setErrorMessage] = useState(''); // Track error messages

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, user_type: userType }), // Add user type to the body
      });

      if (response.ok) {
        const data = await response.json();
        // Save access token to localStorage
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        // Show success message
        setSuccess(true);

        // Clear any previous error message
        setErrorMessage('');

        // Close form after a delay to show success message and animation
        setTimeout(() => {
          setSuccess(false);
          setIsLoggedIn(true); // Set logged-in state to true in parent component
          closeForm();
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage("Login failed: " + errorData.error); // Display error message
      }
    } catch (error) {
      setErrorMessage("Error: " + error.message); // Display error message for network issues
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-8 rounded-xl w-full sm:w-[400px] shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-700'>
          Welcome Back!
        </h2>
        
        {/* Success Message */}
        {success && (
          <div className='flex items-center justify-center mb-4'>
            <FaCheckCircle className='text-green-500 text-3xl mr-2' />
            <p className='text-green-500 font-semibold'>Login successful as {userType}</p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className='flex items-center justify-center mb-4'>
            <FaExclamationTriangle className='text-red-500 text-3xl mr-2' />
            <p className='text-red-500 font-semibold'>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* User Type Selection */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-600">Select User Type</label>
            <select
              className="py-3 px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out mt-4"
          >
            Login
          </button>
        </form>

        {/* Cancel Button */}
        <div className="text-center mt-6">
          <button
            onClick={closeForm}
            className="text-gray-500 hover:text-gray-700 transition-all text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainLogin;
