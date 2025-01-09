import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Function to get CSRF token from cookies
const getCSRFToken = () => {
  const match = document.cookie.match(new RegExp('(^| )csrftoken=([^;]+)'));
  return match ? match[2] : '';
};

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const uid = queryParams.get('uid');
  const token = queryParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    const csrfToken = getCSRFToken(); // Get CSRF token

    try {
      const response = await fetch('http://localhost:8000/api/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken, // Include CSRF token here
        },
        body: JSON.stringify({ uid, token, new_password: newPassword, confirm_password: confirmPassword }),
      });

      setLoading(false);

      if (response.ok) {
        setSuccessMessage('Password reset successful. You can now log in.');
        setTimeout(() => navigate('/'), 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error resetting password');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Network error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-[400px] animate__animated animate__fadeIn">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Reset Your Password
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
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
            onClick={() => navigate('/')}
            className="text-blue-500 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
