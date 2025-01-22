import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);

  return (
<div
      className='min-h-screen flex flex-col justify-center lg:px-32 px-5 text-center text-white bg-[url("assets/img/home.png")] bg-no-repeat bg-cover relative'
    >
      {/* Content */}
      <div className='relative w-full lg:w-4/5 space-y-5 mt-10 z-10'>
        <h1 className='text-5xl font-bold drop-shadow-lg'>Welcome to Doctors Portal</h1>
        <p className='text-xl drop-shadow-lg'>
          Here you can see your patients profile and answer their queries through message portal.
        </p>
      </div>
    </div>
  );
};

export default Home;
