import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'animate.css'; // Import Animate.css
import Appointment from './Appointment'; // Import the Appointment component
import StarRating from './StarRating'; // Import the StarRating component (to be created)

const DoctorDetail = () => {
  const { id } = useParams(); // Get doctor id from the URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAppointment, setShowAppointment] = useState(false); // Track whether the appointment component should be shown
  const [ratingSubmitted, setRatingSubmitted] = useState(false); // Track rating submission
  const [ratingError, setRatingError] = useState(null); // Track rating submission error
  
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
    if (id && accessToken) {
      const fetchDoctor = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/doctors/${id}/`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
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
    } else {
      console.error("Missing id or accessToken");
    }
  }, [id, accessToken]);
  
  const handleAppointmentClick = () => {
    setShowAppointment(true); // Show the appointment section when clicked
  };

  const handleRatingSubmit = async (rating, review) => {
    try {
      const response = await fetch("http://localhost:8000/api/ratings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          patient: patientId,
          doctor: id,
          rating,
          review,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Capture the error message from the response body
        console.log(errorData);
        throw new Error(errorData || "Failed to submit rating"); // Use the 'detail' field if it exists
      }

      setRatingSubmitted(true);
      setRatingError(null); // Reset the error if rating is successful
    } catch (err) {
      setRatingError(`${err.message}`); // Set the error to display it on the screen
    }
  };

  if (loading) return <div className="text-center text-xl text-orange-600">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-600">{error}</div>;

  return (
    <div className="flex justify-center py-10  min-h-screen">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl mt-14">
        <div className="flex items-center justify-center space-x-6 mb-8">
          <img
            src={doctor.profile_pic || "/src/assets/img/default-doctor.jpg"}
            alt={`${doctor.first_name} ${doctor.last_name}`}
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 animate__animated animate__fadeIn animate__delay-0s"
          />
          <div>
            <h1 className="text-3xl text-gray-500 font-semibold animate__animated animate__fadeIn animate__delay-1s">
              {doctor.first_name} {doctor.last_name}
            </h1>
            <p className="text-lg text-gray-500 animate__animated animate__fadeInUp animate__delay-1s">
              <strong>Designation:</strong> {doctor.designation}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-gray-500">
          <p className="animate__animated animate__fadeInUp animate__delay-2s">
            <strong>Email:</strong> {doctor.email}
          </p>
          <p className="animate__animated animate__fadeInUp animate__delay-2s">
            <strong>Degree:</strong> {doctor.degree}
          </p>
          <p className="animate__animated animate__fadeInUp animate__delay-2s">
            <strong>Bio:</strong> {doctor.bio}
          </p>
        </div>
        {/* Star Rating Section */}
        {!ratingSubmitted ? (
          <div className="mt-8">
            <StarRating onSubmit={handleRatingSubmit} />
          </div>
        ) : (
          <div className="mt-8 text-center text-green-600">
            Thank you for submitting your review!
          </div>
        )}

        {/* Error Message for Rating Submission */}
        {ratingError && (
          <div className="mt-4 text-center text-red-600 animate__animated animate__fadeIn">
            {ratingError}
          </div>
        )}

        {/* Appointment Button */}
        {!showAppointment && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleAppointmentClick}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all animate__animated animate__zoomIn animate__delay-s"
            >
              Let's Connect
            </button>
          </div>
        )}

        {/* Show Appointment Section */}
        {showAppointment && (
          <Appointment doctorId={id} patientId={patientId} />
        )}
      </div>
    </div>
  );
};

export default DoctorDetail;