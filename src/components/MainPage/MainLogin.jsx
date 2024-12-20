import React, { useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const MainLogin = ({ closeForm }) => {
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
      <div className='absolute mt-12 text-black'>
        <form className='w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl relative' onSubmit={handleLogin}>
          {/* Close Button */}
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={closeForm}
          >
            &#x2715;
          </button>

          <h1 className='text-4xl font-semibold text-center text-backgroundColor'>Login</h1>

          {/* Success Message with Tick Animation */}
          {success && (
            <div className='text-center text-green-500 mt-3'>
              <div className="flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p className="ml-2">Logged in Successfully as {userType}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="text-center text-red-500 mt-3">
              <p>{errorMessage}</p>
            </div>
          )}

          {/* User Type Selection (Doctor or Patient) */}
          <div className="flex flex-col">
            <label className="mb-2">Select User Type</label>
            <select
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Email Field */}
          <div className='flex flex-col'>
            <input
              type="email"
              placeholder='Email'
              className='py-3 px-2 bg-[#d5f2ec] rounded-lg'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className='flex flex-col'>
            <input
              type="password"
              placeholder='Password'
              className='py-3 px-2 bg-[#d5f2ec] rounded-lg'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type='submit' className='bg-backgroundColor text-white px-4 py-2 rounded-md hover:bg-yellow-300'>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainLogin;
