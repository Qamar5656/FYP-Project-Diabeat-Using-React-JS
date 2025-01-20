import React from 'react'
import img from '../../assets/img/about.jpg';

const About = () => {
  return (
    <div className='min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-14 gap-10'>
    <div className='w-3/4 mt-0'>
      <h2 className="text-2xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s">
        Diabeat - Your Healthy Meal Companion
      </h2>

      <p className="text-lg  text-justify mb-4 animate__animated animate__fadeIn animate__delay-2s">
        Diabeat is designed to help you maintain balanced blood sugar levels by offering personalized dietary
        recommendations. With our easy-to-use Glycemic Load Calculator, you can make informed meal choices that
        align with your health goals. Receive tailored recommendations based on your meal selection and portion size. <strong>Its main features are :</strong>
      </p>

        <ul className=' list-disc ml-6'>
            <li className='text-xl'>
                <p>Meal Recommendation </p>
            </li>
            <li className='text-xl'>
                <p>Meal Suggestions </p>
            </li>
            <li className='text-xl'>
                <p>Weekly Dietry Plan </p>
            </li>
            <li className='text-xl'>
                <p>Doctor Portal </p>
            </li>
            <li className='text-xl'>
                <p>Doctor/Patient Messaging Portal </p>
            </li>
        </ul>
    </div>
        <div className='w-full lg:w-3/4'>
            <img src={img} alt="Loading Image" className='rounded-lg' />
        </div>
    </div>
  )
}

export default About
