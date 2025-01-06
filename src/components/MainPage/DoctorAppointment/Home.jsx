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
        <p className='text-1xl'>
          Easily book appointments with certified doctors and health professionals! Whether you're seeking medical advice, a second opinion, or ongoing care, our platform allows you to schedule doctor consultations with just a few clicks.
        </p>
      </div>
    </div>
  );
};

export default Home;
