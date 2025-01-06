import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'animate.css'; // Import Animate.css
import Appointment from './Appointment'; // Import the Appointment component

const DoctorDetail = () => {
  const { id } = useParams(); // Get doctor id from the URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAppointment, setShowAppointment] = useState(false); // Track whether the appointment component should be shown
  
  // Get access token from localStorage
  const accessToken = localStorage.getItem('access_token');
  
  // Redirect to login page if there's no access token
  if (!accessToken) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center text-xl text-gray-700">
          <p className="animate__animated animate__zoomIn">Please Login to connect with me</p>
        </div>
      </div>
    );
  }

  const patientId = localStorage.getItem('user_id');
  
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/doctors/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`, // Pass the token in the headers
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch doctor details");
        }
        const data = await response.json();
        setDoctor(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id, accessToken]); // Fetch doctor details when `id` or `accessToken` changes

  const handleAppointmentClick = () => {
    setShowAppointment(true); // Show the appointment section when clicked
  };

  if (loading) return <div className="text-center text-xl text-orange-600">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-600">{error}</div>;

  return (
      // Outer container for centering the content
      <div className="flex justify-center py-10 bg-gray-100 min-h-screen">
        {/* Card container for doctor's profile, with shadow and padding */}
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl mt-5">
          
          {/* Profile Section: Doctor's picture and name/designation */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            
            {/* Doctor's Profile Picture with fallback image */}
            <img
              src={doctor.profile_pic || "/src/assets/img/default-doctor.jpg"} // Fallback image if profile pic is not available
              alt={`${doctor.first_name} ${doctor.last_name}`} // Alt text for the image
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 animate__animated animate__fadeIn animate__delay-0s" // Styling and animation classes
            />
            
            {/* Doctor's Name and Designation */}
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 animate__animated animate__fadeIn animate__delay-1s">
                {doctor.first_name} {doctor.last_name} {/* Display doctor's full name */}
              </h1>
              <p className="text-lg text-gray-600 animate__animated animate__fadeInUp animate__delay-1s">
                <strong>Designation:</strong> {doctor.designation} {/* Display doctor's designation */}
              </p>
            </div>
          </div>
    
          {/* Doctor's Additional Information */}
          <div className="space-y-4 text-gray-700">
            <p className="animate__animated animate__fadeInUp animate__delay-2s">
              <strong>Email:</strong> {doctor.email} {/* Display doctor's email */}
            </p>
            <p className="animate__animated animate__fadeInUp animate__delay-2s">
              <strong>Degree:</strong> {doctor.degree} {/* Display doctor's degree */}
            </p>
            <p className="animate__animated animate__fadeInUp animate__delay-2s">
              <strong>Bio:</strong> {doctor.bio} {/* Display doctor's bio */}
            </p>
          </div>
    
          {/* Appointment Button - Only shown if not already showing appointment form */}
          {!showAppointment && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleAppointmentClick} // Trigger the appointment form when clicked
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all animate__animated animate__zoomIn animate__delay-s"
              >
                Let's Connect {/* Button text to initiate the connection */}
              </button>
            </div>
          )}
    
          {/* Appointment Form - Displayed if 'showAppointment' is true */}
          {showAppointment && (
            <Appointment doctorId={id} patientId={patientId} /> // Render Appointment component with doctorId and patientId as props
          )}
        </div>
      </div>
    );    
};

export default DoctorDetail;
