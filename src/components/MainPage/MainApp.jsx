import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainNavbar from './MainNavbar';


const MainApp = () => {

  return (
  <>
    <BrowserRouter>
      <MainNavbar />
    </BrowserRouter>
  </>
  )
}

export default MainApp
