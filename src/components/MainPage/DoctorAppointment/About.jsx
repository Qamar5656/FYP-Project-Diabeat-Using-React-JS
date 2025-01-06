import React, { useEffect } from 'react';
import img from '../../../assets/img/about.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);

  return (
    <div className='min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-14 gap-5'>
    {/* Text Section */}
    <div
      className='w-full lg:w-3/4 space-y-4'
      data-aos="fade-right"
      data-aos-delay="200"
    >
      <h1 className='text-3xl font-semibold text-center lg:text-start'>Book Appointments with Ease</h1>
      <p className='text-justify lg:text-start'>
        Book your appointments with certified doctors and health professionals in just a few clicks! Our platform makes it easier than ever to connect with the right healthcare provider for your needs.
      </p>
      <p className='text-justify lg:text-start'>
        Whether you're looking for medical advice, a second opinion, or ongoing care, we offer a seamless way to schedule consultations with trusted experts.
      </p>
      <p className='text-justify lg:text-start'>
        Say goodbye to long waiting times and complicated booking processes—your health is just a click away!
      </p>
      <p className='text-justify lg:text-start'>
        Our user-friendly platform allows you to choose your preferred doctor or specialist, and book appointments in minutes.
      </p>
      
    </div>


      {/* Image Section */}
      <div
        className='w-full lg:w-3/4'
        data-aos="fade-left"
        data-aos-delay="400"
      >
        <img src={img} alt="Loading Image" className='rounded-lg' />
      </div>
    </div>
  );
};

export default About;
