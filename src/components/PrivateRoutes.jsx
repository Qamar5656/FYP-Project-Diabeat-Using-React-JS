import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if user is logged in by checking if the access token exists
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    // Redirect to login page with message if user is not logged in
    return <Navigate to="/login" state={{ message: 'Login to unlock features' }} />;
  }

  return children;
};

export default PrivateRoute;
