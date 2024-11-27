import React, { useEffect } from 'react';
import Navbar from './components/DoctorPortal/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/DoctorPortal/Home'
import About from './components/DoctorPortal/About'
import Doctors from './components/DoctorPortal/Doctors'
import Services from './components/DoctorPortal/Services'
import Blog from './components/DoctorPortal/Blog'
import Footer from './components/DoctorPortal/Footer'
import { FaArrowUp } from 'react-icons/fa';
import Aos from 'aos'
import 'aos/dist/aos.css'


const App = () => {
  //Use Effect hook for animation
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [])
  //scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  }
  return (

    <>
        <Navbar data-aos="flip-down" />
      <main>
        <div id="home" data-aos="zoom-out">
          <Home />
        </div>
        {/* Onclick of this button cursor move at top */}
        <button
          onClick={scrollToTop}
          className='fixed bottom-4 right-11 bg-orange-600 hover:bg-hoverColors p-6 rounded-full cursor-pointer'
        >
          <FaArrowUp />
        </button>
        <div id="about" data-aos="zoom-in">
          <About />
        </div>
        <div id="services" data-aos="flip-up">
          <Services />
        </div>
        <div id="doctors" data-aos="fade-left">
          <Doctors />
        </div>
        <div id="blog" data-aos="zoom-out">
          <Blog />
        </div>
        <div id="footer" data-aos="flip-down">
          <Footer />
        </div>
      </main> 
      
     

    </>
  )
}
export default App