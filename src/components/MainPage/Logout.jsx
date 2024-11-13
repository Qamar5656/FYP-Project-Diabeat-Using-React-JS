import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the tokens from localStorage (or sessionStorage)
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Optionally, clear any other user-related data or settings

    // Redirect to the home page or login page
    navigate('/home');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
