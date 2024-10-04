import React, { useState } from 'react';
import Button from './layouts/Button'; // Assuming Button component is correctly imported

const Food = () => {
  // State to handle visibility of a message or element
  const [visible, setVisible] = useState(false);

  // Function to handle button click to show the message
  const handleClick = () => {
    setVisible(true);
  };

  // Function to toggle visibility on input field click
  const handleMenu = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className='min-h-screen flex flex-col justify-center lg:px-32 px-5 text-center text-white bg-[url("/assets/img/foodimg.jpg")] bg-no-repeat bg-cover opacity-70'>
        <div className='w-full lg:w-4/5 space-y-5 mt-10'>
          {/* Input field with onClick handler */}
          <h1 className='text-5xl'>
            <input
              type="text"
              onClick={handleMenu} // Correct onClick usage
              placeholder='Enter Your Sugar Level'
              className='text-black'
            />
          </h1>

          {/* Button component with onClick event */}
          <Button
            title='Click me'
            onClick={handleClick} // Correct onClick usage
          />
          {/* Conditionally show the message */}
          {visible && <p>Thank you for clicking the button!</p>}
        </div>
      </div>
    </>
  );
};

export default Food;
