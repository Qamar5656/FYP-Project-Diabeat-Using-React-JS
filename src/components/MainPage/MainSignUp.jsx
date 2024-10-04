import React, { useEffect } from 'react';
import Button from '../DoctorPortal/layouts/Button';
import Aos from 'aos'
import 'aos/dist/aos.css'


const MainSignUp = ({ closeForm }) => {
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='absolute mt-12 text-black'>
        <form className='w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl'>
          <h1 className='text-4xl font-semibold text-center text-backgroundColor'>Book Now</h1>

          <div className='flex flex-col'>
            <input
              type="text"
              name='userfirstname'
              id='userfirstname'
              placeholder='Full Name'
              className='py-3 px-2 bg-[#d5f2ec] text-black rounded-lg'
            />
          </div>

          <div className='flex flex-col'>
            <input
              type="email"
              name='userEmail'
              id='userEmail'
              placeholder='Your Email'
              className='py-3 px-2 bg-[#d5f2ec] rounded-lg'
            />
          </div>

          <div className='flex flex-col'>
            <input
              type="email"
              name='userPassword'
              id='userPassword'
              placeholder='Your Password'
              className='py-3 focus:outline-cyan-200 px-2 bg-[#d5f2ec] rounded-lg'
            />
          </div>

          <div className='flex flex-col'>
            <input
              type="email"
              name='userPassword'
              id='userPassword'
              placeholder='Confirm Password'
              className='py-3 px-2 bg-[#d5f2ec] rounded-lg'
            />
          </div>

          <div className='flex gap-5 justify-around'>
            {/* <Button title='Sign In' className='px-10 py-2' /> */}
            {/* Ensure the default form submission is prevented */}
            <button
              className='bg-backgroundColor text-white px-10 py-2 rounded-md hover:bg-yellow-300' onClick={closeForm}
            > Sign In</button>
            <button
              className='bg-backgroundColor text-white px-10 py-2 rounded-md hover:bg-yellow-300' onClick={closeForm}
            > Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainSignUp;
