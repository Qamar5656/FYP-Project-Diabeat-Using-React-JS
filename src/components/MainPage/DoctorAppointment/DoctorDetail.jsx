import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'animate.css'; // Import Animate.css
import Appointment from './Appointment' // Import the Appointment component

const DoctorDetail = () => {
  const { id } = useParams(); // Get doctor id from the URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAppointment, setShowAppointment] = useState(false); // Track whether the appointment component should be shown
  const patientId = localStorage.getItem('user_id');
  
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/doctors/${id}/`, {
          headers: {
            "Content-Type": "application/json",
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
  }, [id]);

  const handleAppointmentClick = () => {
    setShowAppointment(true); // Show the appointment section when clicked
  };

  if (loading) return <div className="text-center text-xl text-orange-600">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-600">{error}</div>;

  return (
    <div className="flex justify-center py-10 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl mt-5">
        <div className="flex items-center justify-center space-x-6 mb-8">
          <img
            src={doctor.profile_pic || "/src/assets/img/default-doctor.jpg"}
            alt={`${doctor.first_name} ${doctor.last_name}`}
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 animate__animated animate__fadeIn animate__delay-0s"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 animate__animated animate__fadeIn animate__delay-1s">
              {doctor.first_name} {doctor.last_name}
            </h1>
            <p className="text-lg text-gray-600 animate__animated animate__fadeInUp animate__delay-1s">
              <strong>Designation:</strong> {doctor.designation}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-gray-700">
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
