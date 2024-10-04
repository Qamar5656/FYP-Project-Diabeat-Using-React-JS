import React, {useEffect} from 'react';
import Button from '../DoctorPortal/layouts/Button';

const Home = () => {

  return (
    <div className='min-h-screen flex flex-col justify-center lg:px-32 px-5 text-center text-white bg-[url("assets/img/home.png")] bg-no-repeat bg-cover opacity-70' >
      <div className='w-full lg:w-4/5 space-y-5 mt-10'>
        <h1 className='text-5xl'>We have Talented Doctors</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur sint dolore quos expedita quia minima blanditiis pariatur ea, magnam ratione mollitia, delectus porro alias nobis.</p>
        <Button title="See Services"
         />
      </div>
    </div>
  );
};

export default Home;
