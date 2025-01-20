import React from 'react';
const Home = () => {

  return (
    <div className='min-h-screen flex flex-col justify-center lg:px-32 px-5 text-center text-white bg-[url("assets/img/home.png")] bg-no-repeat bg-cover opacity-70' >
      <div className='w-full lg:w-4/5 space-y-5 mt-10'>
        <h1 className='text-5xl font-bold'>Welcome to Doctors Portal</h1>
        <p className='text-xl'>Here you can see your patients profile and answer their queries through message portal.</p>
      </div>
    </div>
  );
};

export default Home;
