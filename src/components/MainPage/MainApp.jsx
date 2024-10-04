import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Link } from 'react-scroll';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import MainHome from './MainHome';
import MainAbout from './mainabout';
import MainBlogs from './mainblogs';
import MainSignUp from './MainSignUp';
import MainContact from './MainServices';
import Button from '../DoctorPortal/layouts/Button';
import App from '../../App';
import Homescreen from './Homescreen';


const MainApp = () => {

  return (
    <>
    <BrowserRouter>
      <Homescreen />
    </BrowserRouter>
    <div id='home'>
      <MainHome/>
    </div>
    </>
  )
}

export default MainApp
