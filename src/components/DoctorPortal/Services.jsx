import React from 'react'
import Button from './layouts/Button'
import ServicesCard from './layouts/ServicesCard'
import {RiRestaurantLine} from 'react-icons/ri' // For Meal Suggestion
import {MdHealthAndSafety} from 'react-icons/md' // For Weekly Diet Plan
import {FaHeartbeat} from 'react-icons/fa' // For Doctor Message Portal
const Services = () => {
    const icon1 = <RiRestaurantLine size={35} className='text-backgroundColor' />
    const icon2 = <MdHealthAndSafety size={35} className='text-backgroundColor'/>
    const icon3 = <FaHeartbeat size={35} className='text-backgroundColor'/>
    return (
        <div className='min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16'>
            <div className='flex flex-col items-center lg:flex-row justify-between'>
            <div>
                <h1 className="text-4xl font-semibold text-center lg:text-start">Our Services</h1>
                <p className=" mt-2 text-center lg:text-start"> Here are the list of Services that our model offers to its users: </p>
            </div>
                <Button title="See services" />
            </div>
            {/* <div className="flex gap-4 w-full justify-center items-center p-4 border border-green-500"> */}
            <div className="flex flex-col lg:flex-row gap-5 pt-14">
            <ServicesCard 
            icon={icon1}
             title="Meal Suggestion" 
            description={'To view diet plan after entering sugar level,  fasting/post-meal and meal name to view meal is suitable to him or not.'}/>
            <ServicesCard 
            icon={icon2}
             title="Weekly Diet Plan" 
            description={'To view weekly diet plan after entering minimum 3 times sugar level. You can also save, edit and generate new meal plan .'}/> 
            <ServicesCard 
            icon={icon3}
             title="Doctor Message Portal" 
            description={'In this a patient can view doctor profile, give reviews, feedbacks and message them. This option is same for doctor also.'}/> 
        </div>
        </div>
    )
}

export default Services
