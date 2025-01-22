import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'animate.css'; // Import Animate.css
import Appointment from './Appointment'; // Import the Appointment component
import StarRating from './StarRating'; // Import the StarRating component
import Modal from "./Model";
const DoctorDetail = () => {
  const { id } = useParams(); // Get doctor id from the URL
  const [doctor, setDoctor] = useState(null);
  const [ratings, setRatings] = useState([]); // New state to store ratings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAppointment, setShowAppointment] = useState(false); // Track whether the appointment component should be shown
  const [ratingSubmitted, setRatingSubmitted] = useState(false); // Track rating submission
  const [ratingError, setRatingError] = useState(null); // Track rating submission error
  const [showReviewsModal, setShowReviewsModal] = useState(false); // Track modal visibility

  const accessToken = localStorage.getItem('access_token');
  const patientId = localStorage.getItem('user_id');
  // Redirect to login page if there's no access token
  if (!accessToken) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center text-xl text-gray-700">
          <p className="animate__animated animate__zoomIn mt-12">Please Login to connect with me</p>
        </div>
      </div>
    );
  }

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
      
      const fetchRatings = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/ratings/?doctor=${id}`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch ratings");
          }
          const data = await response.json();
          setRatings(data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchDoctor();
      fetchRatings();
    }
  }, [id, accessToken]);

  const handleAppointmentClick = () => {
    setShowAppointment(true);
  };

  const handleCloseAppointment = () => {
    setShowAppointment(false);
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
        const errorData = await response.json();
        throw new Error(errorData || "Failed to submit rating");
      }

      setRatingSubmitted(true);
      setRatingError(null);
    } catch (err) {
      setRatingError(`${err.message}`);
    }
  };

  // Handle the "Previous Reviews" button click to show modal
  const toggleReviewsModal = () => {
    setShowReviewsModal(!showReviewsModal);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-orange-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (loading) return <div className="text-center text-xl text-red-600 flex justify-center items-center min-h-screen">... Loading</div>;
  if (error) return <div className="text-center text-xl text-red-600">{error}</div>;

  return (
    <div className="flex justify-center py-10 min-h-screen">
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

        {/* Buttons Section */}
<div className="mt-8 flex justify-center space-x-4">
  {!showAppointment && (
    <button
      onClick={handleAppointmentClick}
      className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all animate__animated animate__zoomIn animate__delay-s"
    >
      Let's Connect
    </button>
  )}

  <button
    onClick={toggleReviewsModal}
    className="px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all"
  >
    Previous Reviews
  </button>
</div>


        {/* Conditional rendering of the Appointment component */}
        {showAppointment && (
          <Appointment
            doctorId={id}
            patientId={patientId}
            onClose={handleCloseAppointment}
          />
        )}

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

        
    

        {/* Conditional rendering of the Modal (Pop-up) */}
        {showReviewsModal && <Modal reviews={ratings} onClose={toggleReviewsModal} />}
        
        {/* Error Message for Rating Submission */}
        {ratingError && (
          <div className="mt-4 text-center text-red-600 animate__animated animate__fadeIn">
            {ratingError}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetail;
