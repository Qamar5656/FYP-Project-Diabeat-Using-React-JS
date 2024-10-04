import React from 'react'
import Button from '../layouts/Button'

// CloseForm props from Navbar Icon
const Contact = ( closeForm) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className=' absolute mt-12 text-black'>

            {/* Form inputs */}
                
            <form className='w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl'>
                <h1 className='text-4xl font-semibold text-center text-backgroundColor'>Book Now</h1>
                <div className='flex flex-col'>
                    <input
                    type="text"
                    name='userfirstname'
                    id='userfirstname'
                    placeholder='First Name'
                    className='py-3 px-2 bg-[#d5f2ec] text-black rounded-lg' />
                </div>
                <div className='flex flex-col'>
                    <input
                    type="text"
                    name='userlirstname'
                    id='userlirstname'
                    placeholder='Last Name'
                    className='py-3 px-2 bg-[#d5f2ec] rounded-lg' />
                </div>
                <div className='flex flex-col'>
                    <input
                    type="email"
                    name='userEmail'
                    id='userEmail'
                    placeholder='Your Email'
                    className='py-3 px-2 bg-[#d5f2ec] rounded-lg' />
                </div>
                <div className='flex flex-col'>
                    <input
                    type="number"
                    name='userNumber'
                    id='userNumber'
                    placeholder='Your Phone Number'
                    className='py-3 px-2 bg-[#d5f2ec] text-black rounded-lg' />
                </div>
                <div className='flex gap-5'>
                
                    {/* imported button with Title prop components */}

                    <Button title='Book Appointment'/>
                    <button 
                    className='bg-backgroundColor text-white px-10 py-2 rounded-md active:bg-yellow-300' onClick={closeForm}
                    > Close</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Contact