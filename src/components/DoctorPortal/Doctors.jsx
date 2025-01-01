import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DoctorPortal = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const doctorId = localStorage.getItem("user_id"); // This should be dynamically fetched based on the logged-in doctor
  const accessToken = localStorage.getItem("access_token"); // Fetch the access token

  useEffect(() => {
    if (!accessToken) {
      navigate("/home");
      return;
    }

    const fetchPatients = async () => {
      try {
        const response = await fetch(`http://localhost:8000/ws/doctors/${doctorId}/patients/`, {
          headers: {
            "Content-Type": "application/json",

          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();

        if (data.patients && Array.isArray(data.patients)) {
          setPatients(data.patients);
        } else {
          setError("Invalid response format");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPatients();
  }, [accessToken, doctorId, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading patients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-5 pt-16">
      <h1 className="text-4xl font-semibold text-center">Patients Who Messaged You</h1>
      <p className="mt-2 text-center">Click on "See Message" to view messages.</p>
      <div className="mt-5">
        {patients.length === 0 ? (
          <p>No patients have messaged you yet.</p>
        ) : (
          <ul className="space-y-4">
            {patients.map((patient) => (
              <li key={patient.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-gray-500">{patient.email}</p>
                </div>
                <Link
                  to={`/ws/appointments/${doctorId}/${patient.id}/messages/`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  See Message
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorPortal;
