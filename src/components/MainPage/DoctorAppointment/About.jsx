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
        <h1 className='text-4xl font-semibold text-center lg:text-start'>About Us</h1>
        <p className='text-justify lg:text-start'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, repellat voluptate! Reprehenderit quaerat quis minus, fugit quasi modi iste! Porro debitis natus ab et aliquid. debitis natus ab et aliquid.
        </p>
        <p className='text-justify lg:text-start'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, repellat voluptate! Reprehenderit quaerat quis minus, fugit quasi modi iste! Porro debitis natus ab et aliquid. debitis natus ab et aliquid.
        </p>
        <p className='text-justify lg:text-start'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, repellat voluptate! Reprehenderit quaerat quis minus, fugit quasi modi iste! Porro debitis natus ab et aliquid. debitis natus ab et aliquid.
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
