import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);

  return (
    <div
      data-aos="zoom-out"
      className='min-h-screen flex flex-col justify-center lg:px-32 px-5 text-center text-white bg-[url("assets/img/home.png")] bg-no-repeat bg-cover opacity-70'
    >
      <div
        className='w-full lg:w-4/5 space-y-5 mt-10'
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h1 className='text-5xl'>We have Talented Doctors</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur
          sint dolore quos expedita quia minima blanditiis pariatur ea, magnam
          ratione mollitia, delectus porro alias nobis.
        </p>
      </div>
    </div>
  );
};

export default Home;
