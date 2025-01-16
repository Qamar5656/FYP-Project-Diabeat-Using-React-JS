import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading status
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await fetch('http://localhost:8000/api/password-reset-request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      setLoading(false); // Set loading to false after receiving response

      if (response.ok) {
        setSuccessMessage('Password reset link sent to your email.');
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error requesting password reset');
      }
    } catch (error) {
      setLoading(false); // Ensure loading is turned off if there's a network error
      setErrorMessage('Network error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-[400px] animate__animated animate__fadeIn">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Password Reset Request
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <span className="loader"></span> // Replace with actual loader component or text
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="mt-4 text-green-500 text-center">{successMessage}</div>
        )}
        
        {/* Back to login link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              navigate('/');  // Navigate to Home
              window.location.reload(); // Reload the page after navigation
            }}
            className="text-blue-500 hover:underline"
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default PasswordResetRequest;
